import { StyleSheet } from "react-native";

export const colors = {
    background: '#000000',
    background2: '#1a1a1a1a',
    primary: '#014ba0',
    secondary : '#1466c3',
    light: '#d9d5d5',
    white: '#ffffff'
}


export const styles = StyleSheet.create({
    globalMargin:{
        marginHorizontal: 10,

    },
    title: {
        color: colors.white,
        marginVertical: 5,
        fontSize: 35,
        fontWeight: "bold"
    },
    text:{
        color: colors.light,
        marginVertical: 5,
        fontSize: 20,
    },
    centerContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: 'center'
    },
});

