import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import Map from './pages/map/map';
import Profile from './pages/profile/profile';
import styles from './App.module.scss';

type Props = {};

const App: React.FunctionComponent<Props> = () => {
    return (
    <div className={styles['app']}>
        <Router>
            <Switch>
                <Route path="/" exact render={() => <SignIn />} />
                <Route path="/sign-up" render={() => <SignUp />} />
                <Route path="/map" render={() => <Map />} />
                <Route path="/profile" render={() => <Profile />} />
            </Switch>
        </Router>
      </div>
  );
};

export default App;
