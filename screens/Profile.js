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
const ProfileScreen = ({navigation}) => {


    const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
                <StatusBar 
            backgroundColor= '#2E304F'
            barStyle='light-content'
        />
        <Text> BEN ProfileScreen HOŞGELDİN GARDAŞ</Text>
        <Text> BEN ProfileScreen HOŞGELDİN GARDAŞ</Text>
        <Text> BEN ProfileScreen HOŞGELDİN GARDAŞ</Text>
        <View style={styles.butonExitView}>
        <TouchableOpacity
            style= {styles.touchableExitButton}
            onPress={() => {signOut()}}>
            <Text style={styles.exitButtonText}>Çıkış Yap</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
  };

  export default ProfileScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      
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
        alignItems:'center'
    },
    exitButtonText:{

        color:'#fff',
        fontSize:20,
        fontWeight:"normal",
    },
  });