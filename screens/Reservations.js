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
import { Rating, AirbnbRating } from 'react-native-elements';



class ReservationsScreen extends Component{

    state={
        reservations : [
            {
                id:1,
                carParkName:"Dünyam Otopark",
                carParkArea:"Beşiktaş",
                reservationPrice:"20",
                reservationRate:null,
            },           
            {
                id:1,
                carParkName:"Kardeşler Otopark",
                carParkArea:"Beyoğlu",
                reservationPrice:"42",
                reservationRate:3,
            },            
            {
                id:1,
                carParkName:"Sokak Otopark",
                carParkArea:"Kadıköy",
                reservationPrice:"10",
                reservationRate:4,
            },            
            {
                id:1,
                carParkName:"Sokak Otopark",
                carParkArea:"Kadıköy",
                reservationPrice:"10",
                reservationRate:5,
            },            
            {
                id:1,
                carParkName:"Sokak Otopark",
                carParkArea:"Kadıköy",
                reservationPrice:"10",
                reservationRate:1,
            },            
            {
                id:1,
                carParkName:"Sokak Otopark",
                carParkArea:"Kadıköy",
                reservationPrice:"10",
                reservationRate:null,
            }
        ]
    }




    render(){
        return (
        <View style={styles.container}>
            <StatusBar 
                backgroundColor= '#330033'
                barStyle='light-content'
            />
            <ScrollView>
            <View style={styles.content}>

                {this.state.reservations.map(rez =>
                    
                <View style={styles.reservationBox}>
                    <View style={styles.reservationDetail}>
                        <View style={styles.reservationInfo}>
                        <Text style={styles.carParkNameText}>{rez.carParkName}</Text>
                        <Text style={styles.carParkLocationText}>{rez.carParkArea}</Text>
                        <Text style={styles.reservationDateText}>07/07/2020</Text>
                        </View>
                        <View style={styles.reservationPrice}>
                            <Text style={styles.reservationPriceText}>{rez.reservationPrice} ₺</Text>
                        </View>
                        <View style={styles.reservationPhoto}>
                            <Image source={require('../assests/park.png')} style={styles.reservationPhotoIMG}/>
                        </View>
                    </View>
                    {rez.reservationRate === null ?(
                    <View style={styles.reservationRate}>
                    <Button icon="star" mode="contained" color='#142850' labelStyle={styles.buttonRateText} style={styles.buttonRate} onPress={() =>{alert("Puan Vermeden Geçme Bro")}} >
                    Puan Ver
                    </Button>
                    </View> )
                    :
                    <View style={styles.reservationRate}>
                        <View style={styles.ratingThanks}> 
                        {rez.reservationRate === 1 ?(
                            <View style={styles.hearts}> 
                            <Icon name="heart" size={30} color="#2E304F" />
                            </View>)
                        : rez.reservationRate ===2 ?(
                        <View style={styles.hearts}> 
                        <Icon name="heart" size={30} color="#2E304F" />
                        <Icon name="heart" size={30} color="#2E304F" />
                        </View>)
                        : rez.reservationRate ===3 ?(
                        <View style={styles.hearts}> 
                        <Icon name="heart" size={30} color="#2E304F" />
                        <Icon name="heart" size={30} color="#2E304F" />
                        <Icon name="heart" size={30} color="#2E304F" />
                        </View>)
                        : rez.reservationRate ===4 ?(
                            <View style={styles.hearts}> 
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            </View>)
                        :
                        <View style={styles.hearts}> 
                        <Icon name="heart" size={30} color="#2E304F" />
                        <Icon name="heart" size={30} color="#2E304F" />
                        <Icon name="heart" size={30} color="#2E304F" />
                        <Icon name="heart" size={30} color="#2E304F" />
                        <Icon name="heart" size={30} color="#2E304F" />
                        </View>
                         }
                        </View>
                    </View>
                    }
                </View>
                    
                    
                    
                    
                    
                    )}




            </View></ScrollView>
        </View>
        )}


}



  export default ReservationsScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#f2f2f2'
    },
    content:{
        paddingTop:15,
        paddingLeft:10,
        paddingRight:10,
    },
    reservationBox:{
        width:'100%',
        padding:5,
        borderColor:'#e5cce5',
        borderWidth:1,
        backgroundColor:'#e5cce5',
        borderRadius:8,
        marginBottom:10,
    },
    reservationDetail:{
        height:70,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reservationInfo:{
        justifyContent: 'center',
        marginLeft:10,
    },
    reservationPrice:{
        justifyContent: 'center',
    },
    reservationPhoto:{
        justifyContent: 'center',

    },
    reservationRate:{
        marginTop:8,
    },
    reservationPhotoIMG:{
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        marginRight:20,
        opacity: 0.6,
    },
    buttonRateText:{
        color:'#fff',
        fontSize:18,
    },
    buttonRate:{
        backgroundColor:'#800080',
    },
    carParkNameText:{
        fontSize:19,
        color:'#260026',
        fontWeight:"bold",
    },
    carParkLocationText:{
        marginTop:6,
        fontSize:16,
        color:'#260026',

    },
    reservationDateText:{
        fontSize:16,
        color:'#260026',
        marginTop:-3
    },
    reservationPriceText:{
        fontSize:23,
        fontWeight:"bold",
        color:'#260026',

    },
    ratingThanks:{
        alignItems:"center",
        paddingBottom:3,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ratingThankText:{
        color:'#260026',
        fontSize:20,
        fontWeight:"bold",
    },
    hearts:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

  });