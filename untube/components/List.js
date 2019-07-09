import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableWithoutFeedback
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

const userMutation =gql`
mutation feedUserDBMutation($id_user: String!, $id_category: String!){
    feedUserDB(userPreferences:{
        id_user: $id_user
        id_category: $id_category
      })
    }
`

const videoMutation =gql`
mutation feedVideoDBMutation($id_video: String!, $id_category: String!){
    feedVideoDB(videosStatistics:{
        id_video: $id_video
        id_category: $id_category
        calification: 1
      })
    }
`


export default class List extends Component {
    constructor(props){
		super(props)
		this.state = {
			data: []
		}
    }
    
    //var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
//<Image style={{width: 100, height: 50, resizeMode: Image.resizeMode.contain, borderWidth: 1, borderColor: 'red'}} source={{uri: base64Icon}}/>
    _renderItem(item){

        const navigation = this.props.navigation
        var uribase = 'data:image/png;base64,'

        var uri64 = uribase.concat(item.image)
        return (
            // {width: 128, height: 180}
            <ApolloProvider client={client}>
                <Mutation mutation={[userMutation, videoMutation]} variables={{ id_user: 1,
                                                                id_category: 1,
                                                                id_video: "5d2261cfa9b574000683b378", 
                                                                id_category: 1}}>
                    <TouchableWithoutFeedback onPress={() => {
                        console.log("iniciando el mutation 1")
                        feedUserDBMutation({
                        variables: {
                            id_user: 1,
                            id_category: 1
                        }
                        
                        })
                        .then(() =>
                        feedVideoDBMutation({
                            variables:{
                                id_video: "5d2261cfa9b574000683b378", 
                                id_category: 1
                            }
                        })

                        ).then(() => navigation.navigate('Reproduce', {item: item})
                        )
                        .catch(err => {
                            
                        })
                        
                        //Aqui se hace el navigate a el home
                    }}>
                        <View style={styles.containerImage}>
                            <Image style={styles.image} source={{uri: uri64}}/>
                            <View style={styles.containerText}>
                                <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Roboto',}}>{item.title}</Text>
                                <Text numberOfLines={5} ellipsizeMode={'tail'} >{item.description}</Text>
                                <Text>Categoria: {item.category_id}</Text>
                                
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Mutation>
            </ApolloProvider>
            
            
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <FlatList 
                            // horizontal
                            ItemSeparatorComponent={() => <View style={{height:5, backgroundColor: 'white'}}></View>}
                            renderItem={({item}) =>this._renderItem(item)} 
                            data = {this.props.data}
                            keyExtractor={(item) => item.key}>
                    </FlatList>
                </View>
                
			</View>
        );
    }
}


const styles = StyleSheet.create({
    text: {
        color: 'white',
    },

    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    containerImage: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'row'
    },

    containerText: {
        flex:1, 
        backgroundColor:'#4B9CDA',
        justifyContent: 'space-around',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 15,
        fontFamily: 'notoserif',
    },

    image: {
        flex:1.5, 
        height: 120, 
        paddingBottom: 5, 
        borderBottomWidth:5,
        
    },

  });