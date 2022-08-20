import React, { useContext, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import { HeaderTitle } from '../components/HeaderTitle';
import { ImgBackground } from '../components/ImgBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export const HomeScreen = () => {

    const { logOut, user } = useContext(AuthContext)
    

    return (
        <View style={{ flex:1 }}>
            <ImgBackground />
            <HeaderTitle title={ user?.nombre || 'No viene el nombre' } />
            <Button 
                title='Cerrar sesión'
                onPress={logOut}
            />
        </View>
    )
}
