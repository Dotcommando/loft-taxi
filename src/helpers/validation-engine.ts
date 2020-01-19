import {
    IValidator,
    IValidationResults,
    ValidationRule,
    IInputState,
    IValidatorGenerator,
    IValidatorWithPredefinedRule
} from '../models/common';

export const validationLauncher = () => {
    const validationResult: IValidationResults = [];
    Object.defineProperty(validationResult, 'then', {
        enumerable: false,
        value(fn: IValidatorWithPredefinedRule, value: string, inputState: IInputState) {
            validationResult.push(fn(value, inputState));
            return validationResult;
        }
    });
    return validationResult;
};

export const validatorWithCustomRule: IValidatorGenerator =
    (validatorFn: IValidator, rule: ValidationRule) =>
    (value: string, inputState: IInputState) => validatorFn(rule, value, inputState);

export const runValidators =
    (validators: IValidatorWithPredefinedRule[], value: string, inputState: IInputState) => {
    const len = validators.length;
    let results = validationLauncher();
    for (let i = 0; i < len; i++) {
        results.then(validators[i], value, inputState)
    }
    return results;
};
