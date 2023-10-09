import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ArrowIcon from '../../../assets/assets/arrow_back_ios.svg';
import VerifiedIcon from '../../../assets/assets/verifiedIcon.svg';
import MessageIcon from '../../../assets/assets/message-question.svg';
import CalenderIcon from '../../../assets/assets/calendarprofile.svg';
import MoneyIcon from '../../../assets/assets/moneys.svg';
import NotifyIcon from '../../../assets/assets/notification-status.svg';
import ReviewsIcon from '../../../assets/assets/profilestar.svg';
import Logout from '../../../assets/assets/logout.svg';
import { Avatar, Divider } from 'react-native-paper';
import MyStatusBar from '../../../components/Statusbar';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstName, setId, setLastName } from '../../Redux/Reducer/CreateAccount/DoctorAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DoctorProfile = () => {
    const navigation = useNavigation()
    const doctordetails = useSelector(state => state.doctorAccount)
    console.log(doctordetails)
    const urlImage = `https://customdemowebsites.com/dbapi/${doctordetails.DoctorImage}`
    const phone = useSelector((State) => State.phone)
    const dispatch = useDispatch()
    console.log(doctordetails)
    const handlePress = async ()=>{
      try {
        // Replace 'userData' with the key you use to store user data in AsyncStorage
        await AsyncStorage.removeItem('id');
        console.log('AsyncStorage cleared on logout');
      } catch (error) {
        console.error('Error clearing AsyncStorage on logout:', error);
      }
      dispatch(setFirstName(''))
      dispatch(setId(''))
      dispatch(setLastName(''))
      navigation.reset({ index: 0, routes: [{ name: 'Intro' }] })
    }
  return (
    <View style={styles.container}>
        <MyStatusBar backgroundColor="transparent"/>
        <View style={styles.my2}>
      <Text style={styles.h1}>Profile</Text>
      </View>
      <View style={styles.profileDetail}>
      <View style={styles.sectionDone}>
      <Avatar.Image source={urlImage ? {uri:urlImage} : ''}/>
            <View >
                <View style={{flexDirection:"row", gap: 2, alignItems:"center"}} >
                    <Text style={styles.textwhitelg}>{doctordetails.firstName} {doctordetails.lastName} </Text>
                    <VerifiedIcon style={{alignSelf:"center", marginTop:5}}/>
                    </View>
                <Text style={styles.textsm}>{phone}</Text>
                <View style={{flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 3}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                fontFamily: 'Raleway-SemiBold',
              }}>
              {doctordetails.profession_type}
            </Text>
            <View style={styles.dotCircle} />
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                fontFamily: 'Raleway-SemiBold',
              }}>
              {doctordetails.experience}
            </Text>
          </View>
            </View>
            
        </View>
      </View>
      <View style={{backgroundColor:"#fff", flex: 1}}>
        <View style={styles.my2}>
        <Text style={{color:"#66708", fontFamily:"Raleway-SemiBold", fontSize: 14}}>General</Text>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate("TotalVisits")} style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <NotifyIcon/>
            <View>
            <Text style={styles.cardTitle}>My Visits</Text>
            </View>
            </View>
            <ArrowIcon/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Availibility")} style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <CalenderIcon/>
            <View>
            <Text style={styles.cardTitle}>My Availibility</Text>
            </View>
            </View>
            <ArrowIcon/>
        </TouchableOpacity>
        <View style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <MoneyIcon/>
            <View>
            <Text style={styles.cardTitle}>My Earning</Text>
            </View>
            </View>
            <ArrowIcon/>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate("MyReviews")} style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <ReviewsIcon/>
            <View>
            <Text style={styles.cardTitle}>My Reviews</Text>
            </View>
            </View>
            <ArrowIcon/>
        </TouchableOpacity>
        <View style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <MessageIcon/>
            <View>
            <Text style={styles.cardTitle}>Support</Text>
            </View>
            </View>
            <ArrowIcon/>
        </View>
        <TouchableOpacity onPress={handlePress} style={styles.Logout}>
            <Logout/>
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: responsiveScreenHeight(5),
    flex: 1
  },
  my2:{

    marginVertical: 10
  },
  h1:{

    color:"#172331",
    fontSize:23,
    fontFamily:"Raleway-Bold"
  },
  textsm:{

    color: "#fff",
    fontFamily:"Raleway-SemiBold",
    fontSize : 16
  },
  textwhitelg:{

    color:"#fff",
    fontSize:20,
    fontFamily:"Raleway-Bold"
  },
  profileDetail:{

   backgroundColor:"#4464D9",
   borderRadius: 12,
padding: 10  },
sectionDone:{

    flexDirection:"row",
    gap: 20,
   },
  cardContainer:{

    borderBottomColor:"#E7E7E7", borderWidth: 1, borderColor:"transparent", paddingVertical:15, flexDirection:"row", alignItems:"center", gap: 15, justifyContent:"space-between"
  },
  cardTitle:{

    fontFamily: "Raleway-Bold",
    fontSize: 14,
    color: "#172331"
  },
  cardText:{

    color:"#66708F",
    fontFamily:"Raleway-Medium",
    fontSize: 12
  },
  button: {
    backgroundColor: "#4464D9",
    width: "100%",
    height: 48,
    color: "#fff",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    fontFamily: "PlusJakartaSans-ExtraBold",
  },
  Logout:{
 alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    paddingVertical:15,
    gap: 10
  },
  logoutText:{
    color:"#BE2831",
    fontFamily:"Raleway-Bold",
    fontSize: 14
  },
  dotCircle:{
    width: 4,
    height: 4,
    backgroundColor: "#fff",
    borderRadius:4
  }
});

export default DoctorProfile;