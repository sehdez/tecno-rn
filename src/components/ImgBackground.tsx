import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { colors } from '../theme/appTheme'
const { width, height } = Dimensions.get('window')
interface Props {
    background2?: boolean; 
}
export const ImgBackground = ({ background2 = false }: Props) => {
    
    return (
        <View style={{ flex:1,  ...StyleSheet.absoluteFillObject, alignItems:'center' }}>
            <Image 
                style={{ 
                    position:'absolute',
                    transform:[{ rotate: '-90deg' }],
                    tintColor: background2 ? colors.background : colors.primary,
                    top:height-180,
                    left:-150,
                    width: 310,
                    height: 310,
                    zIndex:1
                 }}
                source={ require('../assets/bg.png')}
            />
            <View style={{ 
                position: 'absolute',
                backgroundColor: colors.primary,
                top: background2 ? 0 : -370,
                height:1000,
                width:1000,
                transform: background2 ? [] : [{ rotate: '22deg' }],
             }}></View>
        </View>
    )
}
