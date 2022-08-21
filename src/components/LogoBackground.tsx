import React from 'react'
import { View, Image, StyleSheet } from 'react-native';

export const LogoBackground = () => {
    return (
        <View style={ styles.container }>
            <Image 
                source={require('../assets/logo.png')}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top: -100,
        right: -150 ,
        opacity: 0.2
    }
});