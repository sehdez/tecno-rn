import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import { styles, colors } from '../theme/appTheme';

interface Props{
    label       : string;
    placeholder : string;
    value       : string;
    icon?       : string;
    password?   : boolean;
    noAutoCap?  : boolean;
    type?       : 'default' | 'email-address' | 'number-pad'
    onChange    : ( valor: string ) => void;
}

export const Input = ( { 
    label, 
    placeholder, 
    onChange, 
    value,
    icon,
    type= 'default', 
    password = false,
    noAutoCap = false }: Props ) => {

    const [viewPassword, setViewPassword] = useState(false)
    return (
        <View style={{ ...styles.globalMargin }}>
            <Text style={{ ...styles.text, fontWeight:'bold' }} > {label} </Text>
            <View>
                {
                    icon &&
                        (
                            <Text style={{ position: 'absolute', left: 3, top: 12 }}>
                                <Icon name = {icon} size={30} color={ colors.light+'90' } />
                            </Text>
                        )
                }
                    
                
                {
                    ( password )
                        ? (
                            <View>
                                <TextInput 
                                    placeholder={ placeholder }
                                    placeholderTextColor={ colors.light+'60' }
                                    secureTextEntry={ !viewPassword }
                                    textContentType='password'
                                    keyboardType={!viewPassword ? 'default': 'visible-password'}
                                    underlineColorAndroid='white'
                                    selectionColor={ colors.secondary }
                                    autoCorrect={ false }
                                    autoComplete='off'
                                    style={[ 
                                        localStyles.input, 
                                        { paddingRight: 40 },
                                        (icon !== undefined) && localStyles.paddingIcon
                                        
                                    ]}
                                    value={ value }
                                    onChangeText = {  onChange }
                                />
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: 7, top: 7 }}
                                    activeOpacity={ 0.7 }
                                    onPress={ () => setViewPassword( !viewPassword ) }
                                >
                                    <Text >
                                        <Icon 
                                            name = {( viewPassword ) ? 'eye-off-outline' : 'eye-outline'} 
                                            size={30} 
                                            color={ colors.light+'90' } 
                                        />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                        : (
                            <TextInput 
                                placeholder={ placeholder }
                                placeholderTextColor={ colors.light+'60' }
                                keyboardType={ type }
                                underlineColorAndroid='white'
                                selectionColor={ colors.secondary }
                                autoCapitalize = { noAutoCap ? 'none' : 'words' }
                                style={[ localStyles.input, (icon !== undefined) && localStyles.paddingIcon ] }
                                value = { value }
                                onChangeText = { onChange }
                            />
                        )
                }
            </View>
            
        </View>
    )
}

const localStyles = StyleSheet.create({
    input:{ 
        color: colors.light,
        height: 50,
        fontSize:20,
        paddingHorizontal:10,
    },
    paddingIcon: {
        paddingLeft: 40,
    }
});
