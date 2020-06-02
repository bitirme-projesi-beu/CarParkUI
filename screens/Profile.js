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
  
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../components/context'
import { IconButton,Button } from 'react-native-paper';
const ProfileScreen = ({navigation}) => {


    const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
                <StatusBar 
            backgroundColor= '#2E304F'
            barStyle='light-content'
        />
        <Text style={{fontSize:50}}> BEN </Text>
        <Text style={{fontSize:50, color:'#FF6633'}}> PROFİL</Text>
        <Text style={{fontSize:50}}> EKRANIYIM</Text>
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
    }
  });