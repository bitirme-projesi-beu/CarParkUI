import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton,Button } from 'react-native-paper';
import * as Http from '../utils/HttpHelper';
import moment from 'moment';
import { createStackNavigator } from '@react-navigation/stack';
import { create } from 'react-test-renderer';


class ReservationsScreen extends Component{

    state={
        activeReservation : {
            active: null,
            cost: null,
            createdAt: "0",
            deactivatedAt: null,
            driverId: 0,
            hourlyWage: 0,
            id: 0,
            parkingLotId: 0,
            plate: "",
            parkingLotName: null,
        },
        activeReservations : [{
            active: null,
            cost: null,
            createdAt: null,
            deactivatedAt: null,
            driverId: null,
            hourlyWage: null,
            id: null,
            parkingLotId: null,
            parkingLotName: null,
            plate: null,
            dayTime:null,
            hourTime:null
        }],
        hasActiveReservation: false,
        reservationCancelData:null
    }

    async componentDidMount() {
        await this.getActiveReservation();

        // setInterval(this.getActiveReservation, 5000);
    }

    getActiveReservation = async () => {
        var activeReservationData = await Http.getDataFromAPI("/reservations/drivers-reservations").then(res =>res)
        .catch(err => console.log(err));
        if(activeReservationData!==undefined){
            this.setState({
                ...this.state,
                activeReservations:activeReservationData,
                hasActiveReservation:true
            });
        }       
    }  
 
    rezPriceFormat = (cost) =>{
        var rezCost = Number(cost);
        return rezCost.toFixed(2);
    }

    rezDateFormat = (createdAt) =>{
        var rezCreatedDate = String(createdAt);
        var res = rezCreatedDate.split("T");
        return res[0] + "  /  " + res[1];
    }

    cancelReservation = async (id,parkingLotId) => {
        var createdAt = moment().format('YYYY-MM-DDThh:mm:ss.000');
        this.setState({
            ...this.state,
            reservationCancelData: {
                parkingLotId:parkingLotId,
                createdAt: createdAt,
                id:id,
            }
        }, () => {
        Http.CancelReservation(this.state.reservationCancelData).then(res => {
            if(res===200){
                alert("Rezervasyon Başarıyla İptal Edildi");
                this.getActiveReservation();
            }
        })
        })

    }

    reservationBoxStyle = (isActive) => {
        var backgroundColor;
        if(isActive===true){
            backgroundColor = '#e5b964';
        }else{
            backgroundColor = '#e5cce5';
        }
        return {
            width:'100%',
            padding:5,
            borderColor:backgroundColor,
            borderWidth:1,
            backgroundColor:backgroundColor,
            borderRadius:8,
            marginBottom:10,
        }
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
                    {this.state.activeReservations.map(rez =>        
                        <View style={this.reservationBoxStyle(rez.active)}> 
                            <View style={styles.reservationDetail}>
                                <View style={styles.reservationInfo}>
                                <Text style={styles.carParkNameText}>{rez.parkingLotName}</Text>
                                <Text style={styles.reservationDateText}>{this.rezDateFormat(rez.createdAt)}</Text>
                                </View>
                                <View style={styles.reservationPrice}>
                                    {rez.cost !== null ? (
                                    <Text style={styles.reservationPriceText}>{this.rezPriceFormat(rez.cost)} ₺</Text> 
                                    ):
                                    null
                                }
                                </View>
                                <View style={styles.reservationPhoto}>
                                    <Image source={require('../assests/park.png')} style={styles.reservationPhotoIMG}/>
                                </View>
                            </View>
                            {rez.active === true ? (
                            <View style={styles.activeReservationDeleteView}>
                            <Button icon="close" mode="contained" color='#142850' labelStyle={styles.buttonRateText} style={styles.buttonRate} onPress={() =>{this.cancelReservation(rez.id,rez.parkingLotId)}} >
                            İptal Et
                            </Button>
                            </View>)
                            :
                            null }
                        </View>
                    )}
                </View>
            </ScrollView>
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
    activeReservationBox:{
        width:'100%',
        padding:5,
        borderColor:'#e5b964',
        borderWidth:1,
        backgroundColor:'#e5b964',
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
        marginTop:3
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
    activeReservationDeleteView:{
        alignItems:"center",
    },
  });