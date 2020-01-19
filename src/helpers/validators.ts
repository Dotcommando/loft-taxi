import { IInputState, IValidationResult, IValidator, ValidationRule } from '../models/common';

export const lengthValidator: IValidator = (rule: ValidationRule, value: string, inputState: IInputState) => {
    const result: IValidationResult = {
        valid: true,
        ruleName: rule.name,
    };
    let errorMsg = rule.errorMessage;

    for (let criteria of rule.criteria) {
        let currentCriteriaResult = true;
        if (criteria.name === 'min') {
            currentCriteriaResult = value.length > criteria.value;
            result.valid = result.valid && currentCriteriaResult;
        } else if (criteria.name === 'max') {
            currentCriteriaResult = value.length < criteria.value;
            result.valid = result.valid && currentCriteriaResult;
        }
        errorMsg = errorMsg.replace(`{${criteria.name}}`, `${criteria.value}`);
    }

    if (!result.valid) result.errorMessage = errorMsg;
    console.log('validation:', result);
    return result;
};
