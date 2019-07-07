import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions, 
    Button
} from 'react-native'
import { MaterialIcons, Octicons } from '@expo/vector-icons';

const {width, heght} = Dimensions.get('window')

const Header = props => (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.toggle()}>
            <Octicons
            name="three-bars"
            size={35}
            color="white"
            style={styles.icon}
            />
        </TouchableWithoutFeedback>
    </View>
)

const styles =StyleSheet.create( {
    container: {
        width: width,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#3A53D0',
        paddingTop: 10,
    },
    icon: {
        marginHorizontal: 15,
        marginTop:5,
    }
})

export default Header