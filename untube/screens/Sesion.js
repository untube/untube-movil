import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight, 
    Button
} from 'react-native'


export default class Sesion extends React.Component {

    constructor(props){
        super(props)

    }
    
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.button}>
                    <Button title= 'Iniciar sesión' onPress={() => this.props.navigation.navigate('Login')}/>
                </View>
                <View style = {styles.button}>
       	            <Button title= 'Registrarse' onPress={() => this.props.navigation.navigate('Singup')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginBottom: 30,
        padding: 2
    }
});