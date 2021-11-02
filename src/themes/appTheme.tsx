import { StyleSheet } from "react-native";

export const Colores = {
    primary: '#5856D6',
    secondary: '#686865'
}

export const styles = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 30,
        marginBottom: 10
    },
    btnBig:{
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnBigText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    avatar: {
        width: 150,
        height: 150, 
        borderRadius: 100
    },
    menuContainer:{
        marginVertical: 30,
        marginHorizontal: 50,
        
    },
    btnMenu:{
        marginVertical: 10
    },
    menuText:{
        fontSize: 20
    },
    userText:{
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Cochin'
    }
});