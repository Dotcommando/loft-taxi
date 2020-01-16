import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './pages/sign-in/sign-in';
import styles from './App.module.scss';

type Props = {};

const App: React.FunctionComponent<Props> = () => {
  return (
    <div className={styles['app']}>
      <Router>
          <Switch>
              <Route path="/" render={() => <SignIn />} />
          </Switch>
      </Router>
    </div>
  );
};

export default App;
