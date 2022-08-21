import React, { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import tecnoApi from '../api/tecnoApi';

type ProductsContextProps = {
    products        : Producto[];
    loadProducts    : () => Promise<void>;
    deleteProduct   : ( id: string ) => Promise<void>;
    loadProductById : ( id: string ) => Promise<Producto>;
    allProducts     : ( categoryId: string ) => Promise<void>;
    addProduct      : ( categotyId: string, productName: string ) => Promise<void>;
    updateProduct   : ( categotyId: string, productName: string, productId: string ) => Promise<void>;
    uploadImage     : ( data: any, id: string ) => Promise<void>;
}



export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ( { children }:{ children: JSX.Element | JSX.Element [] } ) => {

    const [products, setProducts] = useState<Producto[]>([]);

    

    const loadProducts = async() => {
        const { data } = await tecnoApi.get<ProductsResponse>('/productos');
        setProducts([...products, ...data.productos ])
    }
    
    const deleteProduct = async ( id: string ) => {

    }
    const loadProductById = async ( id: string ) => {
        throw new Error('Not implemented')

    }
    const allProducts = async ( categoryId: string ) => {

    }
    const addProduct = async ( categotyId: string, productName: string ) => {

    }
    const updateProduct = async ( categotyId: string, productName: string, productId: string ) => {

    }
    const uploadImage = async ( data: any, id: string ) => {

    }

    useEffect(() => {
        loadProducts();
    }, [] )
    
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
