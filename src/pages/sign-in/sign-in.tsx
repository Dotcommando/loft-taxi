import React, { useContext, useState, Dispatch, SetStateAction, ReducerAction } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IValidationResults } from '../../models/common';
import {
    lengthValidatorWithRule,
    requiredValidatorWithRule,
    requiredPasswordValidator,
} from './sign-in.validators';
import { eventEmitter } from '../../helpers/event-emitter';
import { IAuthReducer } from '../../store/reducers/auth-reducer';
import Main from '../../components/main/main';
import WhiteBox from '../../components/white-box/white-box';
import ValidationWrapper from '../../components/validation-wrapper/validation-wrapper';
import InputButton from '../../components/input-button/input-button';
import InputText from '../../components/input-text/input-text';
import authContext from '../../store';
import Logo from '../../components/logo/logo';
import classNames from 'classnames/bind';
import styles from './sign-in.module.scss';

const cx = classNames.bind(styles);

export interface ISignInProps {
    dispatch: Dispatch<ReducerAction<IAuthReducer>>,
}

const ValidatedInputText = ValidationWrapper(InputText);

const SignIn: React.FunctionComponent<ISignInProps> = (props: ISignInProps) => {
    const state = useContext(authContext);
    const [ authLogin, setAuthLogin ] = useState('');
    const [ authPassword, setAuthPassword ] = useState('');
    const [ loginHasError, setLoginHasError ] = useState(true);
    const [ passwordHasError, setPasswordHasError ] = useState(true);
    const history = useHistory();

    const onFieldValidate = (currValue: string, validationResults: IValidationResults, fn: Dispatch<SetStateAction<boolean>>) => {
        fn(!validationResults.totalValid());
    };

    const onSubmit = () => {
        eventEmitter.dispatch('run validation for login');
        eventEmitter.dispatch('run validation for password');
        if (!loginHasError && !passwordHasError && authPassword === '123123') {
            props.dispatch({
                type: '[LOGIN]',
                payload: {
                    isLoggedIn: true,
                    email: authLogin,
                    password: authPassword,
                    error: '',
                }
            });

            history.push('/map');
            return;
        }
        props.dispatch({
            type: '[LOGIN_ERROR]',
            payload: {
                isLoggedIn: false,
                email: '',
                password: '',
                error: 'Ошибка авторизации',
            }
        });
    };

    return (
        <Main>
            <Logo />
            <div className={styles['sign-in']}>
                <WhiteBox>
                    <h1 className={styles['sign-in__title']}>Войти</h1>
                    <p>Новый пользователь? <Link to="/sign-up">Зарегистрируйтесь</Link></p>
                    { state.error ? <p className={styles['error-msg']}>{ state.error }</p> : null }
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
                                onFieldValidate(currValue, validationResults, setLoginHasError)
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
                                onFieldValidate(currValue, validationResults, setPasswordHasError)
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
