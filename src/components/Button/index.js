import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { responsiveScreenHeight, responsiveScreenFontSize } from "react-native-responsive-dimensions";
import React from 'react';

const CustomButtom = ({title, onPress, style,loading }) => {
  return (
    <TouchableOpacity
      onPress={loading ? null : onPress} // Disable button when loading is true
      style={[styles.btnContainer, loading && styles.btnContainerDisabled, style]}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" style={styles.activityIndicator} />
      ) : (
        <Text style={[styles.btnText, style]}>{title}</Text>
      )}
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
  // btnContainerDisabled: {
  //   backgroundColor: 'gray', // Change the background color when disabled
  // },
  btnText: {
    fontSize: responsiveScreenFontSize(2),
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  activityIndicator: {
    marginLeft: 8, // Add some spacing between indicator and text
  },
});
