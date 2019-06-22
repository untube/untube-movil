import React from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  
} from 'react-native';
var uri;
import CameraRollPicker from 'react-native-camera-roll-picker';

import Header from '../components/Header';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';


export default class subir extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = { animating: false }
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
      isOpen: false,
    };

    this.getSelectedImages = this.getSelectedImages.bind(this);
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
  sendVideo(){
    console.log("hola");
    var file = {
      uri: uri,
      type: 'video/mp4',
      name: 'video.mp4',
    };
    let formdata = new FormData();
    
    formdata.append('file', file);
    console.log(file);

   fetch("http://34.73.94.91:3001/subir", {
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
 
  render() {
    return (
      <View style={{flex: 1}}>
        <SideMenu
					menu={<Menu navigation={this.props.navigation} toggle={this.toggle.bind(this)}/>}
					isOpen={this.state.isOpen}
					onChange={(isOpen) => this.updateMenu(isOpen)}
					>
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
                  
                  <Button title="Upload Videos"  onPress={this.sendVideo}/>
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
});