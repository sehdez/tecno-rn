import React, { createContext, useEffect, useReducer } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import tecnoApi from '../api/tecnoApi';
import { AuthReducer, AuthState } from './authReducer';

import { Usuario, Status, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';


type AuthContextProps = {

    errorMessage : string;
    token: string  | null;
    user : Usuario | null;
    status: Status
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;


};

const authInitialState : AuthState = {
    errorMessage:'',
    status: "checking",
    token: null,
    user: null
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ( { children }: { children: JSX.Element | JSX.Element [] } ) => {

    const [ state, dispatch ] = useReducer( AuthReducer, authInitialState );

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if( !token ) return dispatch({ type: "authenticatedFail" });
        try {
            const { data } = await tecnoApi.get<LoginResponse>('/auth')
            dispatch({
                type: 'signUp',
                payload: { 
                    token: data.token,
                    user : data.usuario
                }
            })
            
            await AsyncStorage.setItem('token', data.token)

        } catch (error) {
            dispatch({ type: "authenticatedFail" });
        }

        

        
    }

    useEffect(() => {
        checkToken()
    },[])

    const signUp = async ( registerData: RegisterData ) => {
        try {
            const { data } = await tecnoApi.post<LoginResponse>('/usuarios', {...registerData, rol: "USER_ROLE"})
            
            dispatch({
                type: 'signUp',
                payload: { 
                    token: data.token,
                    user : data.usuario
                }
            })
            
            await AsyncStorage.setItem('token', data.token)

        } catch ( err: any ) {
            dispatch({
                type: "addError",
                payload: (err.message === 'Network Error') 
                    ? 'Verifique su conexión a internet'
                    : 'Los datos proporcionados no son correctos'
            })
        }
    };
    const signIn = async ( loginData : LoginData ) => {
        try {
            const { data } = await tecnoApi.post<LoginResponse>('/auth/login', loginData)
            
            dispatch({
                type: 'signUp',
                payload: { 
                    token: data.token,
                    user : data.usuario
                }
            })
            
            await AsyncStorage.setItem('token', data.token)

        } catch ( err: any ) {
            dispatch({
                type: "addError",
                payload: (err.message === 'Network Error') 
                    ? 'Verifique su conexión a internet'
                    : 'Los datos proporcionados no son correctos'
            })

        }
    };
    const logOut = async () => {
        dispatch({type: 'logout'})
        await AsyncStorage.removeItem('token')
    };
    const removeError = () => {
        dispatch({ type: 'removeError' })
    };

    return (
        <AuthContext.Provider value = {{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    )

} 