import React, { useState } from 'react';
import { IValidatorWithPredefinedRule, ValidationRule } from '../../models/common';
import { validatorWithCustomRule } from '../../helpers/validation-engine';
import { lengthValidator, requiredValidator } from '../../helpers/validators';
import Main from '../../components/main/main';
import WhiteBox from '../../components/white-box/white-box';
import ValidationWrapper from '../../components/validation-wrapper/validation-wrapper';
import InputText from '../../components/input-text/input-text';
import styles from './sign-in.module.scss';

type Props = {};

const ValidatedInputText = ValidationWrapper(InputText);

const lengthRule: ValidationRule = {
    name: 'length validation',
    errorMessage: 'Значение должно быть длиннее {min} символов.',
    criteria: [
        { name: 'min', value: 5 },
    ],
};
const lengthValidatorWithRule: IValidatorWithPredefinedRule =
    validatorWithCustomRule(lengthValidator, lengthRule);

const requiredRule: ValidationRule = {
    name: 'required validation',
    errorMessage: 'Поле должно быть заполнено.',
    criteria: [],
};
const requiredValidatorWithRule: IValidatorWithPredefinedRule =
    validatorWithCustomRule(requiredValidator, requiredRule);

const SignIn: React.FunctionComponent<Props> = () => {
    const [ login, setLogin ] = useState('');

    return (
        <Main>
            <div className={styles['sign-in']}>
                <WhiteBox>
                    <h1 className={styles['sign-in__title']}>Войти</h1>
                    <p>Новый пользователь? <a href="#">Зарегистрируйтесь</a></p>
                        <ValidatedInputText
                            key="login"
                            name="login"
                            type="text"
                            value={ login }
                            placeholder={'Логин'}
                            valueHandler={(newLogin: string) => { setLogin(newLogin) }}
                            validateAfterBlur={true}
                            validateOnInputAfterFirstBlur={true}
                            validators={[
                                requiredValidatorWithRule,
                                lengthValidatorWithRule,
                            ]}
                        />
                </WhiteBox>
            </div>
        </Main>
    );
};

export default SignIn;
