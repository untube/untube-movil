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

const commentariesMutation =gql`
    mutation createCommentMutation($subject: String!, $description: String!, $idUser: Int!, $idVideo: String!){
    createComment(comment:{
        subject: $subject
        description: $description
        idUser: $idUser
        idVideo: $idVideo
      }) {
        id
        idUser
        idVideo
        description
        likes
        subject
        likes
      }
  }
  `


export default class Compentarios extends Component{

    constructor(props){
        super(props)
        this.state = {
            subject: 'Comentario',
            description: '',
            id_user: 1,
            id_video: 'id_ficti_1'
        }
        
    }

    changeComment(description){
        this.setState({description})
    }
    buttonPressed(){
        if(this.state.description){
            Alert.alert(this.state.description +'')
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
                        value={this.state.description}
                        onChangeText={(description) => this.changeComment(description)}/>

                    </View>

                    <Mutation mutation={commentariesMutation} variables={{ subject: this.state.subject,
                                                                           description: this.state.description,
                                                                           idUser: this.setState.id_user,
                                                                           idVideo: this.setState.id_video}}>
                            {(createCommentMutation) => 
                            <TouchableHighlight style ={styles.button} onPress={() => {
                                console.log("Comentario")
                                createCommentMutation({
                                variables: {
                                    subject: this.state.subject,
                                        description: this.state.description,
                                        idUser: this.setState.id_user,
                                        idVideo: this.setState.id_video,
                                }
                                
                                })
                                .then(res => {
                                    console.log(res)
                                    Alert.alert(
                                    'Alert Title',
                                    'Gracias por comentar!!!',
                                    [
                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ],
                                    {cancelable: false},
                                  );
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
                                  
                                })
                                this.setState({ subject: '', description: '', id_user: 1, id_video: ''});
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