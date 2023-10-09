import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import {
    responsiveScreenHeight,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";

const InputField = ({handleChange, onChangeFocus, value, placeholder, keyboardType}) => {


  return (
    <View style={styles.inputFiedls}>
    <TextInput  
     style={{fontFamily:"Raleway-Medium", fontSize:16,  color:"#172331"}} placeholder={placeholder} 
    onChangeText={handleChange}
    onFocus={onChangeFocus}
    value={value}
    // onChange={handleChange}
    secureTextEntry={false}
    keyboardType={keyboardType}/>
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
    inputFiedls:{
        fontFamily: "Raleway-Medium",
        backgroundColor: "#fff",
        borderColor: "#EBEBEB",
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 8,
        height: responsiveScreenHeight(6.5),
        color:"#172331",
        justifyContent:"center"
       },
})