import React, {Component} from 'react'
import {StackNavigation, createStackNavigator} from 'react-navigation'
import HomeScreen from './screens/HomeScreen';
import Search from './components/Search';
import VideoPlayerView from './components/VideoPlayerView';
import subir from './screens/subir';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Sesion from './screens/Sesion';
import Comentarios from './components/Comentarios';

const IndexApp = createStackNavigator({
    Home: {screen: HomeScreen},
    Sesion: {screen: Sesion},
    Search: {screen: Search},
    Reproduce: {screen: VideoPlayerView},
    Upload: {screen: subir},
    Login: {screen: Login},
    Singup: {screen: Signup}.screen,
    Comentar: {screen: Comentarios}

},{
    headerMode: 'screen'
})

export default IndexApp