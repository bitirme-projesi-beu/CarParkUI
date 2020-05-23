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
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../components/context'


const SignInScreen = ({navigation}) => {


    const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
        <View style={styles.header}> 
            <Text style={styles.text_header}>Park Uygulamasına Hoş Geldin</Text>
        </View>
        <View style={styles.footer}>
            <Text style={styles.text_footer}>E-Mail</Text>
            <View style={styles.action}>
                <TextInput 
                style={styles.textInput} 
                placeholder="E-Mail"
                autoCapitalize="none"
                />
            </View>

            <Text style={[styles.text_footer, {marginTop:20}]}>Şifre</Text>
            <View style={styles.action}>
                <TextInput 
                style={styles.textInput} 
                secureTextEntry
                placeholder="Şifre"
                autoCapitalize="none"
                />
            </View>
            <View style={styles.button}>
            <TouchableOpacity
            style= {styles.touchableButton}
            onPress={() => {signIn()}}>
            <Text style= {styles.touchableButtonText}
            >Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style= {styles.touchableButton}
            onPress={() => navigation.navigate("SignUp")}
            >
                <Text style= {styles.touchableButtonText}>Üye Ol</Text>
            </TouchableOpacity>
            </View>


        </View> 
    </View>
  );
  };

  export default SignInScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopRightRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 30,
        width:'90%',
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
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
        paddingBottom:-5,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        width:'100%',
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
    touchableButton:{
        marginTop:20,
        width:300,
        paddingTop:8,
        paddingBottom:8,
        borderWidth: 1,
        borderColor:'#BABABA',
        borderRadius:8,
        alignItems:"center",
        backgroundColor:'#9999ff',
    },
    touchableButtonText: {
        color:'#fff',
        fontSize:20,
        fontWeight:"bold",
    }
  });