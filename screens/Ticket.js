import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Modal,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    refresh:false,
    modalVisible : false,
    ratingTicketId : null,
    ratingTicketRate: null,
    rateStarColors :{
        c1:"#2E304F",
        c2:"#2E304F",
        c3:"#2E304F",
        c4:"#2E304F",
        c5:"#2E304F",
    },
    rateEntity: {
        id: null,
        rating: null
    }
    }

    async componentDidMount() {
        await this.getTickets();

    }

    getTickets = async () => {
        var ticketData = await Http.getDataFromAPI("/tickets/driver-tickets").then(res=> res)
        .catch(err => console.log("Ticket Çekerken Hata =>",err));
            this.setState({
                ...this.state,
                ticketDatas:ticketData,
            });
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

    ratingClick =(data) => {
        this.setState({
            ...this.state,
            modalVisible:true,
            ratingTicketId:data,
          });
          
    }
    
    ratingStar = (rate) => {
        var redColor = "#ff0000";
        var defaultColor = "#2E304F";
        if(rate===1){
            this.setState({
                ...this.state,
                rateStarColors:{
                    c1:redColor,
                    c2:defaultColor,
                    c3:defaultColor,
                    c4:defaultColor,
                    c5:defaultColor,
                },
                ratingTicketRate : rate,
              });
        }else if (rate===2){
            this.setState({
                ...this.state,
                rateStarColors:{
                    c1:redColor,
                    c2:redColor,
                    c3:defaultColor,
                    c4:defaultColor,
                    c5:defaultColor,
                },
                ratingTicketRate : rate,
              });

        }else if (rate===3){
            this.setState({
                ...this.state,
                rateStarColors:{
                    c1:redColor,
                    c2:redColor,
                    c3:redColor,
                    c4:defaultColor,
                    c5:defaultColor,
                },
                ratingTicketRate : rate,
              });

        }else if (rate===4){
            this.setState({
                ...this.state,
                rateStarColors:{
                    c1:redColor,
                    c2:redColor,
                    c3:redColor,
                    c4:redColor,
                    c5:defaultColor,
                },
                ratingTicketRate : rate,
              });

        }else if (rate===5) {
            this.setState({
                ...this.state,
                rateStarColors:{
                    c1:redColor,
                    c2:redColor,
                    c3:redColor,
                    c4:redColor,
                    c5:redColor,
                },
                ratingTicketRate : rate,
              });
        }
    }

    callback = () =>{
        let rateEntity = {
            id : this.state.ratingTicketId,
            rating : this.state.ratingTicketRate
        }
        console.log(rateEntity);
        Http.RatingTicket(rateEntity).then(res => {
            if(res===200){
                console.log("BİZ PUAN VERDİK =>",res);
            }
         })
    }

    rateTicket = () => {
        this.setState({
            ...this.state,
            rateEntity:{
                id : this.state.ratingTicketId,
                rating: this.state.ratingTicketRate,
            }
            },this.callback());
    

        this.getTickets();
        this.closeModal();

    }

    closeModal = () =>{
        this.setState({
            ...this.state,
            modalVisible:false,
          });
    }
    render(){ 
        return (
        <View style={styles.container}>

        <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose ={() => this.closeModal()}
         >
        <View style={styles.modalView}>
            <View style={styles.modalContent}>
                <View style={styles.closeModalView}>
                    <View>
                    <Icon name="close" size={30} color="#2E304F"  onPress ={() => this.closeModal()}/>
                    </View>
                </View>
                <View style={styles.heartsRating}>
                <TouchableOpacity
                style={styles.touchableRate}
                onPress={() => this.ratingStar(1)}
                activeOpacity={.8}
                >
                <Icon name="heart" size={30} color={this.state.rateStarColors.c1} />
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.touchableRate}
                onPress={() =>this.ratingStar(2)}
                activeOpacity={.8}
                >
                <Icon name="heart" size={30} color={this.state.rateStarColors.c2} />
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.touchableRate}
                onPress={() =>this.ratingStar(3)}
                activeOpacity={.8}
                >
                <Icon name="heart" size={30} color={this.state.rateStarColors.c3} />
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.touchableRate}
                onPress={() =>this.ratingStar(4)}
                activeOpacity={.8}
                >
                <Icon name="heart" size={30} color={this.state.rateStarColors.c4} />
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.touchableRate}
                onPress={() =>this.ratingStar(5)}
                activeOpacity={.8}
                >
                <Icon name="heart" size={30} color={this.state.rateStarColors.c5} />
                </TouchableOpacity>
                </View>
                <View style={styles.modalRatingButton}>
                    <Button mode="contained" color='#142850' labelStyle={styles.buttonRateText} style={styles.buttonRate} 
                    onPress={() => this.rateTicket()} >
                    Tamam 
                    </Button>
                </View>
            </View>
        </View>
       </Modal>
        

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
                        <View>
                        <Image source={require('../assests/ticket.png')} style={styles.ticketPhotoIMG}/>
                        </View>
                    </View>
                    <View style={styles.ticketRating}>
                    {ticket.rating === null && ticket.exitedAt !== null ? (
                    <View>
                        <Button icon="star" mode="contained" color='#142850' labelStyle={styles.buttonRateText} style={styles.buttonRate} 
                        onPress={() => this.ratingClick(ticket.id)} 
                        >
                        Puan Ver 
                        </Button>
                    </View>)
                    : ticket.rating === 1 ? (
                        <View>
                        <Icon name="heart" size={30} color="#2E304F" /> 
                        </View>)
                    : ticket.rating ===2 ?(
                        <View style={styles.hearts}> 
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                        </View>)
                        : ticket.rating ===3 ?(
                        <View style={styles.hearts}> 
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                        </View>)
                        : ticket.rating ===4 ?(
                            <View style={styles.hearts}> 
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            </View>)
                        : ticket.rating === 5 ? (
                            <View style={styles.hearts}> 
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            <Icon name="heart" size={30} color="#2E304F" />
                            </View>)
                        : null }
                    </View>
                </View>)}
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
    ticketCostText:{
        fontSize:23,
        fontWeight:"bold",
        color:'#260026',
    },
    ticketBodyLeftText:{
        fontSize:15,
        color:'#260026',
    },
    hearts:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonRate:{
        backgroundColor:'#800080',
    },
    buttonRateText:{
        color:'#fff',
        fontSize:18,
    },
    ticketRating:{
        alignItems:"center",
        paddingBottom:3,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalView:{
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent:{
        width:280,
        height:180,
        borderRadius:10,
        backgroundColor:'#fff',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
    },
    heartsRating:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:20,
    },
    modalRatingButton:{
        marginTop:20,
    },
    closeModalView:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ticketPhotoIMG:{
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        marginRight:20,
        opacity: 0.8,
    },
    touchableRate:{
        margin:2,
    }
  });