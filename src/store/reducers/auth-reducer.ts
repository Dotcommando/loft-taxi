export const initialAuthState: IStore = {
    isLoggedIn: false,
    email: '',
    password: '',
    error: ''
};

export const authReducer: IAuthReducer = (state: IStore, action: IAuthAction): IStore => {
    switch (action.type) {
        case '[LOGIN]':
            return {
                isLoggedIn: true,
                email: action.payload.email,
                password: action.payload.password,
                error: '',
            };
        case '[LOGIN_ERROR]':
            return {
                isLoggedIn: false,
                email: '',
                password: '',
                error: action.payload.error,
            };
        case '[LOGOUT]':
            return {
                isLoggedIn: false,
                email: '',
                password: '',
                error: '',
            };
        default:
            return state;
    }
};

export interface IAuthReducer { (state: IStore, action: IAuthAction): IStore }

export interface IStore {
    isLoggedIn: boolean,
    email: string,
    password?: string,
    error?: string,
}

export interface IAuthAction {
    type: '[LOGIN]' | '[LOGIN_ERROR]' | '[LOGOUT]';
    payload: IStore,
}
