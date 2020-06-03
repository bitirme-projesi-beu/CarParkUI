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
            { id:'1', name : 'Güzel Yer',rate:2.3,maxCapacity:30,activeCapacity:5,price:10 ,latitude : 41.130951, longitude : 28.997386},
            { id:'2', name : 'Leş Yer', rate:3.3,maxCapacity:18,activeCapacity:16, price:10,latitude : 41.117155, longitude : 29.004221},
            { id:'3', name : 'Mükemmel Yer', rate:1.3,maxCapacity:25,activeCapacity:13 ,price:10,latitude : 41.118957, longitude : 28.983095},
            { id:'4', name : 'Hoş Yer', rate:5,maxCapacity:10,activeCapacity:8,price:10 ,latitude : 41.124841, longitude : 29.013136},
        ],
        region :{
            latitude : 41.130951, 
            longitude : 28.997386,
            latitudeDelta: 0.018,
            longitudeDelta: 0.019,
        }
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
    }

    locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(position => {
            let region ={
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
                latitudeDelta: 0.018,
                longitudeDelta: 0.019,
            }
        })
    }

    OnMarkerPressed =(location,index=0) => {
        this._map.animateToRegion({
            latitude:location.latitude,
            longitude:location.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.011,
        });
        this._carousel.snapToItem(index);
        console.log(index);
        this.setState({
            ...this.state,
            clickToShowCarousel: "flex"
          });
    }
    changeCarouselDisplay = (index) => {
        this.setState({
            ...this.state,
            clickToShowCarousel: "none"
          });
    }
    renderCarouselItem = ({item}) => 
    <View style={this.carouselCard()}>
        <View style={styles.carouselRowHeader}>
            <Text style={styles.carouselHeaderText}>Otopark Bilgileri</Text>
            <View style={styles.carouselDottedLine}></View>
        </View>

        <View style={styles.carouselRow}>
            <View style={styles.carouselRowElement}><Text style={styles.carouselRowText}>Puan</Text></View>
            <View style={styles.carouselRowElement}>
                <Text style={styles.carouselRowText}>{item.rate}</Text>
                <Text style={styles.carouselRowText}> / </Text>
                <Text style={styles.carouselRowText}>5</Text>
            </View>
        </View>

        <View style={styles.carouselRow}>
            <View style={styles.carouselRowElement}><Text style={styles.carouselRowText}>Kapasite</Text></View>
            <View style={styles.carouselRowElement}>
                <Text style={styles.carouselRowText}>{item.activeCapacity}</Text>
                <Text style={styles.carouselRowText}> / </Text>
                <Text style={styles.carouselRowText}>{item.maxCapacity}</Text>
            </View>
        </View>

        <View style={styles.carouselRow}>
            <View style={styles.carouselRowElement}><Text style={styles.carouselRowText}>Saatlik Ücret</Text></View>
                <View style={styles.carouselRowElement}>
                    <Text style={styles.carouselRowText}>{item.price} ₺</Text>
                </View>
        </View>

        <View style={styles.carouselRowButton}>
            <View style={styles.carouselRowElement}>
                <Button icon="alpha-p-box-outline" mode="contained" color='#FF6633' labelStyle={styles.buttonReserveText} style={styles.buttonReserve} >
                Rezerve Et
                </Button>                
             </View>
        </View>
    </View>

    onCarouselItemSelect = (index) =>{
        let location =this.state.kordinatlar[index];

        this._map.animateToRegion({
            latitude:location.latitude,
            longitude:location.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.011,
        })
    }
    carouselCard =function(options) {
        return {
            display:this.state.clickToShowCarousel,
            backgroundColor:'rgba(46,48,79,0.9)',
            alignItems:'center',
            height:240,
            width:300,
            padding:10,
            borderRadius:20,
            justifiyContent:"flex-start",
            flexDirection: "column"
        }
      }
    render(){
                return (
        <View style={styles.container}>
     <MapView
     provider={PROVIDER_GOOGLE} 
     showsUserLocation={true}
     ref={map => this._map = map}
     style={styles.map}
     onPress={x => this.changeCarouselDisplay(x)}
     initialRegion={this.state.region}>
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
        height:30,
        width:'100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginTop:8,
    },
    carouselRowElement:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    carouselRowText:{
        color:'#fff',
        fontSize:18,
    },
    carouselRowHeader:{
    width:'100%',
    paddingTop:5,
    alignItems:"center",
    },
    carouselDottedLine:{
        marginTop:4,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        borderColor:'rgba(255,255,255,0.5)',
        height:1,
        width:'100%', 
    },
    buttonReserve:{
      paddingLeft:20,
      paddingRight:20,
      borderWidth:1
    },
    carouselRowButton:{
        marginTop:10,
    },
    buttonReserveText:{
      fontSize:19,
      fontWeight:"normal",
      color:'#fff'
    },
  });