import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/appTheme';

interface Props {
    background?: boolean;
}
export const LoadingModal = ( { background = false }: Props ) => {
    return (
        <View style={{ 
            ...StyleSheet.absoluteFillObject,
            ...styles.container,
            backgroundColor: background ? colors.primary : 'rgba(0,0,0,0.4)' 
        }}>
            <ActivityIndicator color={'white'} size={50} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 99,
        justifyContent: 'center',
        alignItems : 'center'
    }
});
