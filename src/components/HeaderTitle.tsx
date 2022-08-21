import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles, colors } from '../theme/appTheme';

interface Props {
    title : string;
    noMB? : boolean;
    noMT? : boolean;
    noMH? : boolean;
    textAlign?: 'center' | 'left' | 'right';
    button?: boolean;
    onPress?: () => void;
    text?: string
}

export const HeaderTitle = ( {
    title, 
    noMB= false, 
    noMT= false, 
    noMH = false,
    button,
    onPress,
    text ,
    textAlign = 'center'}: Props ) => {
    const { top } = useSafeAreaInsets();
    return (
        <View 
            style={{ 
                marginHorizontal: noMH ? 0 : 20,
                marginTop   : noMT ? 0 : top +10,
                marginBottom: noMB ? 0 : 20,
                justifyContent:'center'
             }}
        >
            <Text style={{ 
                ...styles.title ,
                textAlign
            }}>{ title }</Text>
            {
                button &&
                (
                    <TouchableOpacity
                        onPress={ onPress }
                        style={{ position:'absolute', alignSelf:'flex-end' }}
                    >
                        <Text style={{ color:colors.light, fontSize: 20 }} >{text}</Text>
                    </TouchableOpacity>
                )
            }

        </View>
    )
}


