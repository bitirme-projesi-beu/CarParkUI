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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TicketScreen = ({navigation}) => {
      return (
    <View>
        <Text>
            TİCKET EKRANI 
        </Text>
    </View>
  );
  };

  export default TicketScreen;


  //NOTES
  /*
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
                    } */