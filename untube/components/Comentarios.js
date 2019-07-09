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

import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, graphql } from 'react-apollo';
import { Mutation } from 'react-apollo'

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://35.196.3.185/graphql'}),
    cache: new InMemoryCache().restore({}),
  });

const commentariesMutation =gql `
    mutation createCommentMutation($subject: String!, $description: String!){
    createComment(comment:{
        subject: $subject
        description: $description
        id_user: $id_user
        id_video: $id_video
      }) {
        id
        id_user
        subject
        description
        id_video
        likes
        created_at
        updated_at
      }
  }
  `


export default class Compentarios extends Component{

    constructor(props){
        super(props)
        this.state = {
            subject: '',
            description: '',
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

            <ApolloProvider client={client}>
                <View style={styles.container}>
                    <View>
                        <TextInput 
                        multiline = {true}
                        style = {[styles.input, styles.textArea]}
                        placeholder = "Comentar"
                        value={this.state.comment}
                        onChangeText={(comment) => this.changeComment(comment)}/>

                    </View>

                    <Mutation mutation={commentariesMutation} variables={{ subject: this.state.subject,
                                                                           description: this.state.description,
                                                                           id_user: this.setState.id_user,
                                                                           id_video: this.setState.id_video}}>
                            {(createCommentMutation) => 
                            <TouchableHighlight style ={styles.button} onPress={() => {
                                console.log("Comentario")
                                createCommentMutation({
                                variables: {
                                    subject: this.state.subject,
                                        description: this.state.description,
                                        id_user: this.setState.id_user,
                                        id_video: this.setState.id_video,
                                }
                                
                                })
                                .then(res => {
                                    Alert.alert(
                                    'Alert Title',
                                    'Gracias por comentar!!!',
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
                                this.setState({ subject: '', description: ''});
                                //Aqui se hace el navigate a el home
                            }}>
                                <Text style={styles.textButton}>Enviar</Text>
                            </TouchableHighlight>}

                        </Mutation>

                </View>

            </ApolloProvider>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input:{
        height: 40,
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 20,
        marginTop: 20
    },
    textArea: {
        height: 60,
        width: 300,
        marginTop: 20

    },
    tittle: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 5
    },
    button: {
        width: 300,
        backgroundColor: 'skyblue',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13

    },
    textButton: {
        textAlign: 'center',
        color: 'white'
    }

})