import React, { useContext, useEffect, useState } from 'react'
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

export const LoginScreen = ({ navigation }: Props ) => {

    const [loading, setLoading] = useState(false);
    const { errorMessage, signIn, removeError  } = useContext( AuthContext );

    
    const { correo, password, onChange } = useForm({
        correo: 'test1@test.com',
        password: '123456'
    })

    useEffect( () => {
        if (errorMessage.length === 0) return

        Alert.alert( 'Login incorrecto', errorMessage, [{
                text: 'Ok',
                onPress: removeError
            }]
        );

    }, [ errorMessage ])

    const onLogin = async () => {
        setLoading(true);
        await signIn({correo, password});
        Keyboard.dismiss();
        setLoading(false);
    }

    return (
        <View style={ loginStyles.container } >
            { loading && <LoadingModal /> }
            <ImgBackground />
            <KeyboardAvoidingView
                behavior={ (Platform.OS=== 'android') ? 'height' : 'padding' }
            >
                <Logo  />
                <HeaderTitle title='Iniciar Sesión' noMT />
                <View>
                    <Input 
                        label='Correo electrónico' 
                        placeholder='Ejemplo: maria@gmail.com' 
                        noAutoCap
                        onChange={( value ) => onChange( value, 'correo' )} 
                        icon='mail-outline'
                        value={correo}
                    />
                    <View style={{ height:30 }} ></View>
                    <Input 
                        label='Contraseña' 
                        placeholder='Ingresa tu contraseña' 
                        password
                        value={password}
                        onChange={ ( value ) => onChange( value, 'password' ) } 
                        icon='lock-open-outline'
                    />
                </View>
                <TouchableOpacity 
                    onPress={ () => navigation.replace('RegisterScreen') }
                >
                    <Text style={ loginStyles.account }> Crear una cuenta</Text>
                </TouchableOpacity>

                <View style={ loginStyles.loginContainer }>
                    <TouchableOpacity 
                        onPress={ onLogin }
                        style={ loginStyles.loginButton }
                    >
                        <Text style={ loginStyles.loginText }>Login </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
