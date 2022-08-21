import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { HeaderTitle } from '../components/HeaderTitle';
import { StackScreenProps } from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';

import { ProductsStackParams } from '../router/ProductsNavigator';
import { LogoBackground } from '../components/LogoBackground';
import { Input } from '../components/Input';
import { useForm } from '../hooks/useForm';
import { useCategories } from '../hooks/useCategories';
import { styles, colors } from '../theme/appTheme';

interface Props extends StackScreenProps<ProductsStackParams , 'ProductScreen'> {}

export const ProductScreen = ( { navigation, route }: Props ) => {

    const { nombre, precio, categoria, onChange } = useForm({
        nombre: '',
        precio: '',
        categoria: ''
    })

    const { id, name } = route.params;
    const { categories, loading } = useCategories();

    useEffect( () => {
        navigation.setOptions
    })

    return (
        <View>
            <LogoBackground />

            { name && <HeaderTitle title={name } /> }
            <Input 
                label='Nombre'
                placeholder='Ejemplo: Moniotor 4k'
                onChange={( value )=> onChange(value, 'nombre')}
                value={ nombre }
            />
            <View style={{ ...styles.globalMargin, borderRadius:15, overflow:'hidden'}}>
                <Text style={{ ...styles.text, fontWeight:'bold' }} > Categoria</Text>
                {
                    loading 
                        ? <ActivityIndicator  size={30} color={colors.secondary} />
                        :(
                            <Picker
                                mode='dialog'
                                dropdownIconColor={'#fff'}
                                style={ localStyles.picker }
                                selectedValue={categoria}
                                onValueChange={(value) =>
                                    onChange(value, 'categoria')
                            }>
                                { categories.map( ( cat) => ( 
                                <Picker.Item 
                                    key={cat._id} 
                                    label={cat.nombre} 
                                    value={cat._id} 
                                />)) 
                                }
                                
                            </Picker>
                        )
                }
                
            </View>
            
            <Input 
                label='Precio'
                placeholder='$500'
                type='number-pad'
                onChange={( value )=> onChange(value, 'precio')}
                value={ precio }
            />

        </View>
    )
}

const localStyles = StyleSheet.create({
    picker:{
        backgroundColor: colors.secondary+'30',
        color: colors.light,
        borderRadius: 20,
    }
});