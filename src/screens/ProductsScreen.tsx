import React, { useContext } from 'react'
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { HeaderTitle } from '../components/HeaderTitle';
import { ProductsContext } from '../context/ProductsContext';
import { ProductCard } from '../components/ProductCard';
import { LogoBackground } from '../components/LogoBackground';
import { ProductsStackParams } from '../router/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({ navigation }: Props) => {
    const { top } = useSafeAreaInsets();

    const { products, loadProducts } = useContext( ProductsContext );



    return (
        <View style={ styles.container }>
            <View style={{ marginTop: top }}></View>
            <LogoBackground />
            <FlatList 
                data={products}
                renderItem = { ({ item }) => <ProductCard product={ item } onPress = { () => navigation.navigate('ProductScreen', {id: item._id, name: item.nombre})} />}
                keyExtractor = { ( item ) => item._id  }
                ListHeaderComponent = {() => (
                    <HeaderTitle 
                        title='Productos' noMT button 
                        onPress={ ()=> navigation.navigate('ProductScreen', {name:'Nuevo Producto'})}  
                        text='agregar' 
                    />)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});