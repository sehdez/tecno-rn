import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { colors } from '../theme/appTheme';

export type ProductsStackParams = {
    ProductsScreen : undefined,
    ProductScreen  : { id?: string, name?: string }
}


const Stack = createStackNavigator<ProductsStackParams>();

export const ProductsNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
            animationEnabled: false,

            cardStyle: {
                backgroundColor: colors.background
            }
        }}>
            <Stack.Screen name='ProductsScreen' component={ ProductsScreen } />
            <Stack.Screen name='ProductScreen' component={ ProductScreen } />
        </Stack.Navigator>
    )
}
