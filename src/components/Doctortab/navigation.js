import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/HomePage';
import { View, StyleSheet , Text} from 'react-native';
import React, { useEffect } from 'react';
import { Image } from 'react-native-svg';
import HomeIcon from '../../assets/assets/home.svg'
import CalendarIcon from '../../assets/assets/calendar.svg'
import CalendarNotACtiveIcon from '../../assets/assets/calenderna.svg'
import NotificationIcon from '../../assets/assets/notification.svg'
import UserImg from '../../assets/assets/userimg.svg'
import NotActiveHome from '../../assets/assets/homna.svg'
import VisitIcon from '../../assets/assets/visits.svg'
import VisitnotActive from '../../assets/assets/visitactive.svg'
import CalendernotActive from '../../assets/assets/calendaricon.svg'
import { useNavigation, useRoute } from '@react-navigation/native';
import MyProfile from '../../screens/MyProfile';
import Schedule from '../../screens/Appointment/Appointment';
import Notification from '../../screens/Notification/Notification';
import { useSelector } from 'react-redux';
import Availibility from '../../screens/Doctor/Availibility';
import TotalVisits from '../../screens/Doctor/Visits';
import DoctorHomePage from '../../screens/Doctor/HomePage';
import DoctorProfile from '../../screens/Doctor/Profile';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Avatar } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const  DoctorTabNavigator = ()=> {
  const doctordetails = useSelector(state => state.doctorAccount)
  console.log(doctordetails)
  const urlImage = `https://customdemowebsites.com/dbapi/${doctordetails.DoctorImage}`
  const navigation = useNavigation();
  return (
    <Tab.Navigator
       screenOptions={{
        headerShown: false,
        tabBar: false,
        tabBarStyle: [
          {
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            height: 70,
            paddingBottom: 10,
            alignItems:"center",
            flex:1,
            gap: 0,
            borderTopColor:"#EBF0FF",
              borderTopWidth: 1,
              marginBottom: 8
          },          
        ],
        tabBarIndicator: [{ borderTopWidth: 2, borderTopColor: 'transparent' }],
      }}>
      <Tab.Screen name="DoctorHome" component={DoctorHomePage} options={{
        tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#4464D9' : '#66708F', fontFamily:"Raleway-SemiBold", fontSize: 12,
            }}>Home</Text>
          ),
        tabBarIcon:({focused})=>(
            <View style={{ marginTop: 0, paddingTop:0 }}>
              <View style={ focused?styles.lineTransition : null}/>
                {focused ? <HomeIcon /> : <NotActiveHome/>  }
            </View>
        ),
      }} ></Tab.Screen>
      <Tab.Screen name="Availibility" component={Availibility} options={{
        tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#4464D9' : '#66708F', fontFamily:"Raleway-SemiBold", fontSize: 12,
            }}>Availibility</Text>
          ),
        tabBarIcon:({focused})=>(
            <View>
              <View style={ focused?styles.lineTransition : null}/>
                {!focused ? <CalendarIcon width={24}/> : <CalendernotActive/> }
            </View>
        )
      }}/>
    <Tab.Screen name="TotalVisits" component={TotalVisits} options={{
        tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#4464D9' : '#66708F', fontFamily:"Raleway-SemiBold", fontSize: 12,
          }}>Visits</Text>
          ),
        tabBarIcon:({focused})=>(
            <View>
              <View style={ focused?styles.lineTransition : null}/>
                {focused ? <VisitIcon width={24}/> : <VisitnotActive/> }
            </View>
        )
      }} />
    <Tab.Screen name="DoctorProfile" component={DoctorProfile} options={{
        tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#4464D9' : '#66708F', fontFamily:"Raleway-SemiBold", fontSize: 12,
             }}>More</Text>
          ),
        tabBarIcon:({focused})=>(
            <View>
              <View style={ focused?styles.lineTransition : null}/>
              <Avatar.Image size={24} source={urlImage ? {uri:urlImage} : ""}/>
            </View>
        )
      }}
      
      
      />
    </Tab.Navigator>
  );
}


export default DoctorTabNavigator

const styles = StyleSheet.create({
  lineTransition:{
    borderTopColor: "#4464D9", borderTopWidth: 3, position: "absolute", width: "100%", 
    left:responsiveScreenWidth(-10),  top:-15,
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