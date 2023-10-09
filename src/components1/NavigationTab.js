import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { Image } from 'react-native-svg';
import HomeIcon from '../assets/assets/home.svg'
import CalendarIcon from '../assets/assets/calendar.svg'
import CalendarNotACtiveIcon from '../assets/assets/calenderna.svg'
import NotificationIcon from '../assets/assets/notification.svg'
import UserImg from '../assets/assets/userimg.svg'
import NotActiveHome from '../assets/assets/homna.svg'
import NotificationActive from '../assets/assets/notiactive.svg'
import HomeNavigation from './Navigation/Client/HomeScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import MyProfile from '../screens/MyProfile';
import Schedule from '../screens/Appointment/Appointment';
import Notification from '../screens/Notification/Notification';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const Tab = createBottomTabNavigator();


const  CustomTabNavigator = ()=> {
  const navigation = useNavigation();
  return (
    <Tab.Navigator 
       screenOptions={({route})=>({
        headerShown: false,
        tabBar: true,
        tabBarActiveTintColor:"tomato",
        tabBarInactiveTintColor:"gray",
        tabBarStyle: [
          {
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            height: responsiveScreenHeight(8),
            alignItems:"center",
            flex:1,
            borderTopColor:"#EBF0FF",
            borderTopWidth: 1
            // borderTopColor: route.name === "Home" ? "#000" : "#fff",
            // borderTopWidth: route.name === "Home"? 2: 0
          },
        ],
        
      })}>
      <Tab.Screen name="Home" component={HomePage} options={{
        tabBarLabel: ({ focused }) => (
          <View >
            <Text style={{ color: focused ? '#4464D9' : '#66708F', fontFamily:"Raleway-SemiBold", fontSize: 12,
            marginBottom: 10 }}>Home</Text>
            </View>
          ),
        tabBarIcon:({focused})=>(
            <View >
              <View style={ focused?styles.lineTransition : null}/>
                {focused ? <HomeIcon width={24}/> : <NotActiveHome/>  }
            </View>
        ),
      }} ></Tab.Screen>
      <Tab.Screen name="Appointment" component={Schedule} options={{
        tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#4464D9' : '#66708F', fontFamily:"Raleway-SemiBold", fontSize: 12,
            marginBottom: 10 }}>Appointments</Text>
          ),
        tabBarIcon:({focused})=>(
            <View>
              <View style={ focused?styles.lineTransition : null}/>
                {!focused ? <CalendarIcon width={24}/> : <CalendarNotACtiveIcon/> }
            </View>
        )
      }}/>
    <Tab.Screen name="Notification" component={Notification} options={{
        tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#4464D9' : '#66708F', fontFamily:"Raleway-SemiBold", fontSize: 12,
            marginBottom: 10 }}>Notification</Text>
          ),
        tabBarIcon:({focused})=>(
            <View>
              <View style={ focused?styles.lineTransition : null}/>
                {focused ? <NotificationActive />: <NotificationIcon width={24}/>}
            </View>
        )
      }} />
    <Tab.Screen name="Profile" component={MyProfile} options={{
        tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#4464D9' : '#66708F', fontFamily:"Raleway-SemiBold", fontSize: 12,
            marginBottom: 10 }}>More</Text>
          ),
        tabBarIcon:({focused})=>(
            <View>
              <View style={ focused?styles.lineTransition : null}/>
                <UserImg width={24}/>
            </View>
        )
      }}
      
      
      />
    </Tab.Navigator>
  );
}


export default CustomTabNavigator

const styles = StyleSheet.create({
  lineTransition:{
    borderTopColor: "#4464D9", borderTopWidth: 3, position: "absolute", width: "100%", 
    left:responsiveScreenWidth(-10),  top:-12,
  },
    shadow: {
      shadowColor: "#ffe45d",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  });

  