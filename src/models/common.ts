export type IInputState = {
    pristine: boolean,
    dirty: boolean,
    validated: boolean,
    valid: boolean,
    hasFocus: boolean,
    firstTouchIsNow: boolean,
    empty: boolean,
    errorMessages: string[],
};

export interface IValidator {
    (rule: ValidationRule, value: string, inputState: IInputState): IValidationResult
}

export interface IValidatorWithPredefinedRule {
    (value: string, inputState: IInputState): IValidationResult
}

export interface IValidatorGenerator {
    (validatorFn: IValidator, rule: ValidationRule) : (value: string, inputState: IInputState) => IValidationResult
}

export type ValidationCriteria = {
    name: string,
    value: string | number,
}

export type ValidationRule = {
    name: string,
    errorMessage: string,
    criteria: ValidationCriteria[],
}

export interface IValidationResult {
    valid: boolean,
    ruleName: string,
    errorMessage?: string,
}

export interface IValidationResults extends Array<IValidationResult> {
    then: { (fn: IValidatorWithPredefinedRule, value: string, inputState: IInputState): IValidationResults },
    totalValid: { (): boolean },
    errorMessages: { (): string[] },
}

export interface IRunValidators {
    (validators: IValidatorWithPredefinedRule[], value: string, inputState: IInputState): IValidationResults
}
