import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import ArrowIcon from '../../assets/assets/Vector.svg'
import NotBanKing from '../../assets/assets/credit_card.svg'
import Upi from '../../assets/assets/upi.svg'
import Paytm from '../../assets/assets/paytm.svg'
import GooglePlay from '../../assets/assets/googleplay.svg'
import CreditCard from '../../assets/assets/credit.svg'
import Tick from '../../assets/assets/tick.svg'
import Cross from '../../assets/assets/cross.svg'
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import MyStatusBar from '../../components/Statusbar';
import axios from 'axios';
import { useSelector } from 'react-redux';


const DoctorNotifications = () => {
    const user = useSelector(state => state.doctorAccount)
    const [notify , setNotify] = useState([])
    const [showButtons, setShowButtons] = useState(true);
    const [hiddenItemIds, setHiddenItemIds] = useState([]);
    // const [disabledItems, setDisabledItems] = useState([]);
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
        const data = await axios.get(`https://customdemowebsites.com/dbapi/notifications/dr2/${user.id}`)
          console.log(data.data)  
          setNotify(data.data)
        }
        fetchData()
 },[])

 const handleNotificationAction = async(item)=>{
  setHiddenItemIds((prevHiddenItemIds) => [...prevHiddenItemIds, item.id]);
      console.log(item);
    const parts = item.detail.split(' ');
    const visitNumber = parts[parts.length - 1].trim();

console.log(visitNumber);

// Get the first part (the number)
const number = parts[0];

// console.log(number);
const dateRegex = /\d{4}-\d{2}-\d{2}/; // Matches "yyyy-MM-dd" format
const timeRegex = /\d{2}:\d{2} [AP]M/; // Matches "hh:mm AM/PM" format

// Extract date and time from the detail string
const dateMatch = item.detail.match(dateRegex);
const timeMatch = item.detail.match(timeRegex);

// Check if matches were found
const date = dateMatch ? dateMatch[0] : null; // Extracted date (e.g., "2023-09-25")
const time = timeMatch ? timeMatch[0] : null; // Extracted time (e.g., "09:00 AM")

// console.log("Date:", date); // Output: "Date: 2023-09-25"
// console.log("Time:", time); // Output: "Time: 09:00 AM"
  const data = await axios.put(`https://customdemowebsites.com/dbapi/visits/${visitNumber}`,{
     is_pending: 0,
     is_done:0,
     is_rejected: 0,
     is_accepted: 1
    })
    // console.log(data.status)
    if(data.status === 200){
        const notificationMessage = `Your Appointment has been confirmed from Doctor ${user.firstName} on ${date} at ${time}`;
        const notificationResponse = await axios.post(
          'https://customdemowebsites.com/dbapi/notifications/add',
          {
            pa_id: number,
            event: 'Appointment Confirmed',
            detail: notificationMessage,
            image: '<Waiting/>', // You can adjust this as needed
          }
        );
        Alert.alert("Appointment has been confirmed")
        try {
          const response = await axios.post('https://customdemowebsites.com/dbapi/notify/push-notification', {
            fcm_token: item.fcm_token,
            title:"Appointment Confirmed",
            body: notificationMessage,
          }); 
          console.log('Notification sent successfully:', response.data);
        } catch (error) {
          console.error('Error sending notification:', error);
        }

        console.log('Notification response:', notificationResponse.data);
    }
    await axios.put(`https://customdemowebsites.com/dbapi/notifications/mark-as-read/${item.n_id}`)
 }
 const handleNotificationActionCancel =  async (item)=>{
  console.log(item.n_id)
  setHiddenItemIds((prevHiddenItemIds) => [...prevHiddenItemIds, item.id]);
      console.log(item.detail);
    const parts = item.detail.split(' ');
    const visitNumber = parts[parts.length - 1].trim();

    console.log(visitNumber);

// Get the first part (the number)
const number = parts[0];

console.log(number);
const dateRegex = /\d{4}-\d{2}-\d{2}/; // Matches "yyyy-MM-dd" format
const timeRegex = /\d{2}:\d{2} [AP]M/; // Matches "hh:mm AM/PM" format

// Extract date and time from the detail string
const dateMatch = item.detail.match(dateRegex);
const timeMatch = item.detail.match(timeRegex);

// Check if matches were found
const date = dateMatch ? dateMatch[0] : null; // Extracted date (e.g., "2023-09-25")
const time = timeMatch ? timeMatch[0] : null; // Extracted time (e.g., "09:00 AM")

console.log("Date:", date); // Output: "Date: 2023-09-25"
console.log("Time:", time); // Output: "Time: 09:00 AM"
  const data = await axios.put(`https://customdemowebsites.com/dbapi/visits/${visitNumber}`,{
     is_pending: 0,
     is_done:0,
     is_rejected: 1,
     is_accepted: 0
    })
    console.log(data.status)
    if(data.status === 200){
        const notificationMessage = `Your Appointment has been cancelled from Doctor ${user.firstName} on ${date} at ${time}`;
        const notificationResponse = await axios.post(
          'https://customdemowebsites.com/dbapi/notifications/add',
          {
            pa_id: number,
            event: 'Appointment Cancelled',
            detail: notificationMessage,
            image: '<Waiting/>', // You can adjust this as needed
          }
        );
        Alert.alert("Appointment has been cancelled")
        try {
          const response = await axios.post('https://customdemowebsites.com/dbapi/notify/push-notification', {
            fcm_token: item.fcm_token,
            title:"Appointment Cancelled",
            body: notificationMessage,
          }); 
          console.log('Notification sent successfully:', response.data);
        } catch (error) {
          console.error('Error sending notification:', error);
        }

        console.log('Notification response:', notificationResponse.data);
    }

    await axios.put(`https://customdemowebsites.com/dbapi/notifications/mark-as-read/${item.n_id}`)

    
 }
 const markAsRead = (itemId) => {
  // Find the index of the item to mark as read
  const itemIndex = notify.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    // Update the item's is_read property to 1 (read)
    const updatedNotify = [...notify];
    updatedNotify[itemIndex].is_read = 1;
    setNotify(updatedNotify);
  }
};
  return (
    <>
      <View style={styles.container}>
        <MyStatusBar backgroundColor="transparent"/>
       <Text style={styles.head}>Notification</Text>

       <View style={styles.bottomborder}>
        <Text style={styles.textsm}>{formattedDate}</Text>
       </View>
       {notify.map((items)=>{
        console.log
        return(
          <>
          {items.is_read == 0 ?
            <View key={items.n_id} style={styles.cardContainer}>
            <CreditCard/>
            <View style={{width: "60%"}}>
            <Text style={styles.cardTitle}>{items.event}</Text>
            <Text style={styles.textxs}>{items.detail}</Text>
            </View>
            <View style={{flexDirection:"row", gap: 10}}>
              {items.is_read === 0 ?
              <>
            <TouchableOpacity
      onPress={() => {
        handleNotificationAction(items, 'tick');
        markAsRead(items.id); // Mark the notification as read
      }}
      style={styles.notificationActionIconContainer}
    >
      <Tick/>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        handleNotificationActionCancel(items, 'tick');
        markAsRead(items.id); // Mark the notification as read
      }}
      style={styles.notificationActionIconContainer}
      
    >
     <Cross/>
    </TouchableOpacity>
    </>
    : null
       }
                </View>
        </View>
        : null
        }
        </>
        )
       })}
      
        </View>
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
  },
  cardContainer:{
    borderBottomColor:"#E7E7E7", borderWidth: 1, borderColor:"transparent",  paddingVertical:10, flexDirection:"row", alignItems:"center", gap: 15, justifyContent:'space-between'
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

export default DoctorNotifications;