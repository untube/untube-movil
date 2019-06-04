import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions
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
        backgroundColor: 'black',
        marginHorizontal: 15,
        paddingTop: 10,
    },
})

export default Header