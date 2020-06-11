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
