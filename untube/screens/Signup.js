import React, {Component} from 'react';
import{
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

import Form from '../components/Form';

export default class Signup extends React.Component {
    render(){
        return(
            <View style = {styles.container}>
                <Text>Signup</Text>
                <Form type = "Registrarse" login={false}/>
                <View style = {styles.signupTextCont}>
                    <Text style = {styles.signupText}>¿No tienes una cuenta?</Text>
                    <Text style = {styles.signupButton}>Registrate!</Text>
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