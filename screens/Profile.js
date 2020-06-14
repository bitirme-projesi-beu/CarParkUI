import React, { useState, useEffect } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../components/context'
import { IconButton,Button,Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Http from '../utils/HttpHelper';


const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [data, setData] = useState({ hits: [] });
  const [userNameSurname, setNameSurname] = useState(null);

  useEffect(() => {
    async function getProfileData() {
      Http.getDataFromAPI("/users/my-profile").then(res =>{
      setData(res)
      setLetter(res);
      })
      .catch(err => console.log(err));
    }
    getProfileData(); 
  }, [])

  const setLetter = (res) => {
    console.log("LETTER ", res);
    var nameFirstLetter = res.name[0];
    var surnameFirstLetter = res.surname[0];
    var FirstLetters = nameFirstLetter + surnameFirstLetter
    FirstLetters = String(FirstLetters).toUpperCase();
    setNameSurname(FirstLetters);
    }
  return (
    <View style={styles.container}>
        <StatusBar 
          backgroundColor= '#827397'
          barStyle='light-content'
        />
        <View style={styles.avatar}>
        <Avatar.Text size={100} label={userNameSurname} style={styles.avatarIcon} />
        </View>
        <Text style={styles.nameSurname}> {data.name} {data.surname} </Text>

        <View style={styles.emailInfo}>
          <Text style={styles.emailInfoText}>E-mail : </Text>
          <Text style={styles.emailInfoText}>{data.email}</Text>
        </View>
        <View style={styles.butonExitView}>
        <Button icon="door" mode="outlined" color='#FF6633' labelStyle={styles.butonExitText} style={styles.butonExit} onPress={() =>{signOut()}} >
        Çıkış Yap
        </Button>
        </View>
    </View>
  );
  };

  export default ProfileScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      paddingTop:30,
    },
    touchableExitButton:{
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
    butonExitView:{
        marginBottom:10,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        alignItems:'center',
    },
    exitButtonText:{
        color:'#fff',
        fontSize:20,
        fontWeight:"normal",
    },
    butonExit:{
      paddingLeft:20,
      paddingRight:20,
      borderWidth:2
    },
    butonExitText:{
      fontSize:20,
      fontWeight:"bold",
    },
    avatar:{
      alignItems:"center",
    },
    avatarIcon:{
      backgroundColor:"#2E304F",
    },
    nameSurname:{
      marginTop:10,
      textAlign:"center",
      fontSize:30,
    },
    emailInfo:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop:40,
    },
    emailInfoText: {
      fontSize:17,
      marginLeft:5,
    }
  });