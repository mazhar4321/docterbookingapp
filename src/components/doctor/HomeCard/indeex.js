import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

const HomePageCard = ({Head, style, reviews, title}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.h1, style]}>{Head}</Text>
      <Text style={styles.h6}>My {title}</Text>
      {reviews && <Text  style={styles.h6}>{reviews} </Text>}
    </View>
  )
}

export default HomePageCard

const styles = StyleSheet.create({
    container:{
        borderRadius: 12,
        width: responsiveScreenWidth(40),
        padding: responsiveScreenWidth(3),
        height: responsiveScreenHeight(15),
        gap: 5
    },
    h1:{
        color:"#4464D9",
        fontSize: responsiveScreenHeight(3.5),
        fontFamily:"Raleway-Bold",
    },
    h6:{
        color: "#172331",
        fontFamily: "Raleway-Medium",
        fontSize: 12,
        textAlign:"left"
    }
})