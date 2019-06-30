import React, {Component} from 'react';
import{
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

import Form from '../components/Form';

export default class Login extends React.Component {
    
    render(){
        return(
            <View style = {styles.container}>
                <Text>Login</Text>
                <Form type = "Iniciar Sesión" login={true}/>
                <View style = {styles.signupTextCont}>
                    <Text style = {styles.signupText}>¿Ya tienes una cuenta?</Text>
                    <Text style = {styles.signupButton}>Inicia Sesión</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'   
    },
    signupText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16
    },
    signupButton: {
        color :'#ffffff',
        fontSize: 16,
        fontWeight: '500'
    }
});