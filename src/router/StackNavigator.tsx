import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RegisterScreen }    from '../screens/RegisterScreen';
import { LoginScreen }       from '../screens/LoginScreen';
import { ProductsNavigator } from './ProductsNavigator';
import { AuthContext }       from '../context/AuthContext';
import { LoadingModal }      from '../components/LoadingModal';

const Stack = createStackNavigator();




export const  StackNavigator = () => {

    

    const { status, errorMessage } = useContext( AuthContext )

    if ( status === 'checking' ){
        return <LoadingModal background />
    }
    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown:false,
                    animationEnabled: false,

                    cardStyle: {
                        backgroundColor:'#000'
                    }
                }}
            >
                {
                    status === 'authenticated'
                        ? <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
                        : (
                            <>
                                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                            </>
                          )
                }
                
            </Stack.Navigator>
    );
}