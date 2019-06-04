import React, {Component} from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons';


const {width, height} = Dimensions.get('window')

export default class Menu extends Component {
    render () {
        return (
            <View style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarImage}>
                        {/* <Image  style={styles.welcomeImage} source={require('../assets/images/foto.png')}/> */}
                        <FontAwesome
                            name='user-secret'
                            color='white'
                            size={50}
                        />
                        <Text style = {styles.text}>User Name</Text>
                    </View>
                    <FontAwesome
                        name='exchange'
                        color='white'
                        size={25}
                    />
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            
                            <FontAwesome 
                            style={styles.iconWithText}
                            name='search'
                            color='white'
                            size={28}
                            />
                            
                            <Text style = {styles.text}>Search Video</Text>
                        </View>
                        <FontAwesome
                                style={styles.rifhtIcon}
                                name='angle-right'
                                color='white'
                                size={25}
                            />
                        
                    </View>

                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            <Feather
                                style={styles.iconWithText}
                                name='upload'
                                color='white'
                                size={25}
                            />
                            <Text style = {styles.text}>UpLoad Video</Text>
                        </View>
                        <FontAwesome
                            style={styles.rightIcon}
                            name='angle-right'
                            color='white'
                            size={25}
                        />
                        
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        flex:1,
        width: width,
        height: height,
        backgroundColor: '#3860D8',
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width / 2 + 50,
        borderColor: 'white',
        borderBottomWidth: 3,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    avatarImage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 15,    
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderColor: 'white',
        borderBottomWidth: 3
    },
    withIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContainer: {
        width: width / 2 + 59
    },
    rightIcon: {
        paddingRight: 1
    },
    iconWithText: {
        marginRight: 10,
        paddingLeft: 20
    },
    
})