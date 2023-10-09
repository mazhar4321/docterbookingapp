import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const Head = ({title,image, availabibility, style, onPress}) => {
  return (
    <View style={styles.head}>
      <Text style={[styles.h1, style]}>{title}</Text>
      {image && <TouchableOpacity onPress={onPress} style={{flexDirection:"row", gap: 5, alignItems:"center"}}>{image}
      {availabibility && <Text  onPress={onPress} style={{color:"#4464D9", fontFamily:"Raleway-SemiBold", fontSize: 14}}>{availabibility}</Text>}
      </TouchableOpacity>}
    </View>
  )
}

export default Head

const styles = StyleSheet.create({
    head:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    h1:{
        fontSize: responsiveFontSize(2),
        fontFamily: "Raleway-SemiBold",     
color: "#172331"
    }
})