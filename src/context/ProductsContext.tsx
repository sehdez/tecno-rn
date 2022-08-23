import React, { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import tecnoApi from '../api/tecnoApi';
import { ImagePickerResponse } from "react-native-image-picker";

type ProductsContextProps = {
    products        : Producto[];
    loadProducts    : () => Promise<void>;
    deleteProduct   : ( id: string ) => Promise<void>;
    loadProductById : ( id: string ) => Promise<Producto>;
    allProducts     : ( categoryId: string ) => Promise<void>;
    addProduct      : ( categotyId: string, productName: string ) => Promise<Producto>;
    updateProduct   : ( categotyId: string, productName: string, productId: string ) => Promise<void>;
    uploadImage     : ( data: any, id: string ) => Promise<void>;
}



export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ( { children }:{ children: JSX.Element | JSX.Element [] } ) => {

    const [products, setProducts] = useState<Producto[]>([]);

    

    const loadProducts = async() => {
        const { data } = await tecnoApi.get<ProductsResponse>('/productos?limite=1000');
        setProducts(data.productos)
    }
    
    const deleteProduct = async ( id: string ) => {

    }
    const loadProductById = async ( id: string ):Promise<Producto> => {
        const { data } = await tecnoApi.get<Producto>('/productos/'+id)
        return data

    }
    const allProducts = async ( categoryId: string ) => {

    }
    const addProduct = async ( categotyId: string, productName: string ): Promise<Producto> => {
        try{
            const { data } = await tecnoApi.post<Producto>('/productos', {
                nombre: productName,
                categoria: categotyId
            })
            setProducts([...products, data]);
            return data
        }catch(err){
            throw new Error('err')
        }
    }
    const updateProduct = async ( categotyId: string, productName: string, productId: string ) => {
        try{
            const { data } = await tecnoApi.put<Producto>('/productos/'+productId, {
                nombre: productName,
                categoria: categotyId
            })
            setProducts(products.map( ( p ) =>{
                return (p._id === productId)
                            ? data
                            : p
                }))
            
        }catch(err){
            console.log(err)
        }
    }
    const uploadImage = async ( {assets}: ImagePickerResponse, id: string ) => {
        if( !assets ) return 

        const fileToUpload = {
            uri: assets[0].uri,
            type: assets[0].type,
            name: assets[0].fileName
        }
        const formData = new FormData();
        formData.append('archivo', fileToUpload);
        try {
            const resp = await tecnoApi.put(`/uploads/productos/${ id }`, formData)
            return resp.data
        } catch (error) {
            console.log({error})
        }
    }

    useEffect(() => {
        loadProducts();
    }, [products] )
    
    return (
        <ProductsContext.Provider value = {{
            products,
            loadProducts,
            deleteProduct,
            loadProductById,
            allProducts,
            addProduct,
            updateProduct,
            uploadImage

        }}>
            {children}
        </ProductsContext.Provider>
    )
    
}
