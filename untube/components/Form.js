import React, {Component} from 'react';
import{
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';

import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, graphql } from 'react-apollo';
import { Mutation } from 'react-apollo'



const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://35.196.3.185/graphql'}),
    cache: new InMemoryCache().restore({}),
  });

  
const signupMutation =gql `
mutation createUserMutation($name: String!, $nickname: String!, $email: String!, $password: String!, 
    $password_confirmation: String!){
    createUser(user:{
        name: $name,
        nickname: $nickname,
        email: $email,
        password: $password,
        password_confirmation: $password_confirmation
    }){
      token
      type
      client
    }
  }
`

const signinMutation =gql `
mutation createSessionMutation($email: String!, $password: String!){
    createSession(session:{
    email: $email
    password: $password
  }){
    token
    id
    nickname
  }
}
`

export default class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            nickname: '',
            email: '',
            password: '',
            password_confirmation:'',
        }
        
    }
    onChangeText = (key,  val) => {
        this.setState({ [key]: val })
      }

    async saveKey(key_value,value) {
		try {
		  await AsyncStorage.setItem(key_value, value);
		  console.log('save in AsyncStorage '+key_value+' --> '+value)
		} catch (error) {
		  alert("Error saving data" + error);
		}
	} 
    render(){
        if(this.props.login){
            return(
                <ApolloProvider client={client}>
                    <View style = {styles.container}> 
                        <View>
                            <TextInput style = {styles.inputBox} 
                            underlineColorAndroid= 'rgba(0,0,0,0)' 
                            placeholder="Email"
                            onChangeText={(text) => this.onChangeText('email', text)}
                            placeholderTextColor = "#ffffff"/>
            
                            <TextInput style = {styles.inputBox} 
                            underlineColorAndroid= 'rgba(0,0,0,0)' 
                            placeholder="Contraseña"
                            secureTextEntry = {true}
                            onChangeText={(text) => this.onChangeText('password', text)}
                            placeholderTextColor = "#ffffff"/>
                        </View> 
                        
                        <Mutation mutation={signinMutation} variables={{ email: this.state.email,
                                                                       password: this.state.password,}}>
                            {(createSessionMutation) => 
                            <TouchableOpacity style ={styles.button} onPress={() => {
                                console.log("informacion signin")
                                createSessionMutation({
                                variables: {
                                    email: this.state.email,
                                    password: this.state.password,
                                }
                                
                                })
                                .then(res => {
                                    Alert.alert(
                                    'Alert Title',
                                    'Bienvenido!!!',
                                    [
                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ],
                                    {cancelable: false},
                                  );
                                  //aqui se guarda el token en el local storage
                                  console.log(res)
                                  console.log(res["data"]["createSession"]["token"]) 
                                  this.saveKey('token',res["data"]["createSession"]["token"])
                                  this.saveKey('user_id',res["data"]["createSession"]["id"].toString())
                                })
                                .catch(err => {
                                    Alert.alert(
                                    'Alert Title',
                                    'Hubo un error!!!',
                                    [
                                      {text: 'OK', onPress: () => console.log(err)},
                                    ],
                                    {cancelable: false},
                                  );
                                  //aqui se guarda el token en el local storage
                                  console.log(res)
                                })
                                this.setState({ name: '', nickname: '', email: '', password: '', password_confirmation:'' });
                                //Aqui se hace el navigate a el home
                            }}>
                                <Text style = {styles.buttonText} >{this.props.type}</Text>
                            </TouchableOpacity>}

                        </Mutation>

                       
                    </View>
                </ApolloProvider>
                
            )
        }else{
            return(
                <ApolloProvider client={client}>
                    <View style = {styles.container}>  
                        <View style = {styles.formContainer}>
                           <TextInput style = {styles.inputBox} 
                            underlineColorAndroid= 'rgba(0,0,0,0)' 
                            placeholder="Nombre completo"
                            onChangeText={(text) => this.onChangeText('name', text)}
                            placeholderTextColor = "#ffffff"/>

                            <TextInput style = {styles.inputBox} 
                            underlineColorAndroid= 'rgba(0,0,0,0)' 
                            placeholder="Nickname"
                            onChangeText={(text) => this.onChangeText( 'nickname', text)}
                            placeholderTextColor = "#ffffff"/>
                            
                            <TextInput style = {styles.inputBox} 
                            underlineColorAndroid= 'rgba(0,0,0,0)' 
                            placeholder="Email"
                            onChangeText={(text) => this.onChangeText('email', text)}
                            placeholderTextColor = "#ffffff"/>
            
                            <TextInput style = {styles.inputBox} 
                            underlineColorAndroid= 'rgba(0,0,0,0)' 
                            placeholder="Contraseña"
                            onChangeText={(text) => this.onChangeText('password', text)}
                            secureTextEntry = {true}
                            placeholderTextColor = "#ffffff"/>

                            <TextInput style = {styles.inputBox} 
                            underlineColorAndroid= 'rgba(0,0,0,0)' 
                            placeholder="Confirmar Contraseña"
                            onChangeText={(text) => this.onChangeText('password_confirmation', text)}
                            secureTextEntry = {true}
                            placeholderTextColor = "#ffffff"/>                            
                        </View>

                        <Mutation mutation={signupMutation} variables={{ 
                                                    name: this.state.name,
                                                    nickname: this.state.nickname,
                                                    email: this.state.email,
                                                    password: this.state.password,
                                                    password_confirmation: this.state.password_confirmation
                                                }}>
                            {(createUserMutation) => 
                                <TouchableOpacity style ={styles.button} onPress={() => {
                                    if(this.state.password == this.state.password_confirmation){
                                        
                                        createUserMutation({
                                            variables: {
                                                name: this.state.name,
                                                nickname: this.state.nickname,
                                                email: this.state.email,
                                                password: this.state.password,
                                                password_confirmation: this.state.password_confirmation
                                            }
                                            })
                                            .then(res => {
                                                Alert.alert(
                                                'Alert Title',
                                                'usuario creado',
                                                [
                                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                ],
                                                {cancelable: false},
                                            );
                                            return res
                                            }).then(res => {
                                                //aqui se guarda el token en el local storage
                                                console.log(res)
                                            })
                                            .catch(err => <Text>{err}</Text>);
                                            this.setState({ name: '', nickname: '', email: '', password: '', password_confirmation:'' });
                                            //Aqui se hace el navigate a el home
                                    }else{
                                        Alert.alert(
                                            'Alert Title',
                                            'password does not match',
                                            [
                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            {cancelable: false},
                                        );
                                    }
                                    
                                }}>
                                    <Text style = {styles.buttonText} >{this.props.type}</Text>
                                </TouchableOpacity>}
                        </Mutation>
                        
                        
                    </View>

                </ApolloProvider>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox:{
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },

    button: {
        width: 300,
        backgroundColor: '#3860D8',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});