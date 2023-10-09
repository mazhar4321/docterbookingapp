import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header/index';
import BackBtn from '../assets/assets/icon-button.svg';
import CustomButtom from '../components/Button/index';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';

const OTPScreen = ({role, handleResendOTP, submitOTP}) => {
  // console.log(route)
  const navigation = useNavigation();

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const inputRefs = useRef([]);
  const phone = useSelector(State => State.phone)
  const [loading , setLoading] = useState(false)

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

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    setOtp(prevOtp => {
      const otpArray = prevOtp.split('');
      otpArray[index] = value;
      return otpArray.join('');
    });

    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleFocusChange = index => {
    inputRefs.current[index].focus();
  };

  const handleResetTimer = () => {
    setTimer(60);
    setIsTimerRunning(true);
  };
  // const {role} = route.params
  // const {confirm} = route.params;
// console.log(confirm)

  const handlePress = () => {
    navigation.goBack();
  };
  const onPress = async() => {
    setLoading(true)
    // try{
    //   let data = await confirm.confirm(otp);
    //   console.log("sign IN")
    //    navigation.navigate('CreateAccount', {role});
    // }catch(err){
    //   Alert("invalid OTP")
    // }
    submitOTP(otp)
   
  };
  return (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor:"#fff" }} behavior='padding'>
    <View style={styles.container}>
      <View>
        <Header image={<BackBtn />} handlePress={handlePress} />
        <Text style={styles.h1}>OTP Verification</Text>
        <View style={styles.flexColumn}>
          <Text style={styles.h5}>We have sent a verification code to</Text>
          <Text style={{fontFamily: 'Raleway-SemiBold', color: '#172331'}}>
           {phone}
          </Text>
        </View>
       <View style={styles.otpContainer}>
        {Array.from({length: 6}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.inputContainer,
              otp.length === index && styles.inputContainerFocused,
            ]}>
            <TextInput
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.input}
              value={otp[index] || ''}
              maxLength={1}
              onChangeText={value => handleOtpChange(index, value)}
              keyboardType="numeric"
              autoFocus={index === 0}
              onFocus={() => handleFocusChange(index)}
            />
          </View>
        ))}
        </View>
        
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.highlightColor}>Didn’t Receive the call?</Text>
            <Text
              onPress={handleResetTimer}
              style={{
                color: '#4464D9',
                fontFamily: 'Raleway-Medium',
                marginLeft: 4,
              }}>
              Resend
            </Text>
          </View>
          <Text style={styles.timerText}> {`00.${timer}`} </Text>
        </View>
      </View>
      <View>
        <CustomButtom title="Verify" onPress={onPress} />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: responsiveScreenHeight(7),
    paddingBottom: 40,
    justifyContent: 'space-between',
    flex: 1
  },
  h1: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 15,
    color: '#172331',
    marginTop: 30,
  },
  h5: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 28,
    color: '#172331',
  },
  span: {
    color: '#172331',
    fontWeight: 600,
    fontFamily: 'Raleway',
  },
  image: {
    marginTop: 15,
    marginBottom: 15,
  },
  highlightColor: {
    opacity: 0.6,
    color: '#172331',
    fontFamily: 'Raleway-Medium',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  otpInput: {
    fontFamily: 'Raleway',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    fontSize: 20,
    width: responsiveScreenWidth(13),
    textAlign: 'center',
    // borderColor: "#4464D9",
    borderColor: '#EBEBEB',
    color: '#172331',
  },
  timerContainer: {
    marginBottom: 20,
    justifyContent: 'space-between',
    flex: 2,
    flexDirection: 'row',
    fontFamily: 'Raleway-Medium',
  },
  timerText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#172331',
  },
  resendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // button: {
  //   backgroundColor: "#4464D9",
  //   width: "100%",
  //   height: 48,
  //   color: "#fff",
  //   borderRadius: 10,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginBottom: 10,
  // },
  colorWhite: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 500,
  },
  flexColumn: {
    flexDirection: 'column',
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 41,
  },
  inputContainer: {
    width: responsiveScreenWidth(13),
    height: responsiveScreenHeight(8),
    marginHorizontal: 5,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row"
  },
  inputContainerFocused: {
    borderColor: '#4464D9',
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 18,
    color: "#000"
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#4464D9',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
