import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../theme/appTheme';

interface Props {
    title : string;
    noMB? : boolean;
    noMT? : boolean;
    noMH? : boolean;
    textAlign?: 'center' | 'left' | 'right';
}

export const HeaderTitle = ( {title, noMB= false, noMT= false, noMH = false, textAlign = 'center'}: Props ) => {
    const { top } = useSafeAreaInsets();
    return (
        <View 
            style={{ 
                marginHorizontal: noMH ? 0 : 20,
                marginTop   : noMT ? 0 : top +10,
                marginBottom: noMB ? 0 : 20,
             }}
        >
            <Text style={{ 
                ...styles.title ,
                textAlign
            }}>{ title }</Text>
        </View>
    )
}


