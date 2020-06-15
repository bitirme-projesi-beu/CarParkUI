import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { IconButton,Button } from 'react-native-paper';
import * as Http from '../utils/HttpHelper';
import moment from 'moment';
import { createStackNavigator } from '@react-navigation/stack';
import { create } from 'react-test-renderer';
import { ceil } from 'react-native-reanimated';


class TicketScreen extends Component{

    state={
        ticketDatas : [{
            id: null,
            parkingLotId: null,
            driverId: null,
            plate: null,
            createdAt: null,
            exitedAt: null,
            isItInside: true,
            cost: null,
            rating: null
        }],
        tempticketDatas : [{
            id: 1,
            parkingLotName:"Güzel Yer",
            parkingLotId: 2,
            driverId: 3,
            plate: "34GRM74",
            createdAt: "2020-06-14T21:05:06.916Z",
            exitedAt: "2020-06-14T21:05:06.916Z",
            isItInside: false,
            cost: 35,
            rating: null
        },{
            id: 2,
            parkingLotName:"Hoş Yer",
            parkingLotId: 2,
            driverId: 3,
            plate: "20UYA394",
            createdAt: "2020-06-14T21:05:06.916Z",
            exitedAt: "2020-06-14T21:05:06.916Z",
            isItInside: false,
            cost: 23,
            rating: null
        }
    
    ],
    refresh:false,
    }

    async componentDidMount() {
        await this.getTickets();

    }

    getTickets = async () => {
        var ticketData = await Http.getDataFromAPI("/tickets/driver-tickets").then(res=> {console.log("ASIL RESULT =>",res)
        return res})
        .catch(err => console.log("Ticket Çekerken Hata =>",err));
            this.setState({
                ...this.state,
                ticketDatas:ticketData,
            });
        console.log("Ticket Datas => ",this.state.ticketDatas); 
    }

    ticketDateFormat = (createdAt,index) =>{
        var rezCreatedDate = String(createdAt);
        var res = rezCreatedDate.split("T");
        if(index===1){
            var tempDate = String(res[1]);
            tempDate = tempDate.split(".");
            res[1] = tempDate[0];
        }
        return res[index];
    }

    ticketBoxStyle = (isItInside) => {
        var backgroundColor;
        if(isItInside===true){
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

    ticketCostFormat = (cost) =>{
        var rezCost = Number(cost);
        return rezCost.toFixed(2);
    }

    refreshScroll = () =>{
        this.setState({
            ...this.state,
            refresh:true
        })        
        this.getTickets();
        setTimeout(() => {
            this.setState({
                ...this.state,
                refresh:false
            })          
        },500);
    }

    render(){ 
        return (
        <View style={styles.container}>
            <StatusBar 
                backgroundColor= '#330033'
                barStyle='light-content'
            /> 
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={ <RefreshControl refreshing={this.state.refresh} onRefresh={this.refreshScroll} /> }
                >
            <View style={styles.content}>
                {this.state.ticketDatas.map(ticket=>
                <View style={this.ticketBoxStyle(ticket.isItInside)}>
                    <View style={styles.ticketHeader}>
                        <Text style={styles.ticketHeaderText}>{this.ticketDateFormat(ticket.createdAt,0)}</Text>
                    </View>
                    <View style={styles.ticketBody}>
                        <View style={styles.ticketBodyLeft}>
                            <Text style={styles.ticketBodyLeftText}>Mekanın adı buraya gelicek</Text>
                            <Text style={styles.ticketBodyLeftText}>{this.ticketDateFormat(ticket.createdAt,1)}</Text>
                        </View>
                        <View>
                            <Text style={styles.ticketCostText}>
                                {this.ticketCostFormat(ticket.cost)}
                            </Text>
                        </View>
                        <View style={styles.ticketBodyRight}>
                        <Icon name="ticket" size={50} color="#2E304F" />
                        </View>
                    </View>
                </View>
                )}
            </View>
            </ScrollView>
        </View>
    )}
}

  export default TicketScreen;

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
    ticketBox:{
        width:'100%',
        padding:5,
        borderColor:'#e5cce5',
        borderWidth:1,
        backgroundColor:'#e5cce5',
        borderRadius:8,
        marginBottom:10,
        height:100,
    },
    ticketHeader:{
        alignItems:"center",
        marginTop:3,
    },
    ticketHeaderText:{
        fontSize:19,
        color:'#260026',
        fontWeight:"bold", 
    },
    ticketBody:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ticketBodyLeft:{
        marginLeft:10,
    },
    ticketBodyRight:{
        marginRight:20,
    },
    ticketCostText:{
        fontSize:23,
        fontWeight:"bold",
        color:'#260026',
    },
    ticketBodyLeftText:{
        fontSize:15,
        color:'#260026',
    },
  });