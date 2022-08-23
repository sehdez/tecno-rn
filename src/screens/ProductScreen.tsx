import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Button, Image, ScrollView, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { ProductsContext }     from '../context/ProductsContext';
import { useForm }             from '../hooks/useForm';
import { HeaderTitle }         from '../components/HeaderTitle';
import { LogoBackground }      from '../components/LogoBackground';
import { Input }               from '../components/Input';
import { useCategories }       from '../hooks/useCategories';
import { styles, colors }      from '../theme/appTheme';
import { ProductsStackParams } from '../router/ProductsNavigator';
import { Producto } from '../interfaces/appInterfaces';

interface Props extends StackScreenProps<ProductsStackParams , 'ProductScreen'> {}

export const ProductScreen = ( { navigation, route }: Props ) => {

    const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductsContext)
    const { id = '', name = '' } = route.params;
    const { categories, loading } = useCategories();
    const [loadingImg, setLoadingImg] = useState(false)

    const { nombre, precio, categoriaId, img, _id, form, onChange, setFormValue } = useForm({
        _id: id,
        nombre: name,
        precio: '',
        categoriaId: '',
        img: ''
    })

    const loadProduct = async () => {
        const { categoria, img, precio,  } = await loadProductById(id);

        setFormValue({
            ...form,
            categoriaId: categoria._id,
            precio: precio.toString(),
            img
        })
    }

    useEffect( () => {

        if (id){
            loadProduct();
        }
    },[])

    const saveUpdate = () => {
        if (_id){
            updateProduct(categoriaId, nombre, _id )
                .then(() => {
                    navigation.navigate('ProductsScreen')
                })
                .catch(() =>{
                    Alert.alert( 'Error', 'Hubo un problema al actualizar el producto'
                );
                })
        }else{
            const categoryTemp = categoriaId || categories[0]._id;
            addProduct(categoryTemp, nombre )
            .then(( data ) => {
                onChange(data._id, '_id')
            })
            .catch(() =>{
                Alert.alert( 'Error', 'Hubo un problema al actualizar el producto'
                );
            })
        }
    }

    const takePhoto = async () => {
        await launchCamera({ 
            mediaType: 'photo',
            quality: 0.3,
            cameraType: 'front'
         }, ( resp ) => {
            setLoadingImg(true)
            if( resp.didCancel || !resp.assets ) return setLoadingImg(false);
            uploadImage(resp, _id)
                .then((producto: any) => {
                    onChange( producto.img as string, 'img' )
                    setLoadingImg(false)
                })
        });
    }
    const takePhotoFromGalery = async () => {
        await launchImageLibrary({ 
            mediaType: 'photo',
            quality: 0.3
         }, ( resp ) => {
            setLoadingImg(true)
            if( resp.didCancel || !resp.assets ) return setLoadingImg(false);
            uploadImage(resp, _id)
                .then((producto: any) => {
                    onChange( producto.img as string, 'img' )
                    setLoadingImg(false)
                })
        });
    }


    return (
        <ScrollView>
            <LogoBackground />

            <HeaderTitle title={ nombre || 'Nombre del producto'  } /> 
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
                                selectedValue={categoriaId}
                                onValueChange={(value) => onChange(value, 'categoriaId')}>
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

            <View style={[ styles.globalMargin, { marginTop:20 }]}>
                <Button 
                onPress={saveUpdate}
                    title='Guardar'
                />
                <Text></Text>
                {
                    _id &&
                    (
                        <>
                            <View style={{ flexDirection:'row', justifyContent:'center' }}>
                                <Button
                                    onPress={takePhoto}
                                    title='Camara' />
                                <Text>      </Text>

                                <Button 
                                    title='Galería' 
                                    onPress={takePhotoFromGalery}    
                                />
                            </View>
                        
                            { (img || loadingImg) &&
                                <View style={ localStyles.containerImg }>
                                    {
                                        loadingImg
                                            ? <ActivityIndicator size={50} color='white' />
                                            : <Image style={ localStyles.img } source={{ uri: img  }}/>
                                    }
                                </View>
                            }
                        </>
                    )
                }
                
            </View>

        </ScrollView>
    )
}

const localStyles = StyleSheet.create({
    picker:{
        backgroundColor: colors.secondary+'30',
        color: colors.light,
        borderRadius: 20,
    },
    containerImg:{
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        height:300,
    },
    img: {
        borderRadius:10,
        height: 300,
        width: 300
    }
});