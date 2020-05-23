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

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Header</Text>
                <Image source={require('../assests/logo.png.png')}
                    style={styles.logo}
                    resizeMode="center"
                />

            </View>
            <View style={styles.footer}>
                <Text>Lets Started</Text>
                <TouchableOpacity
            style= {styles.touchableButton}
            onPress={() => navigation.navigate("Login")}
            >
                <Text style= {styles.touchableButtonText}>Başlayalım</Text>
            </TouchableOpacity>

            </View>

        </View>
    );
};

export default SplashScreen;


const {height} = Dimensions.get("screen");
const height_logo = height * 0.00002;


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
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderTopRightRadius: 1000,

    paddingHorizontal: 75,
    paddingVertical: 75,
    width: '100%',
},
    text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
},
    text_footer: {
    color: '#05375a',
    fontWeight: 'normal',
    fontSize: 50
    ,
},
    action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#A9A9A9',
    paddingBottom: 5,
},
    actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
},
    textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 5,
    color: '#05375a',
    paddingBottom: -5,
},
    errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
    button: {
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
},
    signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
    textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},
    touchableButton: {
    marginTop: 20,
    width: 200,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#ff8d00',
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: '#ff8d00',
},
    touchableButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
}
});