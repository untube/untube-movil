import React, {Component} from 'react'
import {
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native'
import { Video } from 'expo'
import List from '../components/List';
import { FontAwesome,} from '@expo/vector-icons';
import Header from '../components/Header';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';

import gql from 'graphql-tag';
import { AppRegistry } from 'react-native';
import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, graphql } from 'react-apollo';
import { Query } from "react-apollo";


const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://35.196.3.185:5000/graphql'}),
    cache: new InMemoryCache().restore({}),
  });




const videosQuery = gql`
    query{
    videoById(id: "jsjsjsjs"){
      id
      user_id
      category_id
      video_id
      title
      description
      originalname
      views
      filename
      image
    }
  }
`;




// const RecommendComponent = ({ code }) => (
//   <Query query={recommendQuery} variables={{ code: code }}>
//     {({ loading, error, data }) => {
//     //   const { recommendationsByUser } = data;
//       if (loading) return null;
//       if (error) return `Error! ${error}`;

//       if (recommendationsByUser) {
//         return (<View>
//             {/* recommendationsByUser.ids */}
//             <Text>hola}</Text>
//             </View>);
//       };
      
//     //   return (<Text>Loading...</Text>);
//     }}
//   </Query>
// );

const recommendQuery = gql`
    query RecommendationsByUser($code: Int!) {
        recommendationsByUser(code: $code){
            ids
        }
    }
`;

const RecommendComponent = graphql(recommendQuery,  {
    options: (props) => ({ variables: { code: props.code } })
    })(props => {
    const { error, recommendationsByUser } = props.data;
    console.log(props.data);
    if (error) {
      return <Text>{error}</Text>;
    }
    if (recommendationsByUser) {
      return <Text>{recommendationsByUser.ids}</Text>;
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
        image: 'data:image/jpeg;base64,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'
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
            isOpen: false
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


    componentWillMount(){
        this.setState({comment: comentarios})
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


    render(){
        const elProps = this.props.navigation
        const {params} = elProps.state
        return(
            
            <ApolloProvider client={client}>
                <SideMenu
					menu={<Menu navigation={this.props.navigation} toggle={this.toggle.bind(this)}/>}
					isOpen={this.state.isOpen}
					onChange={(isOpen) => this.updateMenu(isOpen)}
					>
							<Header navigation={this.props.navigation} toggle={this.toggle.bind(this)}/>


                        	<View style={styles.container}>
                                <View style={{alignItems: 'stretch',height:300}}>
                                    <Text>{params.item.name}</Text>
                                    <Video
                                        source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
                                        // source={{uri: 'http://34.73.94.91:3002/watch/5cf5718feec09c0001b0f32a'}}
                                        
                                        useNativeControls={true}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        resizeMode={Video.RESIZE_MODE_STRETCH}
                                        shouldPlay={false}
                                        style={{width:width, height: 300}}
                                        isPortrait={true}
                                        // rotation={90}

                                        // tittle={this.props.title}
                                        // onBack={() => null}
                                    /> 
                                </View>
                                

                                <View style={{flex:2}}>
                                    
                                    {/* <List navigation={elProps} data={show_second}/> */}
                                    <RecommendComponent code={0}/>
                                </View>

                                <View style={styles.container}>
                                    <FlatList 
                                            // horizontal
                                            ItemSeparatorComponent={() => <View style={{height:5, backgroundColor: '#3860D8'}}></View>}
                                            renderItem={({item}) =>this._renderItem(item)} 
                                            data = {this.state.comment}
                                            keyExtractor={(item) => item.key}>
                                    </FlatList>
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
    
})