import React, {Component} from 'react'
import {
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    AsyncStorage,
    Switch,
    Alert,
    KeyboardAvoidingView
} from 'react-native'
import { Video } from 'expo'
import List from '../components/List';
import { FontAwesome,} from '@expo/vector-icons';
import Header from '../components/Header';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';
import Comentarios from '../components/Comentarios'

import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, graphql } from 'react-apollo';
import { Mutation } from 'react-apollo'



const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://35.196.3.185/graphql'}),
    cache: new InMemoryCache().restore({}),
  });



const videosQuery = gql`
    query VideoById($idv: Int!){
    videoById(id: $idv){
        id
        category_id
        title
        description
        image
    }
  }
`;

const AllVideos = graphql(videosQuery)(props => {
	const { error, allVideos } = props.data;

	if (error) {
		return <Text>error</Text>;
	}
	if (allVideos) {
		return <List navigation={props.navigation} data={allVideos}/>
	}

	return <Text>Loading..</Text>

});


const recommendQuery = gql`
    query RecommendationsByUser($code: Int!) {
        recommendationsByUser(code: $code){
            id
            title
            description
            category_id
            image
        }
    }
`;


const userMutation =gql`
mutation feedUserDBMutation($id_user: Int!, $id_category: String!){
    feedUserDB(userPreferences:{
        id_user: $id_user
        id_category: $id_category
      })
    }
`

var user_id_r = 1
const RecommendComponent = graphql(recommendQuery,  {
    options: (props) => ({ variables: { code: props.code } })
    })(props => {
    const { error, recommendationsByUser } = props.data;
    // console.log("el props");
    // console.log(props);
    if (error) {
      return <Text>{error}</Text>;
    }
    if (recommendationsByUser) {
    //     var ids = []
    //   for (let index = 0; index < recommendationsByUser.ids.length; index++) {
    //       const element = recommendationsByUser.ids[index];
    //       ids[index] = element
    //   }
      return <List navigation={props.elProps} data={recommendationsByUser}/>;
    }else{
        // <List navigation={props.elProps} data={show_second}/>
        <List data={show_second}/>
    }
    
    return <Text>Loading...</Text>;
  });


  
const comentarios = [
    {
        key:'1',
        comment: 'apesta',
    },

    {
        key: '2',
        comment: 'es lo mejor',
    },

    {
        key: '3',
        comment: 'Jamas voy a curarme del cancer de ojos de esta mierdaaaaa',
    },

    {
        key: '4',
        comment: 'pos guau',
    },

    {
        key: '5',
        comment: 'no es el mejor ni el peor, es todo lo contrario en el sentido opuesto y viceversa, esta mierda apesta como los caños de bogota, esos caños en los que botan hasta los mas infames pecados de la naturarela, si, esos caños, asi de asqueroso es este video',
    },

    {
        key: '6',
        comment: 'es lo mejor X2',
    },

    {
        key: '7',
        comment: 'quiero llorar, pero el video me quemo los lagrimales :0',
    },
]

const show_second = [
    {
        key: '5',
		name: 'Avatar, The last air bender',
		description: 'Es un niño calvo que controla el aire y debe derrotar al señor del fuego.',
    },
    
    {
        key: '6',
		name: 'Serie rusa',
		description: 'Tres muchachos sentados en un sofa con unas letras escritas en el fondo.',
        image: 'https://s.aolcdn.com/hss/storage/midas/4c749caee327ce3be44ea61043927b1f/204142591/StrangerThings_2.jpg'
    },

    {
        key: '7',
		name: 'La casa de papel',
		description: 'Un profesor recluta a varios ladrones, los entrena y los mete en un banco para hacer el robo del siglo.',
        image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/main_element/public/media/image/2019/04/mejores-series-netflix-mad-men-casa-papel-russian-doll.jpg?itok=RMvb9Z3i'
    },

    {
        key: '8',
		name: 'Umbrella academy',
		description: 'La vida bisarra de los super heroes, las cosas no son como son, no todo es super.',
        image: 'https://images-ahn.mdstrm.com/2019/03/15/254105_1_5c8ba6f11a190.jpg?d=800x400'
    },

    {
        key: '9',
		name: "Grey's anatomy",
		description: 'Grupo de doctores que tienen relaciones entre si y salvan muchas vidas mientras intentan solucionar las cosas de su vida.',
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mejores-series-2018-1545999424.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*'
    },
]

const {width, heigth} = Dimensions.get('window')

export default class VideoPlayerView extends Component{
    constructor(props){
		super(props)
		this.state = {
            comment: [],
            isOpen: false,
            isHidden: false,
            user_id: 1
        }

        
    }

	toggle(){
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	updateMenu(isOpen){
		this.setState({isOpen})
	}

    static navigationOptions = {
        header: null,
        mute: false,
    };

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          const ide = await AsyncStorage.getItem('user_id');
        //   console.log("despues de traerlo")
        //   console.log(value)
          if (value !== '') {
            // We have data!!
            console.log('el token  ' + value);
            user_id_r = ide
            this.setState({user_id: ide})
          }else{
            this.setState({user_id: 1})
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    componentWillMount(){
        this.setState({comment: comentarios})
        this._retrieveData()
    }

     
    _renderItem(item){
        return (
            <View style={styles.avatarImage}>
                <FontAwesome
                    name='user-secret'
                    color='black'
                    size={20}
                />
                <Text style = {styles.text}>{item.comment}</Text>
            </View>
        )
    }
    //console.log('testing debug');

    cometar(){
        const elProps = this.props.navigation
        if(!this.state.isHidden){
            return(
                <View style={{flex:2}}>                            
                    <RecommendComponent elProps={elProps} code={1}/>
                 </View>
            )
        }else{
            return(                                
            <View style={styles.coments}>
                <FlatList 
                    // horizontal
                    ItemSeparatorComponent={() => <View style={{height:5,backgroundColor: '#3860D8'}}></View>}
                    renderItem={({item}) =>this._renderItem(item)} 
                    data = {this.state.comment}
                    keyExtractor={(item) => item.key}>
                </FlatList>

            </View>)

        }
    }
    render(){
        const elProps = this.props.navigation
        const {params} = elProps.state
        var uribase = 'http://35.196.3.185:3002/watch/'
        var urivideo = uribase.concat(params.item.id)
        return(
            
            <ApolloProvider client={client}>
                <SideMenu
					menu={<Menu navigation={this.props.navigation} toggle={this.toggle.bind(this)}/>}
					isOpen={this.state.isOpen}
					onChange={(isOpen) => this.updateMenu(isOpen)}
					>
							<Header navigation={this.props.navigation} toggle={this.toggle.bind(this)}/>

                        	<View style={styles.container}>
                                <View style={{alignItems: 'stretch',height:300, backgroundColor:'black'}}>
                                    <Mutation mutation={userMutation} variables={{id_user: this.state.user_id,
                                                                                  id_category: params.item.category_id}}>
                                        {(feedUserDBMutation) => 
                                            <Video                   
                                            source={{uri: urivideo}}
                                            useNativeControls={true}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode={Video.RESIZE_MODE_CONTAIN}
                                            shouldPlay={true}
                                            style={{width:width, height: 300}}
                                            isPortrait={false}
                                            positionMillis={0}
                                            playbackInstancePosition={0}
                                            playbackInstanceDuration={0}
                                            tittle={params.item.title}

                                            onLoad={() => {
                                                console.log("Mutation user")
                                                feedUserDBMutation({
                                                variables: {
                                                    id_user: this.state.user_id, 
                                                    id_category: params.item.category_id
                                                }
                                                
                                                })
                                                .then(res => {
                                                //     Alert.alert(
                                                //     'Alert Title',
                                                //     'mutation user!!!',
                                                //     [
                                                //       {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                //     ],
                                                //     {cancelable: false},
                                                //   );
                                                  //aqui se guarda el token en el local storage
                                                  console.log(res)
                                                })
                                                .catch(err => {
                                                //     Alert.alert(
                                                //     'Alert Title',
                                                //     'Hubo un error!!!',
                                                //     [
                                                //       {text: 'OK', onPress: () => console.log(err)},
                                                //     ],
                                                //     {cancelable: false},
                                                //   );
                                                })
                                            }}
                                        /> }
                            


                                    </Mutation>
                                    

                                </View>

                                {this.cometar()}    

                                <View style={styles.inputcoment}>
                                    <KeyboardAvoidingView  behavior="padding" enabled>
                                        <Comentarios/>
                                    </KeyboardAvoidingView>
                                </View>
                                <View style={styles.switch}>
                                    <Text>Ver comentarios</Text>
                                    <Switch onValueChange={value => this.setState({ isHidden: value })}
                                            value={this.state.isHidden}/>  
                                </View>                                    
                                                       
                            </View>
				</SideMenu>
                
            </ApolloProvider> 

                
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B9CDA',
        
        flexDirection: 'column'
        // justifyContent: 'center',
    },
    avatarImage: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: 'white',
        borderLeftWidth: 3,
        borderColor: '#3860D8',
        paddingLeft: 10,
        minHeight: 30,

    },
    text: {
        color: 'black',
        fontSize: 15,    
        paddingLeft: 15,
    },
    coments: {
        flex: 2,
        backgroundColor: '#ffffff',
        paddingLeft: 30,
        paddingRight: 20
    },
    inputcoment: {
        flex: 2,
        backgroundColor: '#ffffff',
        marginBottom: 10
    },
    switch: {
        marginTop: 20,
        marginBottom: 5,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    }
    
})