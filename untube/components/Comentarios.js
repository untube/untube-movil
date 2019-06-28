import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Alert
} from 'react-native'

export default class Compentarios extends Component{

    constructor(){
        super()

        this.state = {
            comment: ''
        }
    }
    changeComment(comment){
        this.setState({comment})
    }
    buttonPressed(){
        if(this.state.comment){
            Alert.alert(this.state.comment +'')
        }else{
            Alert.alert('Error!')
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.tittle}>Deja tu comentario!</Text>
                    <TextInput 
                    multiline = {true}
                    style = {[styles.input, styles.textArea]}
                    placeholder = "Comentario"
                    value={this.state.comment}
                    onChangeText={(comment) => this.changeComment(comment)}/>
                    <TouchableHighlight 
                    style ={styles.button}
                    onPress = {() => this.buttonPressed()}>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5FCFF',
        marginTop:30,
        paddingLeft: 15,
        paddingRight: 15
    },
    input:{
        height: 40,
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 20
    },
    textArea: {
        height: 60
    },
    tittle: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 5
    },
    button: {
        backgroundColor: 'skyblue',
        paddingTop: 15,
        paddingBottom: 15
    },
    textButton: {
        textAlign: 'center',
        color: 'white'
    }

})