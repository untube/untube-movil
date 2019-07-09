import React from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,KeyboardAvoidingView,
  AsyncStorage
  
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

var uri;
import CameraRollPicker from 'react-native-camera-roll-picker';
import Header from '../components/Header';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';

let category = [{
  value: 'Musica'
}, {
  value: 'Cine'
}, {
  value: 'Vloggs'
},{
  value: 'Video Juegos'
}, {
  value: 'Otros'
}];
let categories = {'Musica':"5d225ff4f95b700001554b17",'Cine':"5d225ff8f95b700001554b18",'Vloggs':"5d225ffcf95b700001554b19",'Video Juegos':'"5d226000f95b700001554b1a"','Otros':'5'}

export default class subir extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
  state = { animating: false }
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
      isOpen: false,
      title: '',
      description:'-',
      category:'Otros',
      user_id: '-1',
    };

    this.getSelectedImages = this.getSelectedImages.bind(this);
    this.verData = this.verData.bind(this);
    this.getKey = this.getKey.bind(this);
  }

  verData(){
    
    if(this.state.description==''){this.setState({description:"-"})}
    if(this.state.num==0){alert("Selecciona un video");return 0;}
    if(this.state.title==''){alert("Ponle un titulo");}
    else{
      console.log('upload/'+this.state.user_id+'/'+categories[this.state.category]+'/'+this.state.title+'/'+this.state.description)
      ur = 'upload/'+this.state.user_id+'/'+categories[this.state.category]+'/'+this.state.title+'/'+this.state.description
      this.sendVideo(ur);
    }
  }
// Funciones para el sidebar
  toggle(){
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	updateMenu(isOpen){
		this.setState({isOpen})
	}
 
  getSelectedImages(images, current) {
    
    var num = images.length;
    this.setState({ 
      num: num,
      selected: images,
    });
    
    console.log(current);
    console.log(this.state.selected);
    console.log("se selecciono un video")
    uri = current.uri;
    console.log(uri);
  
  }
  sendVideo(ur){
    var file = {
      uri: uri,
      type: 'video/mp4',
      name: 'video.mp4',
    };
    let formdata = new FormData();
    
    formdata.append('file', file);
    console.log(file);

   fetch("http://35.196.3.185:3001/"+ur, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata
    }).then(response => {
      console.log("Video uploaded")      
      alert("Video upload");
    }).catch(err => {
      console.log(err)
    })    

  }

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('user_id');
      this.setState({user_id: value});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }
  
  render() {
    this.getKey();
    return (

      <View style={{flex: 1}}>

        <SideMenu
					menu={<Menu navigation={this.props.navigation} toggle={this.toggle.bind(this)}/>}
					isOpen={this.state.isOpen}
					onChange={(isOpen) => this.updateMenu(isOpen)}>

							<Header navigation={this.props.navigation} toggle={this.toggle.bind(this)}/>

              <View style={styles.container}>
                <View style={styles.content}>
                  <Text style={styles.text}>
                    <Text style={styles.bold}> {this.state.num} </Text> Videos has been selected
                  </Text>
                </View>

                <CameraRollPicker
                  groupTypes='All'
                  maximum={1}
                  selected={this.state.selected}
                  assetType='Videos'
                  imagesPerRow={3}
                  imageMargin={5}
                  callback={this.getSelectedImages} />

                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset="60" >
                  <View>
                <TextInput  style = {styles.inputBox}
                underlineColorAndroid= 'rgba(0,0,0,0)' 
                placeholder="*Title"
                placeholderTextColor = "#ffffff"
                onChangeText={(title) => this.setState({title})}
                /> 
                <TextInput  style = {styles.inputBox}
                underlineColorAndroid= 'rgba(0,0,0,0)' 
                placeholder="Description"
                placeholderTextColor = "#ffffff"
                onChangeText={(description) => this.setState({description})}
                /> 
                <Dropdown style = {styles.Dropdown}
                  label='- Category'  
                  data={category}
                  selectedItemColor = '#3A53D0' 
                  onChangeText={(category)=> this.setState({category})}
                />
                
                <Button title="Upload Videos"  onPress={this.verData}/>
                </View>
                </KeyboardAvoidingView>
              </View>

				</SideMenu>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A53D0',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#4B9CDA',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
  
  inputBox:{
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    marginLeft: 10
  },
  Dropdown:{
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 20
  }
});