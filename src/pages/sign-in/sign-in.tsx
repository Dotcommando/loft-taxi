import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IValidatorWithPredefinedRule, ValidationRule } from '../../models/common';
import { validatorWithCustomRule } from '../../helpers/validation-engine';
import { lengthValidator, requiredValidator } from '../../helpers/validators';
import Main from '../../components/main/main';
import WhiteBox from '../../components/white-box/white-box';
import ValidationWrapper from '../../components/validation-wrapper/validation-wrapper';
import InputButton from '../../components/input-button/input-button';
import InputText from '../../components/input-text/input-text';
import classNames from 'classnames/bind';
import styles from './sign-in.module.scss';

const cx = classNames.bind(styles);

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

const requiredPasswordRule: ValidationRule = {
    name: 'required validation',
    errorMessage: 'Введите, пожалуйста, пароль.',
    criteria: [],
};
const requiredPasswordValidator: IValidatorWithPredefinedRule =
    validatorWithCustomRule(requiredValidator, requiredPasswordRule);

const SignIn: React.FunctionComponent<Props> = () => {
    const [ login, setLogin ] = useState('');
    const [ password, setPassword ] = useState('');
    const history = useHistory();

    return (
        <Main>
            <div className={styles['sign-in']}>
                <WhiteBox>
                    <h1 className={styles['sign-in__title']}>Войти</h1>
                    <p>Новый пользователь? <Link to="/sign-up">Зарегистрируйтесь</Link></p>
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
                    <ValidatedInputText
                        key="password"
                        name="password"
                        type="password"
                        value={ password }
                        placeholder={'Пароль'}
                        valueHandler={(newPassword: string) => { setPassword(newPassword) }}
                        validateAfterBlur={true}
                        validateOnInputAfterFirstBlur={true}
                        validators={[
                            requiredPasswordValidator,
                            lengthValidatorWithRule,
                        ]}
                    />
                    <div className={cx({
                        'row': true,
                        'row_align-right': true
                    })}>
                        <InputButton onClick={() => history.push('/map')} mode="primary">Войти</InputButton>
                    </div>
                </WhiteBox>
            </div>
        </Main>
    );
};

export default SignIn;
