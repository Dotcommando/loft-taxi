import React from 'react';

const AuthContext = React.createContext({
    isAuth: false,
    hasError: false,
    logIn: () => {},
    logOut: () => {},
    setError: ( msg: string | false ) => {},
    errorMsg: '',
} as IContextStore);

type Props = {};
type State = {
    isAuth: boolean,
    hasError: boolean,
    errorMsg: string,
}

class AuthProvider extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isAuth: false,
            hasError: false,
            errorMsg: '',
        };
    }

    logIn = () => this.setState({
        isAuth: true,
        hasError: false,
        errorMsg: '',
    });

    logOut = () => this.setState({
        isAuth: false,
        hasError: false,
        errorMsg: '',
    });

    setError = ( msg: string | false ) => {
        this.setState({
            isAuth: false,
            hasError: typeof msg === 'string',
            errorMsg: msg !== false ? msg : '',
        });
    };

    getProviderValue = () => {
        const { isAuth, hasError, errorMsg } = this.state;
        console.log('RESULT', this.state);
        return {
            isAuth,
            hasError,
            logIn: this.logIn,
            logOut: this.logOut,
            setError: this.setError,
            errorMsg,
        }
    };

    render() {
        const { children } = this.props;
        return <AuthContext.Provider value={this.getProviderValue()}>{ children }</AuthContext.Provider>;
    }
}

export { AuthContext, AuthProvider };

export interface IContextStore {
    isAuth: boolean;
    hasError: boolean;
    logIn: () => void;
    logOut: () => void;
    setError: IErrorSetter;
    errorMsg: string;
}

export interface IErrorSetter { (msg: string | false): void }
