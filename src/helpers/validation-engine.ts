import {
    IValidator,
    IValidationResult,
    IValidationResults,
    ValidationRule,
    IInputState,
    IValidatorGenerator,
    IValidatorWithPredefinedRule,
} from '../models/common';

export const validationLauncher = () => {
    const validationResult: IValidationResult[] = [];

    Object.defineProperty(validationResult, 'then', {
        enumerable: false,
        value(fn: IValidatorWithPredefinedRule, value: string, inputState: IInputState) {
            validationResult.push(fn(value, inputState));
            return validationResult;
        }
    });

    Object.defineProperty(validationResult, 'totalValid', {
        enumerable: false,
        value() {
            let totalValid = true;
            for (let result of this) {
                totalValid = totalValid && result.valid;
            }
            return totalValid;
        }
    });

    Object.defineProperty(validationResult, 'errorMessages', {
        enumerable: false,
        value() {
            const errors: string[] = [];
            for (let result of this) {
                if (result.errorMessage) {
                    errors.push(result.errorMessage);
                }
            }
            return errors;
        }
    });

    return validationResult as IValidationResults;
};

export const createValidationResults: () => IValidationResults = () => validationLauncher();

export const validatorWithCustomRule: IValidatorGenerator =
    (validatorFn: IValidator, rule: ValidationRule) =>
    (value: string, inputState: IInputState) => validatorFn(rule, value, inputState);

export const runValidators =
    (validators: IValidatorWithPredefinedRule[], value: string, inputState: IInputState) => {
    let results = validationLauncher();
    if (!results.then || !results.totalValid) return results;
    for (let validatorFn of validators) {
        results.then(validatorFn, value, inputState)
    }
    results.totalValid();
    return results;
};
