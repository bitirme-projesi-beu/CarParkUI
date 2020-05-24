/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Dimensions,
    Image
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar 
            backgroundColor='#ff8d00'
            barStyle='light-content'
            />
            <View style={styles.header}>
                <Animatable.Image source={require('../assests/logo.png.png')}
                animation="fadeInDown"
                    style={styles.logo}
                    resizeMode="center"
                />

            </View>
            <View style={styles.footer}>
            <Animatable.Text style={styles.welcomeText}animation="fadeInLeft" >Aracına yer bulmak  </Animatable.Text>
            <Animatable.Text style={styles.welcomeTextBottomLine}animation="fadeInLeft" >artık çok kolay.  </Animatable.Text>
                <Animatable.View animation="fadeInUpBig"><TouchableOpacity
            style= {styles.touchableButton}
            onPress={() => navigation.navigate("Login")}
            >
                <Text style= {styles.touchableButtonText}>Başlayalım</Text>
            </TouchableOpacity>
            </Animatable.View>
            </View>

        </View>
    );
};

export default SplashScreen;


const {height} = Dimensions.get("screen");
const height_logo = height * 0.00000002;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff8d00'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: '#fff',
    borderTopRightRadius: 1000,
    paddingHorizontal: 7,
    paddingVertical: 7,
    width: '100%',
    },
    textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 5,
    color: '#05375a',
    paddingBottom: -5,
    },
    touchableButton: {
    marginTop:-20,
    marginLeft:20,
    width: 200,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#ff8d00',
    borderRadius: 80,
    alignItems: "center",
    backgroundColor: '#ff8d00',
    },
    touchableButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
    },
welcomeText:{
    fontSize:25,
    color:'#2E304F',
    padding:20
    },
    welcomeTextBottomLine:{
        fontSize:25,
        color:'#2E304F',
        padding:20,
        marginTop:-80,
    }
});