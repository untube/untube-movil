import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';




export default class List extends Component {
    constructor(props){
		super(props)
		this.state = {
			data: []
		}
	}
    _renderItem(item){

        const navigation = this.props.navigation
        return (
            // {width: 128, height: 180}
            <TouchableWithoutFeedback onPress={
                () => navigation.navigate('Reproduce', {item: item})}>
                <View style={styles.containerImage}>
                    <Image style={styles.image} source={{uri: item.image}}/>
                    <View style={styles.containerText}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Roboto',}}>{item.name}</Text>
                        <Text numberOfLines={5} ellipsizeMode={'tail'} >{item.description}</Text>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
            
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