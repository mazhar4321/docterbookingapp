import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Header = ({image, handlePress, title, style}) => {
  return (
    <View style={styles.container}>
          <TouchableOpacity onPress={handlePress}>
          <View >{image}</View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handlePress}>
          <View style={style ? style.btn : styles.btnOutline}>
            <Text style={style ? style :styles.textWhite}>{title}</Text>
          </View>
          </TouchableOpacity>
        </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:"transparent"
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  textWhite: {
    color: '#fff',
    fontFamily: "Raleway-Medium",
    fontSize: 12
  },
})