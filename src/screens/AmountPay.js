import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import ArrowIcon from '../assets/assets/Vector.svg'
import NotBanKing from '../assets/assets/credit_card.svg'
import Upi from '../assets/assets/upi.svg'
import Paytm from '../assets/assets/paytm.svg'
import GooglePlay from '../assets/assets/googleplay.svg'
import CreditCard from '../assets/assets/credit.svg'
import PhonePE from '../assets/assets/phonepe.svg'
import COD from '../assets/assets/creditBill.svg'
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';



const AmountPay = ({route}) => {
  const { item, selectedDate, selectedTimefrom, selectedTimeTo, visitId, selectedDay} = route.params;
  console.log(selectedTimefrom, selectedTimeTo,selectedDate, visitId, selectedDay)
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigation = useNavigation();

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      // Show an error message or do something to inform the user to select a payment method
      return;
    }

    // Perform payment processing here (replace the below console.log with actual payment logic)
    console.log(`Paying ₹1000 using ${selectedPaymentMethod}`);

    // After successful payment processing, navigate to BookingDone screen
    navigation.navigate("BookingDone", {
      item: item,
      selectedDate: selectedDate, // Pass the selectedDate
      selectedTimefrom: selectedTimefrom,
      selectedTimeTo: selectedTimeTo, // Pass the selectedTime
      visitId:visitId,
      selectedDay: selectedDay
      
    });
  };

  const paymentMethods = [
    { method: 'Credit/Debit Card', icon: <CreditCard /> },
    { method: 'Net Banking', icon: < NotBanKing/> },
    { method: 'Paytm & Wallet', icon: <Paytm /> },
    { method: 'UPI', icon: <Upi /> },
    { method: 'oogle Pay', icon: <GooglePlay /> },
    { method: 'PhonePe/BHIM UPI', icon: <PhonePE /> },
    { method: 'Cash on Delivery', icon: <COD /> },
    // Add other payment methods similarly here
  ];

  return (
    <View style={{ flex: 1, paddingTop: responsiveScreenHeight(3), backgroundColor: "#4464D9" }}>
      <View style={{backgroundColor:"#4464D9", justifyContent:"center", alignItems:"center", height: responsiveScreenHeight(14)}}>
        <TouchableOpacity style={{ position :"absolute", left: 30, top: responsiveScreenHeight(4) }} onPress={()=>{
          navigation.goBack()
        }}> 
        <ArrowIcon  />
        </TouchableOpacity>
        <View style={{justifyContent:"center", alignContent:"center", alignItems:"center"}}>
            <Text style={{fontFamily:"Raleway-SemiBold", fontSize:16, color:"#fff"}}>Amount To Pay</Text>
            <Text style={{fontFamily:"Raleway-Bold", fontSize:24, color:"#fff"}}>₹{item.fee}</Text>
        </View>
      </View>
      <View style={{backgroundColor:"#fff", flex: 1}}>
      {paymentMethods.map(({ method, icon }) => (
        <TouchableOpacity
          key={method}
          onPress={() => handlePaymentMethodSelect(method)}
          disabled={selectedPaymentMethod === method}
        >
          <View style={[styles.cardContainer, selectedPaymentMethod === method && styles.cardContainerSelected]}>
            {icon}
            <Text style={[styles.cardTitle, selectedPaymentMethod === method && styles.cardTitleSelected]}>{method}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={{ width:"100%", padding: 20 , position:"absolute", bottom: 0}}  onPress={() => handlePayment()} disabled={!selectedPaymentMethod}>
        <View style={[styles.button, { marginTop: 20 }, !selectedPaymentMethod && styles.buttonDisabled]}>
          <Text style={{ fontSize: 16, color: "#fff", fontFamily: "PlusJakartaSans-Bold" }}>Pay ₹{item.fee}</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... Other styles ...
  cardContainer: {
    borderBottomColor: "#E7E7E7",
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cardContainerSelected: {
    borderColor: "#4464D9", // Change to the color you want when the payment method is selected
  },
  cardTitle: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 14,
    color: "#172331",
  },
  cardTitleSelected: {
    color: "#4464D9", // Change to the color you want when the payment method is selected
  },
  button: {
    backgroundColor: "#4464D9",
    width: "100%",
    height: responsiveScreenHeight(6),
    color: "#fff",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    fontFamily: "PlusJakartaSans-ExtraBold",
  },
  buttonDisabled: {
    backgroundColor: "#BABABA",
  },
  // button: {
  //   backgroundColor: "#BABABA",
  //   width: "100%",
  //   height: responsiveScreenHeight(6),
  //   color: "#fff",
  //   borderRadius: 30,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginBottom: 10,
  //   fontFamily: "PlusJakartaSans-ExtraBold",
  // },
  buttonSelected: {
    backgroundColor: "#4464D9", // Change this to your desired color for selected button
  },
});

export default AmountPay;