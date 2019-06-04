import React, {Component} from 'react'
import {
    Text, 
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'
import { Video } from 'expo';

const {width, heigth} = Dimensions.get('window')

export default class VideoPlayerView extends Component{
    static navigationOptions = {
        header: null,
      };


    render(){
        return(
            <View style={styles.container}>
                <Video
                    // source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                    source={{uri: 'http://34.73.94.91:3002/watch/5cf5718feec09c0001b0f32a'}}
                    
                    useNativeControls={true}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    style={{width:width, height: 300}}
                    // tittle={this.props.title}
                    // onBack={() => null}
                >

                </Video>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B9CDA',
    },
})