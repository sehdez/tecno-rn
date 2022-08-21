import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Producto } from '../interfaces/appInterfaces';
import { colors } from '../theme/appTheme';

interface Props {
    product: Producto,
    onPress: () => void;
} 

export const ProductCard = ( { product, onPress }: Props ) => {

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
            <Text style={ styles.title }>{ product.nombre }</Text>

            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{ width:'100%', height:300 }}
                onPress = { onPress }
            >
                <Image 
                    style={{ width:'100%', height:300 }}
                    source={{
                        uri: product.img
                    }}
                />
            </TouchableOpacity>
            <View>
                <Text>{ product.categoria.nombre }</Text>
                <Text>{ product.precio }</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height: 340,
        backgroundColor: colors.secondary+'90',
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        borderRadius: 20,
        overflow:'hidden'
    },
    header: {
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: 40,
        backgroundColor: colors.secondary+'90',
        justifyContent:'center',
        alignItems: 'center'
    },
    title: {
        color: colors.white,
        fontSize: 25,
        fontWeight: 'bold',


    }
});
