import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import ArrowIcon from '../../assets/assets/Vector.svg'
import NotBanKing from '../../assets/assets/credit_card.svg'
import Upi from '../../assets/assets/upi.svg'
import Paytm from '../../assets/assets/paytm.svg'
import GooglePlay from '../../assets/assets/googleplay.svg'
import CreditCard from '../../assets/assets/credit.svg'
import PhonePE from '../../assets/assets/phonepe.svg'
import COD from '../../assets/assets/creditBill.svg'
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import MyStatusBar from '../../components/Statusbar';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Notification = () => {
  const user = useSelector((state)=> state.customerAccount)
  const [notify , setNotify] = useState([])
  const currentDate = new Date();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const formattedDate = `Today, ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  
  console.log(formattedDate);
 const navigation = useNavigation();
 useEffect(()=>{
    async function fetchData() {
        const data = await axios.get(`https://customdemowebsites.com/dbapi/notifications/pa/${user.id}`)
          console.log(data.data)  
          setNotify(data.data)
        }
        fetchData()
 },[])
  return (
    <>
     <ScrollView contentContainerStyle={styles.container}>
        <MyStatusBar backgroundColor="transparent"/>
       <Text style={styles.head}>Notification</Text>

       <View style={styles.bottomborder}>
        <Text style={styles.textsm}>{formattedDate}</Text>
       </View>
       <ScrollView style={{paddingBottom: responsiveScreenHeight(60), flex: 1 , height: responsiveScreenHeight(10)}}>
       {notify.map((items)=>{
        console.log(items)
        return(
          <View key={items.id} style={styles.cardContainer}>
          <CreditCard/>
          <View>
          <Text style={styles.cardTitle}>{items.event}</Text>
          <Text style={styles.textxs}>{items.detail}</Text>
          </View>
      </View>
        )
       })}
       </ScrollView >
        </ScrollView>
    </>
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
  head:{
    color: '#172331',
    fontSize: 24,
    fontFamily: 'Raleway-SemiBold',
  },
  bottomborder:{
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginVertical: 10
  },
  textsm:{
  color:"#172331",
  fontFamily: "Raleway-Medium",
  fontSize: 12
  },
  textxs:{
    color: "#66708F",
    fontFamily:"Raleway-Medium",
    fontSize: 12,
    width: "70%"
  },
  cardContainer:{
    borderBottomColor:"#E7E7E7", borderWidth: 1, borderColor:"transparent",  paddingVertical:10, flexDirection:"row", alignItems:"center", gap: 15,
  },
  cardTitle:{
    fontFamily: "Raleway-SemiBold",
    fontSize: 14,
    color: "#172331"
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
});

export default Notification;