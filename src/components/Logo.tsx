import React from 'react'
import { Image, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Logo = () => {
    const { top } = useSafeAreaInsets()
    return (
        <View 
            style={{ 
                marginTop: top +20,
                justifyContent:'center',
                alignItems: 'center',
                
             }}
        >
            <Image
            style={{ 
                width:100,
                height: 100
             }} 
                source={ require('../assets/logo.png') }
            />
        </View>
    )
}
