import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from "../../../components/Header/index"
import BackBtn from '../../../assets/assets/icon-button.svg'
import CustomButtom from '../../../components/Button'

import InputField from '../../../components/InputFiels'
import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
const DoctorLogin = () => {
  const navigation = useNavigation();
  let textInput = useRef(null)
  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, SetFocusInput] = useState(true)

  const onChangeFocus = ()=>{
    SetFocusInput(true)
  }
  const handleChange = (number)=>{
   setPhoneNumber(number)
  }

  const handlePress= ()=>{
    navigation.goBack();
  }
 const onPress = ()=>{
  navigation.navigate("DoctorOtp")
 }
  return (
    <View style={styles.container}>
        <View>
          <Header
          image={<BackBtn/>}
          handlePress={handlePress}
          />
        <Text style={styles.h1}>Enter your mobile no.</Text>
        <InputField
        onFocus={onChangeFocus}
        handleChange={handleChange}
        value={phoneNumber}
        placeholder="99001 99001"
        keyboardType="numeric"
        />
        </View>
        <CustomButtom
        title="Get Started"
        onPress={onPress}
        />
          </View>
 )
}

export default DoctorLogin

const styles = StyleSheet.create({
   container:{
    paddingTop:50,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor : "#fff",
    flex: 1,
    justifyContent: "space-between"
   },
  
   input: {
    fontFamily: "Raleway",
    width: 1000,
    height: 64,
    fontSize: 26,
    marginVertical: 10,
}, 
   h1:{
    fontFamily: "Raleway-Medium",
    marginTop: 24,
    color: "#172331",
   fontSize: 20,
   fontWeight: 500,
   marginBottom: 20
   },
  
   button:{
    backgroundColor: "#4464D9",
    width: '100%',
    height: 48,
   color: "#fff",
   borderRadius : 10,
   display: 'flex',
   alignItems: "center",
   justifyContent:"center",
   marginBottom: 10
   },
   colorWhite:{
    fontFamily: "PlusJakartaSans",
   color : "#fff",
   textAlign: "center",
   fontWeight: 600,
   }
})