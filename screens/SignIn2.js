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
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../components/context'
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';


const SignInScreen = ({navigation}) => {


    const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
        <StatusBar 
            backgroundColor= '#2E304F'
            barStyle='light-content'
        />
        <View style={styles.header}> 
            <Animatable.Text style={styles.text_header} animation="lightSpeedIn">Giriş yap ve müsait otoparkları keşfet.</Animatable.Text>
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <View style={[styles.action , {marginTop:20}]}>
                <TextInput 
                mode='outlined'
                style={styles.textInput} 
                placeholder="E-Mail"
                autoCapitalize="none"
                />
            </View>
            <View style={[styles.action, {marginTop:20}]}>
                <TextInput 
                style={styles.textInput} 
                mode='outlined'
                secureTextEntry
                placeholder="Şifre"
                autoCapitalize="none"
                />
            </View>
            <View style={styles.button}>
            <TouchableOpacity
            style= {styles.touchableButton}
            onPress={() => {signIn()}}>
            <Text style= {styles.touchableButtonSignIn}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style= {styles.touchableButtonSignUp}
            onPress={() => navigation.navigate("SignUp")}
            >
                <Text style= {styles.touchableButtonSignUpText}>Üye Ol</Text>
            </TouchableOpacity>
            </View>


        </Animatable.View> 
    </View>
  );
  };

  export default SignInScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#2E304F'
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
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
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
        marginTop: 30,
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
        marginTop:10,
        width:300,
        paddingTop:8,
        paddingBottom:8,
        borderWidth: 2,
        borderColor:'#3399FF',
        borderRadius:8,
        alignItems:"center",
        backgroundColor:'#3399FF',
    },
    touchableButtonSignUp:{
        marginTop:10,
        width:300,
        paddingTop:8,
        paddingBottom:8,
        borderWidth: 2,
        borderColor:'#FF6633',
        borderRadius:8,
        alignItems:"center",
        backgroundColor:'#FF6633',
    },
    touchableButtonSignIn: {
        color:'#fff',
        fontSize:20,
        fontWeight:"normal",
    },    
    touchableButtonSignUpText: {
        color:'#fff',
        fontSize:20,
        fontWeight:"normal",
    },
  });