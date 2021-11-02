import React, { createContext, useEffect, useReducer } from "react";
import busApi from "../api/busApi";
import { User, LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: (LoginData: LoginData) => void;
    removeError: () => void;
    logOut: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ( { children }: any) =>{

    const [state, dispatch] = useReducer( authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        if( !token ) return dispatch({ type: 'notAuthenticated'});

        const resp = await busApi.get('/auth');
        if( resp.status !== 200 ){
            return dispatch({ type: 'notAuthenticated'});
        }
        await AsyncStorage.setItem('token', resp.data.token)
        dispatch({
            type: 'sigIn',
            payload: {
                token: resp.data.token,
                user: resp.data.user
            }
        });
    }
    
    const signIn = async({email, password} :LoginData) => {
        try {
            const { data : { token, user}} = await busApi.post<LoginResponse>('/auth/login', { email, password})
            dispatch({
                type: 'sigIn',
                payload: {
                    token: token,
                    user: user
                }
            });

            await AsyncStorage.setItem('token', token)

        } catch (error: any) {
            dispatch({ type: 'addError', payload: error.response.data.msg || 'Información incorrecta'})
        }
    };
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'logout'})
    };
    const removeError = () => {
        dispatch({type: 'removeError'})
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}

