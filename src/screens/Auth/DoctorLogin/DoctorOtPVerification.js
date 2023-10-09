import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header/index"
import BackBtn from '../../../assets/assets/icon-button.svg'
import CustomButtom from '../../../components/Button/index'
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import MyStatusBar from "../../../components/Statusbar";

const DoctorOtpVerification = () => {

  const navigation = useNavigation();

  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setIsTimerRunning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOTPPaste = (text) => {
    const otpArray = text.slice(0, 6).split("");
    const newOTP = [...otp];

    otpArray.forEach((value, index) => {
      if (inputRefs.current[index]) {
        newOTP[index] = value;
        inputRefs.current[index].setNativeProps({ text: value });
        if (index === 5) {
          setOTP(newOTP);
          handleVerifyOTP();
        }
      }
    });
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");
    // TODO: Implement OTP verification logic
    console.log("Entered OTP:", enteredOTP);
  };

  const handleResendOTP = () => {
    setOTP(["", "", "", "", "", ""]);
    setTimer(30);
    setIsTimerRunning(true);
    inputRefs.current[0].focus();
  };

  const handleOTPEdit = (value, index) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value === "" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    } else if (index < otp.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    if (index === otp.length - 1 && value !== "") {
      handleVerifyOTP();
    }
  };
  const handlePress= ()=>{
    navigation.goBack();
  }
 const onPress = ()=>{
  navigation.navigate("DoctorAccount")
 }

  return (
    <View style={styles.container}>
      <View>
      <MyStatusBar/>
       <Header
          image={<BackBtn/>}
          handlePress={handlePress}
          />
      <Text style={styles.h1}>OTP Verification</Text>
      <View style={styles.flexColumn}>
        <Text style={styles.h5}>We have sent a verification code to</Text>
        <Text style={{ fontFamily: "Raleway-SemiBold",color: "#172331" }}>+91 9540826565</Text>
      </View>
      
      

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOTPEdit(value, index)}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={index === 0}
            onFocus={() =>
              inputRefs.current[index].setNativeProps({ text: "" })
            }
          />
        ))}
      </View>
      <View  style={{justifyContent: "space-between", flexDirection: "row"}}>
        <View style={{flexDirection: "row"}}>
        <Text style={styles.highlightColor}>
          Didn’t Receive the call?
        </Text>
          <Text onPress={handleResendOTP} style={{ color: "#4464D9", fontFamily: "Raleway-Medium", marginLeft: 4 }}>Resend</Text>
          </View>
        <Text style={styles.timerText}> {`00.${timer}`} </Text>
      </View>
      </View>
      <View  >
      <CustomButtom
        title="Verify"
        onPress={onPress}
        />
      </View>
    </View>
  );
};

export default DoctorOtpVerification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop:responsiveScreenHeight(6),
    paddingBottom: 40,
    flex: 1,
    justifyContent:"space-between"
  },
  h1: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 15,
    color: "#172331",
    marginTop: 30
  },
  h5: {
    fontFamily: "Raleway-Medium",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 28,
    color: "#172331"
  },
  span: {
    color: "#172331",
    fontWeight: 600,
    fontFamily: "Raleway",
  },
  image: {
    marginTop: 15,
    marginBottom: 15,
  },
  highlightColor: {
    opacity: 0.6,
    color: "#172331",
    fontFamily: "Raleway-Medium",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  otpInput: {
    fontFamily: "Raleway",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: "space-between",
    fontSize: 20,
    width: responsiveScreenWidth(13),
    textAlign: "center",
    // borderColor: "#4464D9",
    borderColor: "#EBEBEB",
    color: "#172331",
  },
  timerContainer: {
    marginBottom: 20,
    justifyContent: "space-between",
    flex: 2,
    flexDirection: "row",
    fontFamily: "Raleway-Medium",
  },
  timerText: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 16,
    color: "#172331"
  },
  resendButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resendButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4464D9",
    width: "100%",
    height: 48,
    color: "#fff",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  colorWhite: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: "#fff",
    textAlign: "center",
    fontWeight: 500,
  },
  flexColumn: {
    flexDirection: "column",
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 41
  },
});