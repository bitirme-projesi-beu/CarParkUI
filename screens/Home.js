import React, { Component, useState } from 'react';
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
import MapView, { 
PROVIDER_GOOGLE, 
Marker, 
Polygon,
Callout 
} from 'react-native-maps'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';



const HomeScreen = ({navigation})  => {

    const kordinatlar = [
            { name : '1', latitude : 41.130951, longitude : 28.997386},
            { name : '2', latitude : 41.124841, longitude : 29.013136},
            { name : '3', latitude : 41.118957, longitude : 28.983095},
        ];

  return (
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 41.117155,
         longitude: 29.004221,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
        <Marker
        coordinate={kordinatlar[0]}
        strokeWidth={3} 
        image={require('../assests/marker.png')}
        title="Test"
        description="deneme"
        />


         <Marker 
         coordinate={{
            latitude: 41.117155,
            longitude: 29.004221,
         }}
        image={require('../assests/marker.png')}
        title="Test"
        description="deneme"
        />
     </MapView>
  );
  };

  export default HomeScreen;

  const styles = StyleSheet.create({ 
      map: {
    ...StyleSheet.absoluteFillObject,
  },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 800,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
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