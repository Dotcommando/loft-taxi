import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './contexts/auth-context';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import Map from './pages/map/map';
import Profile from './pages/profile/profile';
import styles from './App.module.scss';
import Header from './components/header/header';

type Props = {};

const App: React.FunctionComponent<Props> = () => {
    return (
    <div className={styles['app']}>
        <AuthContext.Consumer>
            {({ isAuth, hasError, logIn, logOut, setError, errorMsg }) => (
                <Router>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={
                                () => isAuth
                                ? <Redirect to="/map" />
                                : (
                                    <SignIn
                                        isAuth={ isAuth }
                                        logIn={ logIn }
                                        hasError={ hasError }
                                        errorMsg={ errorMsg }
                                        setError={ setError }
                                    />
                                )
                            }
                        />
                        <Route
                            path="/sign-up"
                            render={
                                () => <SignUp
                                    isAuth={ isAuth }
                                    logIn={ logIn }
                                    hasError={ hasError }
                                    errorMsg={ errorMsg }
                                    setError={ setError }
                                />
                            }
                        />
                        <Route
                            path="/map"
                            render={
                                () => isAuth
                                    ? <Map><Header logOut={ logOut } /></Map>
                                    : <Redirect to="/" />
                            }
                        />
                        <Route
                            path="/profile"
                            render={
                                () => <Profile logOut={ logOut } />
                            }
                        />
                    </Switch>
                </Router>
            )}
        </AuthContext.Consumer>
    </div>
  );
};

export default App;
