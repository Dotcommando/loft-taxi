import React from 'react';
import { initialAuthState } from './reducers/auth-reducer';

const authContext = React.createContext(initialAuthState);

export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;

export default authContext;
