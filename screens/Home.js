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
  Platform,
  Dimensions
} from 'react-native';
import { IconButton,Button } from 'react-native-paper';
import { TextInput, TouchableOpacity, State, PinchGestureHandler } from 'react-native-gesture-handler';
import MapView, { 
PROVIDER_GOOGLE, 
Marker, 
Polygon,
Callout 
} from 'react-native-maps'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';
import {request, PERMISSIONS} from 'react-native-permissions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class HomeScreen extends Component{
    state={
        clickToShowCarousel :"none",
        kordinatlar : [
            { id:'1', name : 'Güzel Yer',rate:2.3,maxCapacity:30,activeCapacity:5 ,latitude : 41.130951, longitude : 28.997386},
            { id:'2', name : 'Leş Yer', rate:3.3,maxCapacity:18,activeCapacity:16 ,latitude : 41.117155, longitude : 29.004221},
            { id:'3', name : 'Mükemmel Yer', rate:1.3,maxCapacity:25,activeCapacity:13 ,latitude : 41.118957, longitude : 28.983095},
            { id:'4', name : 'Hoş Yer', rate:5,maxCapacity:10,activeCapacity:8 ,latitude : 41.124841, longitude : 29.013136},



        ]
    }

    componentDidMount(){
        this.requestLocationPermission();
    }

    requestLocationPermission = async () => {
        if(Platform.OS === 'ios') {
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            if(response ==='granted'){
                this.locateCurrentPosition();
            }
        }else{
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            console.log('RESPONSE',response);

            if(response ==='granted'){
                this.locateCurrentPosition();
            }
        }
        if(response==='blocked')
        {
            let region ={
                latitude:41.130951,
                longitude:28.994386,
                latitudeDelta: 0.0822,
                longitudeDelta: 0.0321,
            }

        }
        
    }

    locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(position => {
            let region ={
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
                latitudeDelta: 0.0822,
                longitudeDelta: 0.0321,
            }

        })
    }

    OnMarkerPressed =(location,index=0) => {
        this._map.animateToRegion({
            latitude:location.latitude,
            longitude:location.longitude,
            latitudeDelta: 0.0822,
            longitudeDelta: 0.0321,
        });
        this._carousel.snapToItem(index);
        console.log(index);
        this.setState({
            ...this.state,
            clickToShowCarousel: "flex"
          });
    }
    changeCarouselDisplay = (index) => {

    }
    renderCarouselItem = ({item}) => 
    <View style={this.carouselCard()}>
         <View style={styles.carouselRowHeader}>
        <Text style={styles.carouselHeaderText}>Otopark Adı : {item.name}</Text>
        </View>
        <View style={styles.carouselRow}>
            <Text style={styles.carouselRowText}>Puanı = </Text>
            <Text style={styles.carouselActiveCapacityText}>{item.rate}</Text>
            <Text style={styles.carouselRowTextSlash}> / </Text>
            <Text style={styles.carouselMaxCapacityText}>5</Text>
        </View>
        <View style={styles.carouselRow}>
            <Text style={styles.carouselRowText}>Otopark Durumu = </Text>
            <Text style={styles.carouselActiveCapacityText}>{item.activeCapacity}</Text>
            <Text style={styles.carouselRowTextSlash}> / </Text>
            <Text style={styles.carouselMaxCapacityText}>{item.maxCapacity}</Text>
        </View>
        <View style={styles.carouselRowHeader}>
        <Button icon="alpha-p-box-outline" mode="contained" color='#FF6633' labelStyle={styles.buttonReserveText} style={styles.buttonReserve} >
        Rezerve Et
        </Button>
        </View>

    </View>

    onCarouselItemSelect = (index) =>{
        let location =this.state.kordinatlar[index];

        this._map.animateToRegion({
            latitude:location.latitude,
            longitude:location.longitude,
            latitudeDelta: 0.0822,
            longitudeDelta: 0.0321,
        })
    }
    carouselCard =function(options) {
        return {
            display:this.state.clickToShowCarousel,
            backgroundColor:'rgba(46,48,79,0.9)',
            alignItems:'center',
            height:200,
            width:300,
            padding:10,
            borderRadius:20
        }
      }
    render(){
                return (
        <View style={styles.container}>
     <MapView
     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
     showsUserLocation={true}
     ref={map => this._map = map}
     style={styles.map}
     region={{
       latitude: 41.117155,
       longitude: 29.004221,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }}>
    {
        this.state.kordinatlar.map((marker,index) => 
            <Marker 
            key={marker.id}
            onPress={() => this.OnMarkerPressed(marker,index)}
            coordinate={{
               latitude: marker.latitude,
               longitude: marker.longitude,
            }}
            image={require('../assests/marker.png')}
           />
    )
    }

   </MapView> 
   <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.kordinatlar}
              renderItem={this.renderCarouselItem}
              sliderWidth={windowWidth}
              itemWidth={300}
              containerCustomStyle={styles.carousel}
              onSnapToItem={x => this.onCarouselItemSelect(x)}
              removeClippedSubviews={true}
            />
   </View>
        )
    }
}

  export default HomeScreen;

  const styles = StyleSheet.create({ 
      map: {
        flex: 1,
        width: windowWidth ,
        height: windowHeight ,
    },
    container: {
        flex: 1,
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
    },
    carousel:{
        position:"absolute",
        bottom:0,
        marginBottom:40,
    },
    carouselHeaderText:{
        color:'#fff',
        fontSize:20,
    },
    carouselRow:{
        marginTop:-20,
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',    
    },
    carouselRowHeader:{
        marginTop:0,
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',    
    },
    carouselRowText:{
        color:'#fff',
        fontSize:18,
        
    },
    carouselRowTextSlash:{
        color:'#fff',
        fontSize:18,
    },
    carouselActiveCapacityText:{
        color:'#fff',
        fontSize:18,
    },
    carouselMaxCapacityText:{
        color:'#fff',
        fontSize:18,
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
        fontSize:18,
        fontWeight:"normal",
    },
    buttonReserve:{
      paddingLeft:20,
      paddingRight:20,
      borderWidth:1
    },
    carouselRowButton:{
        marginTop:20,
        
    },
    buttonReserveText:{
      fontSize:19,
      fontWeight:"normal",
      color:'#fff'
    }
  });