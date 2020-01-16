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
import styles from './sign-up.module.scss';

const cx = classNames.bind(styles);

type Props = {}

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

const SignUp: React.FunctionComponent<Props> = () => {
    const [ email, setEmail ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ userLastName, setUserLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const history = useHistory();

    return(
        <Main>
            <div className={styles['sign-up']}>
                <WhiteBox>
                    <h1 className={styles['sign-up__title']}>Регистрация</h1>
                    <p>Уже зарегистрированы? <Link to="/">Войти</Link></p>
                    <ValidatedInputText
                        key="email"
                        name="email"
                        type="text"
                        value={ email }
                        placeholder={'E-mail'}
                        valueHandler={(newEmail: string) => { setEmail(newEmail) }}
                        validateAfterBlur={true}
                        validateOnInputAfterFirstBlur={true}
                        validators={[
                            requiredValidatorWithRule,
                        ]}
                    />
                    <div className={styles['two-inputs-row']}>
                        <div className={styles['input-wrapper']}>
                            <ValidatedInputText
                                key="userName"
                                name="userName"
                                type="text"
                                value={ userName }
                                placeholder={'Имя'}
                                valueHandler={(newUserName: string) => { setUserName(newUserName) }}
                                validateAfterBlur={true}
                                validateOnInputAfterFirstBlur={true}
                                validators={[
                                    requiredValidatorWithRule,
                                ]}
                            />
                        </div>

                        <div className={styles['input-wrapper']}>
                            <ValidatedInputText
                                key="userLastName"
                                name="userLastName"
                                type="text"
                                value={ userLastName }
                                placeholder={'Фамилия'}
                                valueHandler={(newUserLastName: string) => { setUserLastName(newUserLastName) }}
                                validateAfterBlur={true}
                                validateOnInputAfterFirstBlur={true}
                                validators={[
                                    requiredValidatorWithRule,
                                ]}
                            />
                        </div>
                    </div>
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
                        <InputButton onClick={() => history.push('/map')} mode="primary">Зарегистрироваться</InputButton>
                    </div>
                </WhiteBox>
            </div>
        </Main>
    );
};

export default SignUp;
