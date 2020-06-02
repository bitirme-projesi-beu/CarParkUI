import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton,Button } from 'react-native-paper';


class ReservationsScreen extends Component{

    render(){
        return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.reservationBox}>
                    <View style={styles.reservationDetail}>
                        <View style={styles.reservationInfo}>
                        <Text>Mükemmel Otopark</Text>
                        <Text>Beşiktaş</Text>
                        </View>

                        <View style={styles.reservationPrice}>
                            <Text>25 ₺</Text>
                        </View>

                        <View style={styles.reservationPhoto}>
                            <Image source={require('../assests/park.png')} style={styles.reservationPhotoIMG}/>
                        </View>
                    </View>


                    <View style={styles.reservationRate}>
                    <Button icon="star" mode="contained" color='#FF6633' labelStyle={styles.buttonRateText} style={styles.buttonRate} >
                    Puan Ver
                    </Button>    
                    </View>
                </View>


            </View>
        </View>
        )}


}



  export default ReservationsScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FFF'
    },
    content:{
        paddingTop:15,
        paddingLeft:10,
        paddingRight:10,
    },
    reservationBox:{
        width:'100%',
        borderWidth:1,
        borderColor:'red',
        padding:3,
    },
    reservationDetail:{
        height:70,
        borderWidth:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reservationInfo:{
        justifyContent: 'center',
        marginLeft:20,
    },
    reservationPrice:{
        justifyContent: 'center',
    },
    reservationPhoto:{
        justifyContent: 'center',

    },
    reservationPhotoIMG:{
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        marginRight:20,
    },
    buttonRateText:{
        color:'#fff',
        fontSize:18,
    },
    buttonRate:{

    }
  });