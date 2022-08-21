import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { StackNavigator } from './src/router/StackNavigator'
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';

const AppState = ( {children}: { children: JSX.Element | JSX.Element [] } ) => {
    return(
        <AuthProvider>
            <ProductsProvider>
            { children }
            </ProductsProvider>
        </AuthProvider>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <AppState>
                <StatusBar 
                    translucent={ true }
                    backgroundColor='transparent'
                    barStyle='light-content'
                    
                />
                <StackNavigator />
            </AppState>
        </NavigationContainer>
    )
}

export default App;