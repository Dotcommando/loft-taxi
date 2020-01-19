import React, {ReactNode, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import styles from './App.module.scss';

type Props = {};

const App: React.FunctionComponent<Props> = () => {
    const [ route, setRoute ] = useState('sign-in');
    const routes: { [n: string]: ReactNode } = {
        'sign-in': <SignIn />,
        'sign-up': <SignUp />,
    };

    return (
    <div className={styles['app']}>
        <div className={styles['switcher']}>
            <span onClick={() => setRoute('sign-in')} className={styles['pseudo-link']}>Войти</span> | <span onClick={() => setRoute('sign-up')} className={styles['pseudo-link']}>Регистрация</span>
        </div>
            { routes[route] }
            {/*<Router>*/}
            {/*    <Switch>*/}
            {/*        <Route path="/" render={() => <SignUp />} />*/}
            {/*    </Switch>*/}
            {/*</Router>*/}
      </div>
  );
};

export default App;
