import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { responsiveScreenHeight, responsiveScreenFontSize } from "react-native-responsive-dimensions";
import React from 'react';

const CustomButtom = ({title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style? style : styles.btnContainer}>
      <Text style={style ? style : styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButtom;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4464D9',
    // padding: 10,
    height: responsiveScreenHeight(6.5),
    marginTop: 10,
  },
  btnText: {
    fontSize: responsiveScreenFontSize(2),
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
