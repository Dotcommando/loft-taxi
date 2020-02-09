import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IValidationResults } from '../../models/common';
import {
    lengthValidatorWithRule,
    requiredValidatorWithRule,
    requiredPasswordValidator,
} from './sign-in.validators';
import { IErrorSetter } from '../../contexts/auth-context';
import { eventEmitter } from '../../helpers/event-emitter';
import Main from '../../components/main/main';
import WhiteBox from '../../components/white-box/white-box';
import ValidationWrapper from '../../components/validation-wrapper/validation-wrapper';
import InputButton from '../../components/input-button/input-button';
import InputText from '../../components/input-text/input-text';
import Logo from '../../components/logo/logo';
import classNames from 'classnames/bind';
import styles from './sign-in.module.scss';

const cx = classNames.bind(styles);

export interface ISignInProps {
    isAuth: boolean;
    hasError: boolean;
    errorMsg: string;
    logIn: () => void;
    setError: IErrorSetter;
}

const ValidatedInputText = ValidationWrapper(InputText);

const SignIn: React.FunctionComponent<ISignInProps> = (props: ISignInProps) => {
    const [ authLogin, setAuthLogin ] = useState('');
    const [ authPassword, setAuthPassword ] = useState('');

    const onFieldValidate = (currValue: string, validationResults: IValidationResults, fn: IErrorSetter) => {
        if (!validationResults.totalValid()) {
            fn(validationResults.errorMessages()[0]);
        } else {
            fn(false);
        }
    };

    const onSubmit = () => {
        eventEmitter.dispatch('run validation for login');
        eventEmitter.dispatch('run validation for password');
        console.log(props);
        if (!props.hasError) { props.logIn(); }
    };

    return (
        <Main>
            <Logo />
            <div className={styles['sign-in']}>
                <WhiteBox>
                    <h1 className={styles['sign-in__title']}>Войти</h1>
                    <p>Новый пользователь? <Link to="/sign-up">Зарегистрируйтесь</Link></p>
                    <ValidatedInputText
                        key="login"
                        name="login"
                        type="text"
                        value={ authLogin }
                        placeholder={'Логин'}
                        valueHandler={(newLogin: string) => { setAuthLogin(newLogin) }}
                        validateAfterBlur={true}
                        validateOnInputAfterFirstBlur={true}
                        onValidate={
                            (currValue: string, validationResults: IValidationResults) =>
                                onFieldValidate(currValue, validationResults, props.setError)
                        }
                        validators={[
                            requiredValidatorWithRule,
                            lengthValidatorWithRule,
                        ]}
                    />
                    <ValidatedInputText
                        key="password"
                        name="password"
                        type="password"
                        value={ authPassword }
                        placeholder={'Пароль'}
                        valueHandler={(newPassword: string) => { setAuthPassword(newPassword) }}
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
                        <InputButton onClick={() => onSubmit()} mode="primary">Войти</InputButton>
                    </div>
                </WhiteBox>
            </div>
        </Main>
    );
};

export default SignIn;
