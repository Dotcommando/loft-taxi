import React, { useState } from 'react';
import Main from '../../components/main/main';
import WhiteBox from '../../components/white-box/white-box';
import InputText from '../../components/input-text/input-text';
import styles from './sign-in.module.scss';

type Props = {};

const SignIn: React.FunctionComponent<Props> = () => {
    const [ login, setLogin ] = useState('');

    return (
        <>
            <Main>
                <div className={styles['sign-in']}>
                    <WhiteBox>
                        <h1 className={styles['sign-in__title']}>Войти</h1>
                        <p>Новый пользователь? <a href="#">Зарегистрируйтесь</a></p>
                        <InputText
                            name="login"
                            type="text"
                            value={ login }
                            placeholder={'Логин'}
                            valueHandler={(newLogin: string) => { setLogin(newLogin) }}
                        />
                    </WhiteBox>
                </div>
            </Main>
        </>
    );
};

export default SignIn;
