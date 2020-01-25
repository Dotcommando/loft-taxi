import { IValidatorWithPredefinedRule, ValidationRule } from '../../models/common';
import { validatorWithCustomRule } from '../../helpers/validation-engine';
import { lengthValidator, requiredValidator } from '../../helpers/validators';

const lengthRule: ValidationRule = {
    name: 'length validation',
    errorMessage: 'Значение должно быть длиннее {min} символов.',
    criteria: [
        { name: 'min', value: 5 },
    ],
};
export const lengthValidatorWithRule: IValidatorWithPredefinedRule =
    validatorWithCustomRule(lengthValidator, lengthRule);

const requiredRule: ValidationRule = {
    name: 'required validation',
    errorMessage: 'Поле должно быть заполнено.',
    criteria: [],
};
export const requiredValidatorWithRule: IValidatorWithPredefinedRule =
    validatorWithCustomRule(requiredValidator, requiredRule);

const requiredPasswordRule: ValidationRule = {
    name: 'required validation',
    errorMessage: 'Введите, пожалуйста, пароль.',
    criteria: [],
};
export const requiredPasswordValidator: IValidatorWithPredefinedRule =
    validatorWithCustomRule(requiredValidator, requiredPasswordRule);
