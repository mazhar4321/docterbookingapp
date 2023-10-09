import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ArrowIcon from '../assets/assets/arrow_back_ios.svg'
import SettingImg from '../assets/assets/setting.svg'
import MedicalRecords from '../assets/assets/medicalrecords.svg'
import InsuranceDetails from '../assets/assets/insurancedtails.svg'
import AccountInfo from '../assets/assets/accountinfo.svg'
import Logout from '../assets/assets/logout.svg'
import { Avatar, Divider } from 'react-native-paper';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setFirstName, setId, setLastName } from './Redux/Reducer/CreateAccount/CustomerAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyProfile = () => {
 const navigation = useNavigation()
 const dispatch = useDispatch()
 const user = useSelector(state => state.customerAccount)
//  const {avatar} = user
 const phone = useSelector(state => state.phone)
 const [img, setImg] = useState("")
 const urlImage = `https://customdemowebsites.com/dbapi/${user.avatar}`
 console.log(user)
//  useEffect(()=>{
//   const res = axios.get("https://customdemowebsites.com/dbapi/paUsers/13")
//   console.log(res)
//  },[])
 useEffect(() => {
  async function fetchData() {
      try {
        const response = await axios.get("https://customdemowebsites.com/dbapi/paUsers/13")
        console.log(response.data.img)
        setImg(response.data.img)
      } catch (err) {
        console.log(err);
      }
  }

  fetchData();
}, []);

const handlePress = async()=>{
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
  //  navigation.reset
}
  return (
    <View style={styles.container}>
        <View style={styles.my2}>
      <Text style={styles.h1}>Profile</Text>
      </View>
      <View style={styles.profileDetail}>
      <View style={styles.sectionDone}>
            {/* <Avatar.Image source={(require("../assets/assets/avatar.png"))}/> */}
            {/* <Avatar.Image source={(require("../assets/assets/avatar.png"))}/> */}
            <Avatar.Image source={urlImage ? {uri:urlImage} : require("../assets/assets/avatar.png")}/>
            {/* <Avatar.Image source={user? {uri: {user.avatar}}}/> */}
            <View style={{ alignContent:"center", alignSelf:"center", gap: 10 }}>
                <Text style={styles.textwhitelg}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.textsm}>{phone}</Text>
            </View>
        </View>
      </View>
      <View style={{backgroundColor:"#fff", flex: 1}}>
        <View style={[styles.my2, {marginTop: 20}]}>
        <Text style={{color:"#66708f", fontFamily:"Raleway-Medium", fontSize: 14}}>General</Text>
        </View>
        <View style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <AccountInfo/>
            <View>
            <Text style={styles.cardTitle}>Account Information</Text>
            <Text style={styles.cardText}>Change your account information</Text>
            </View>
            </View>
            <ArrowIcon/>
        </View>
        <View style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <InsuranceDetails/>
            <View>
            <Text style={styles.cardTitle}>Insurance Details</Text>
            <Text style={styles.cardText}>Change your account information</Text>
            </View>
            </View>
            <ArrowIcon/>
        </View>
        <View style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <MedicalRecords/>
            <View>
            <Text style={styles.cardTitle}>Medical Records</Text>
            <Text style={styles.cardText}>History about your medical records</Text>
            </View>
            </View>
            <ArrowIcon/>
        </View>
        <View style={styles.cardContainer}>
            <View  style={{flexDirection:"row", gap: 20}}>
            <SettingImg/>
            <View>
            <Text style={styles.cardTitle}>Settings</Text>
            <Text style={styles.cardText}>Manage & Settings</Text>
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop:responsiveScreenHeight(6),
    paddingBottom: 40
  },
  my2:{
    marginBottom: responsiveScreenHeight(2.5)
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
});

export default MyProfile;