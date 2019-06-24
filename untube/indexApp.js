import React, {Component} from 'react'
import {StackNavigation, createStackNavigator} from 'react-navigation'
import HomeScreen from './screens/HomeScreen';
import Search from './components/Search';
import VideoPlayerView from './components/VideoPlayerView';
import subir from './screens/subir';

const IndexApp = createStackNavigator({
    Home: {screen: HomeScreen},
    Search: {screen: Search},
    Reproduce: {screen: VideoPlayerView},
    Upload: {screen: subir}
},{
    headerMode: 'screen'
})

export default IndexApp