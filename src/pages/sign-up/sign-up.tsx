import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    lengthValidatorWithRule,
    requiredValidatorWithRule,
    requiredPasswordValidator,
} from './sign-up.validators';
import { IValidationResults } from '../../models/common';
import { IErrorSetter } from '../../contexts/auth-context';
import { eventEmitter } from '../../helpers/event-emitter';
import Main from '../../components/main/main';
import WhiteBox from '../../components/white-box/white-box';
import ValidationWrapper from '../../components/validation-wrapper/validation-wrapper';
import InputButton from '../../components/input-button/input-button';
import InputText from '../../components/input-text/input-text';
import Logo from '../../components/logo/logo';
import classNames from 'classnames/bind';
import styles from './sign-up.module.scss';

const cx = classNames.bind(styles);

export interface ISignUpProps {
    isAuth: boolean;
    hasError: boolean;
    errorMsg: string;
    logIn: () => void;
    setError: IErrorSetter;
}

const ValidatedInputText = ValidationWrapper(InputText);

const SignUp: React.FunctionComponent<ISignUpProps> = (props: ISignUpProps) => {
    const [ email, setEmail ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ userLastName, setUserLastName ] = useState('');
    const [ password, setPassword ] = useState('');

    const onFieldValidate = (currValue: string, validationResults: IValidationResults, fn: IErrorSetter) => {
        if (!validationResults.totalValid()) {
            fn(validationResults.errorMessages()[0]);
        } else {
            fn(false);
        }
    };

    const onSubmit = () => {
        eventEmitter.dispatch('run validation for email');
        eventEmitter.dispatch('run validation for userName');
        eventEmitter.dispatch('run validation for userLastName');
        eventEmitter.dispatch('run validation for password');
        setTimeout(() => {
            console.log('hasError', props.hasError);
            // if (!props.hasError) { props.logIn(); console.log(props); }
        }, 50);
    };

    return(
        <Main>
            <Logo />
            <div className={styles['sign-up']}>
                <WhiteBox>
                    <h1 className={styles['sign-up__title']}>Регистрация { JSON.stringify(props.hasError) }</h1>
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
                        onValidate={
                            (currValue: string, validationResults: IValidationResults) =>
                                onFieldValidate(currValue, validationResults, props.setError)
                        }
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
                                onValidate={
                                    (currValue: string, validationResults: IValidationResults) =>
                                        onFieldValidate(currValue, validationResults, props.setError)
                                }
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
                                onValidate={
                                    (currValue: string, validationResults: IValidationResults) =>
                                        onFieldValidate(currValue, validationResults, props.setError)
                                }
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
                        onValidate={
                            (currValue: string, validationResults: IValidationResults) =>
                                onFieldValidate(currValue, validationResults, props.setError)
                        }
                        validators={[
                            requiredPasswordValidator,
                            lengthValidatorWithRule,
                        ]}
                    />

                    <div className={cx({
                        'row': true,
                        'row_align-right': true
                    })}>
                        <InputButton
                            onClick={() => onSubmit()}
                            mode="primary"
                        >
                            Зарегистрироваться
                        </InputButton>
                    </div>
                </WhiteBox>
            </div>
        </Main>
    );
};

export default SignUp;
