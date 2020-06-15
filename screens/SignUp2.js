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
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../components/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const SingUpScreen = ({navigation}) => {
    const {signUp} = React.useContext(AuthContext);
    const {signIn} = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        createdAt:"",
        checkName: 'true',
        checkSurname: 'true',
        checkEmail: 'true',
        checkPassword: 'true',
        permissionSignUp:'false'
    });

    const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
    });  
    
    const NameChangeFunc = (val) => {
        var createdAt = moment().format('YYYY-MM-DDThh:mm:ss.000');
        console.log("VAL = ",val)
        if( val.trim().length > 0 ) {
            setData({
                ...data,
                name: val,
                checkName:true,
                createdAt:createdAt
            });
        }else {
            setData({
                ...data,
                name: val,
                checkName:false
            });
        }
    }

    const SurnameChangeFunc = (val) => {
        if( val.trim().length > 0 ) {
            setData({
                ...data,
                surname: val,
                checkSurname:true
            });
        }else {
            setData({
                ...data,
                surname: val,
                checkSurname:false
            });
        }
    }

    const EmailChangeFunc = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                email: val,
                checkEmail:true
            }),        
            setLoginData({
                ...data,
                email: val,
            });
        }else {
            setData({
                ...data,
                email: val,
                checkEmail:false
            }),
            setLoginData({
                ...data,
                email: val,
            });
        }
    }
    
    const PasswordChangeFunc = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                checkPassword:true
            }),        
            setLoginData({
                ...data,
                password: val,
            });
        }else {
            setData({
                ...data,
                password: val,
                checkPassword:false
            }),
            setLoginData({
                ...data,
                password: val,
            });
        }
        
    }

    async function SignUpFunc()  {
        console.log(data);
        if(data.checkEmail===true && 
           data.checkName ===true && 
           data.checkPassword ===true && 
           data.checkSurname ===true)
        {   

            var result = await signUp(data);
            console.log("bekledik", result);
            if(result === 201){
                signIn(loginData);
            }
        }
        else {
            alert("Formu gözden geçir");
        }   
    }





  return (
    <View style={styles.container}>
                <StatusBar 
            backgroundColor= '#2E304F'
            barStyle='light-content'
        />
        <View style={styles.header}>
        <Animatable.Text style={styles.text_header} animation="lightSpeedIn">Aracına yer ararken artık vakit kaybetmeyeceksin</Animatable.Text>
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <ScrollView style={styles.scrollViewStyle}>
            <View style={styles.action}>
            <Icon name="account-circle" size={30} color="#2E304F" />
            <TextInput 
                style={styles.textInput} 
                placeholder="Ad"
                autoCapitalize="none"
                onChangeText={(val) => NameChangeFunc(val)}

                />
            </View>
            {data.checkName === false ?(
            <View>
                <Text>
                    İsim boş bırakılamaz.
                </Text>
            </View>):
            null}
            <View style={styles.action}>
            <Icon name="account-circle" size={30} color="#2E304F" />
                <TextInput 
                style={styles.textInput} 
                placeholder="Soyad"
                autoCapitalize="none"
                onChangeText={(val) => SurnameChangeFunc(val)}

                />
            </View>
            {data.checkSurname === false ?(
            <View>
                <Text>
                    Soyisim boş bırakılamaz.
                </Text>
            </View>):
            null}
            <View style={styles.action}>
            <Icon name="email" size={30} color="#2E304F" />
                <TextInput 
                style={styles.textInput} 
                placeholder="E-Mail"
                autoCapitalize="none"
                onChangeText={(val) => EmailChangeFunc(val)}
                />
            </View>
            {data.checkEmail === false ?(
            <View>
                <Text>
                    Lütfen geçerli bir E-Mail giriniz.
                </Text>
            </View>):
            null}
            <View style={styles.action}>
            <Icon name="key-variant" size={30} color="#2E304F" />
            <TextInput 
                style={styles.textInput} 
                secureTextEntry
                placeholder="Şifre"
                autoCapitalize="none"
                onChangeText={(val) => PasswordChangeFunc(val)}
                />
            </View>
            {data.checkPassword === false ?(
            <View>
                <Text>
                En az 8 karakter girilebilir.
                </Text>
            </View>):
            null}
            <View style={styles.button}>
            <TouchableOpacity
            style= {styles.touchableButtonSignUp}
            onPress={() => SignUpFunc()}
            >
                <Text style= {styles.touchableButtonSignUpText}>Üye Ol</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style= {styles.touchableButton}
            onPress={() => navigation.navigate("Login")}
            >
                <Text style= {styles.touchableButtonSignIn}>Giriş Yap</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
    </View>
    );
  };

  export default SingUpScreen;

  
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
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 25,
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
        marginTop:-15,
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
        marginTop: 20,
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
    scrollViewStyle: {
        marginTop:-15,
        marginBottom:-10,
    }
  });