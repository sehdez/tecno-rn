import { useEffect, useState } from "react"
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';
import tecnoApi from '../api/tecnoApi';

export const useCategories = () => {

    const [categories, setCategories] = useState<Categoria[]>([])
    const [loading, setLoading] = useState(true)

    const getCategories = async () => {
        const { data } = await tecnoApi.get<CategoriesResponse>('categorias');

        setCategories(data.categorias);
        setLoading(false)

    }

    useEffect(() => {
        getCategories();
    },[])

    return {
        categories,
        loading
    }
} 