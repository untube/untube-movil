import React, {Component} from 'react'
import {StackNavigation, createStackNavigator} from 'react-navigation'
import HomeScreen from './screens/HomeScreen';
import Search from './components/Search';
import VideoPlayerView from './components/VideoPlayerView';
import subir from './screens/subir';
import Login from './screens/Login';
import Signup from './screens/Signup'

const IndexApp = createStackNavigator({
    Home: {screen: HomeScreen},
    Search: {screen: Search},
    Reproduce: {screen: VideoPlayerView},
    Upload: {screen: subir},
    Login: {screen: Login},
    Singup: {screen: Signup}

},{
    headerMode: 'screen'
})

export default IndexApp