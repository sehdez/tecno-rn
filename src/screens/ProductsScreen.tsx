import React, { useContext, useState } from 'react'
import { FlatList, Text, View, StyleSheet, Image, Button, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { HeaderTitle } from '../components/HeaderTitle';
import { ProductsContext } from '../context/ProductsContext';
import { ProductCard } from '../components/ProductCard';
import { LogoBackground } from '../components/LogoBackground';
import { ProductsStackParams } from '../router/ProductsNavigator';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({ navigation }: Props) => {
    const { top } = useSafeAreaInsets();

    const { logOut } = useContext(AuthContext)
    const { products, loadProducts } = useContext( ProductsContext );

    const [refreshing, setRefreshing] = useState(false)
    
    const onRefresh = async () => {
        setRefreshing(true)
        await loadProducts();
        setRefreshing(false)
    }

    return (
        <View style={ styles.container }>
            <>
            <View style={{ marginTop: top }}></View>
            <LogoBackground />
            <FlatList 
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh = {onRefresh}
                />
                }
                data={products}
                renderItem = { ({ item }) => <ProductCard product={ item } onPress = { () => navigation.navigate('ProductScreen', {id: item._id, name: item.nombre})} />}
                keyExtractor = { ( item ) => item._id  }
                ListFooterComponent = { () => (
                    <>
                        <Button 
                            title='Cerrar sesión' 
                            onPress={logOut}
                            />
                        <Text ></Text>
                    </>
                ) }
                ListHeaderComponent = {() => (
                    <HeaderTitle 
                        title='Productos' noMT button 
                        onPress={ ()=> navigation.navigate('ProductScreen', {})}  
                        text='Agregar' 
                    />)}
            />
            </>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});