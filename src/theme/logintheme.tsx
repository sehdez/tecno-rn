import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './appTheme';



export const loginStyles = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:40
    },
    account: {
        fontSize: 20,
        alignSelf:'flex-end',
        paddingRight: 30,
        marginVertical:10,
        color: colors.white
    },
    loginContainer:{
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 20
    },
    loginButton: {
        backgroundColor: colors.secondary,
        borderRadius: 5,
        height:40,
        minWidth:170,
        marginHorizontal:10,
        justifyContent: 'center',
        alignItems:'center'
    },
    loginText:{
        fontSize:25,
        color: colors.white,
        fontWeight:'bold'
    }
});