import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Dimensions,
    FlatList,
    ScrollView,
    Image,
} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';


const {width, height} = Dimensions.get('window')

const show_second = [
    {
        key: '5',
        name: 'Doctor House',
        image: 'https://i.ytimg.com/vi/LoN68DLmF_w/maxresdefault.jpg'
    },
    
    {
        key: '6',
        name: 'Stranger Things',
        image: 'https://s.aolcdn.com/hss/storage/midas/4c749caee327ce3be44ea61043927b1f/204142591/StrangerThings_2.jpg'
    },

    {
        key: '7',
        name: 'La casa de papel',
        image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/main_element/public/media/image/2019/04/mejores-series-netflix-mad-men-casa-papel-russian-doll.jpg?itok=RMvb9Z3i'
    },

    {
        key: '8',
        name: 'Umbrella academy',
        image: 'https://images-ahn.mdstrm.com/2019/03/15/254105_1_5c8ba6f11a190.jpg?d=800x400'
    },

    {
        key: '9',
        name: 'collage',
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mejores-series-2018-1545999424.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*'
    },
]



export default class Search extends Component {
    static navigationOptions = {
        header: null,
      };
    constructor(props){
        super(props)
        this.state = {
            text: '',
            data: ''
        }
    }

    filter(text){
        const newData = show_second.filter(function(item){
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            data: newData,
            text: text
        })
    }

    deleteData(){
        this.setState({text: '', data: ''})
    }

    _renderItem(item){
        return (
            <Image key={item.key} style={styles.image} source={{uri: item.image}}/>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <FontAwesome
                        name='search'
                        color='grey'
                        size = {18}
                        style = {styles.searchIcon}
                    />
                    <TextInput
                        value={this.state.text}
                        onChangeText={(text) => this.filter(text)}
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor='grey'
                        autoFocus={true}>
                    </TextInput> 

                    {this.state.text ?
                        <TouchableWithoutFeedback onPress={() => this.deleteData()}>
                            <FontAwesome 
                            name='times-circle'
                            color='grey'
                            size = {18}
                            style = {styles.iconInputClose}
                        />
                        </TouchableWithoutFeedback>
                        
                    : null}
                    {/* <TouchableWithoutFeedback style={styles.cancelButton}>
                            <View style={styles.containerButton}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </View>
                    </TouchableWithoutFeedback> */}
                </View>
                <ScrollView>
                    <FlatList
                        style={{marginHorizontal: 5}}
                        data={this.state.data}
                        renderItem={({item}) => this._renderItem(item)}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 40,
        backgroundColor: '#3A53D0',
        borderBottomWidth: 1,
        borderColor: '#3A53D0',
        paddingBottom: 5,
        marginTop:20,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    searchIcon:{
      position: 'absolute',
      top: 8,
      left: 15,
      zIndex: 1,
      backgroundColor: 'transparent'  
    },
    iconInputClose: {
        position: 'absolute',
        top: 5,
        right: 45,
        backgroundColor: 'transparent',
        zIndex:1,
        marginTop:5,
    },
    input: {
        width: width - (width / 8),
        height: 30,
        backgroundColor: '#3D74D9',
        marginHorizontal: 10,
        paddingLeft: 30,
        borderRadius: 3,
        marginTop:5,
        color: 'white'
    },
    cancelButton: {
        color: 'white',
    },
    image: {
        marginRight: 5,
        height: 170,
    },
    

})