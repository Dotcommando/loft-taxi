import React, { Dispatch, ReducerAction, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { AuthProvider } from './store';
import { authReducer, IAuthReducer, initialAuthState } from './store/reducers/auth-reducer';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import Map from './pages/map/map';
import Profile from './pages/profile/profile';
import styles from './App.module.scss';

type Props = {};

const App: React.FunctionComponent<Props> = () => {
    const [ state, dispatch ] = useReducer(authReducer, initialAuthState);

    return (
    <div className={styles['app']}>
        <AuthProvider value={ state }>
            <Router>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props: RouteComponentProps<Dispatch<ReducerAction<IAuthReducer>>>) =>
                            <SignIn { ...props } dispatch={ dispatch } />}
                    />
                    <Route path="/sign-up" render={() => <SignUp />} />
                    <Route path="/map" render={() => <Map />} />
                    <Route path="/profile" render={() => <Profile />} />
                </Switch>
            </Router>
        </AuthProvider>
      </div>
  );
};

export default App;
