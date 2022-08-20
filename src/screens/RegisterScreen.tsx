import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderTitle } from '../components/HeaderTitle';
import { ImgBackground } from '../components/ImgBackground';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';
import { loginStyles } from '../theme/logintheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { LoadingModal } from '../components/LoadingModal';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ( { navigation }: Props ) => {
    const { correo, password, nombre, password2, onChange, loading } = useForm({
        loading: false,
        nombre: 'Test1',
        correo: 'test1@test.com',
        password: '123456',
        password2: '123456'
    })

    const { errorMessage, signUp, removeError  } = useContext( AuthContext );

    useEffect( () => {
            if (errorMessage.length === 0) return

            Alert.alert( 'Registro incorrecto', errorMessage, [{
                    text: 'Ok',
                    onPress: removeError
                }]
            );

        }, [ errorMessage ])

    const onRegister = async() => {
        onChange(true, 'loading' )
        await signUp({ nombre, correo, password })
        onChange(false, 'loading' )
        Keyboard.dismiss();
    }


    return (
        <View style={ loginStyles.container } >
            { loading && <LoadingModal /> }
            <ImgBackground background2 />
            <KeyboardAvoidingView
                behavior={ (Platform.OS=== 'android') ? 'height' : 'padding' }
            >   
            <ScrollView>
                <Logo  />
                <HeaderTitle title='Nueva cuenta' noMT />
                <View>
                    <Input 
                        label='Nombre' 
                        placeholder='Ejemplo: María' 
                        onChange={( value ) => onChange( value, 'nombre' )} 
                        icon='people-outline'
                        value={nombre}
                    />
                    <Input 
                        label='Correo electrónico' 
                        placeholder='Ejemplo: maria@gmail.com' 
                        noAutoCap
                        onChange={( value ) => onChange( value, 'correo' )} 
                        icon='mail-outline'
                        value={correo}
                    />
                    <Input 
                        label='Contraseña' 
                        placeholder='Ingresa tu contraseña' 
                        password
                        value={password}
                        onChange={ ( value ) => onChange( value, 'password' ) } 
                        icon='lock-open-outline'
                    />
                    <Input 
                        label='Confirmar contraseña' 
                        placeholder='Confirma tu contraseña' 
                        password
                        value={password2}
                        onChange={ ( value ) => onChange( value, 'password2' ) } 
                        icon='lock-closed-outline'
                    />
                </View>
                <TouchableOpacity 
                    onPress={ () => navigation.replace('LoginScreen') }
                >
                    <Text style={ loginStyles.account }>Iniciar sesión</Text>
                </TouchableOpacity>

                <View style={ loginStyles.loginContainer }>
                    <TouchableOpacity 
                        onPress={ onRegister }
                        style={ loginStyles.loginButton }
                    >
                        <Text style={ loginStyles.loginText }>Registrase </Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}