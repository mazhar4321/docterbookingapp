import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

const Detail = () => {
//   const  navigation = useNavigation()
  return (
    <View  style={{flex: 1, backgroundColor:"#fff"}} >
          {/* <View style={styles.container}>
            <View>
      <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}>
       <BackBtn/>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'flex-start',
          marginVertical: responsiveScreenHeight(2),
        }}>
        <Avatar.Image
          size={responsiveScreenWidth(16)}
          source={require('../assets/assets/doctorimg.png')}
        />
        <View style={{gap: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <Text style={{color: '#172331',fontFamily:"Raleway-Bold"}}> Dr Rahul </Text>
            <Verified/>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text
              style={{
                color: '#172331',
                fontSize: 12,
                fontFamily: 'Raleway-SemiBold',
              }}>
              Physiotherapist
            </Text>
            <View style={styles.dotCircle} />
            <Text
              style={{
                color: '#172331',
                fontSize: 12,
                fontFamily: 'Raleway-SemiBold',
              }}>
              24 yrs exp
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <Image source={require('../assets/assets/star.png')} />
              <Text
                style={{
                  color: '#172331',
                  fontFamily: 'Raleway-SemiBold',
                  fontSize: 12,
                }}>
                4.1
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image source={require('../assets/assets/location.png')} />
              <Text
                style={{
                  color: '#172331',
                  fontFamily: 'Raleway-SemiBold',
                  fontSize: 12,
                }}>
                Patparganj
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.appointmentContainer}>
        <View style={{flexDirection: 'row', gap: 20, padding: 20}}>
          <View style={styles.circle}>
            <CalendarIcon style={styles.image} />
          </View>
          <View>
            <Text
              style={{
                color: '#172331',
                fontFamily: 'Raleway-Medium',
                fontSize: 10,
              }}>
              Appointment Time
            </Text>
            <Text
              style={{
                color: '#172331',
                fontFamily: 'Raleway-SemiBold',
                fontSize: 14,
              }}>
              Fri, 10 Mar 11:00 AM
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{flexDirection: 'row', gap: 20, padding: 20}}>
          <View style={styles.circleGreen}>
            <HomeHealthIcon style={styles.image} />
          </View>
          <View>
            <Text
              style={{
                color: '#172331',
                fontFamily: 'Raleway-Medium',
                fontSize: 10,
              }}>
              Patient Address
            </Text>
            <Text
              style={{
                color: '#172331',
                fontFamily: 'Raleway-Medium',
                fontSize: 14,
                width: '70%',
              }}>
              C-12/74, Khirki Ext. Malviya nagar New Delhi, 110017
            </Text>
          </View>
          <Divider />
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            gap: 5,
          }}>
          <LocationIcon />
          <Text
            style={{
              color: '#4464D9',
              fontFamily: 'Raleway-SemiBold',
              fontSize: 12,
            }}>
            Choose current location
          </Text>
        </View>
       
      </View>
      <Divider/>
      <View
        style={{
          marginVertical: responsiveScreenHeight(2),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          borderColor: '#F5F7F9',
          borderWidth: 1,
          borderRadius: 12,
          paddingVertical: 5,
          alignContent: 'center',
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
         <Coupen/>
          <View>
            <Text
              style={{
                color: '#172331',
                fontFamily: 'Raleway-SemiBold',
                fontSize: 14,
              }}>
              Apply Coupon
            </Text>
            <Text
              style={{
                color: '#172331',
                fontFamily: 'Raleway-Medium',
                fontSize: 12,
                width: '80%',
              }}>
              Unlock offers with coupon codes
            </Text>
          </View>
        </View>
        <TouchableOpacity>
        <Text
          style={{
            color: '#4464D9',
            fontFamily: 'Raleway-SemiBold',
            fontSize: 12,
          }}>
          APPLY
        </Text>
        </TouchableOpacity>
      </View>
    
      <View>
        <Text style={{fontFamily:"Raleway-SemiBold", fontSize: 14, color: "#172331", marginBottom: responsiveScreenHeight(1.5)}}>Bill Details</Text>
        <View style={{marginBottom: responsiveScreenHeight(1.5)}}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={{
              color: '#172331',
              fontFamily: 'Raleway-Medium',
              fontSize: 12,
            }}>Consultation Fee</Text>
          <Text style={{
              color: '#172331',
              fontFamily: 'Raleway-Medium',
              fontSize: 12,
            }}>₹1000</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={{
              color: '#172331',
              fontFamily: 'Raleway-Medium',
              fontSize: 12,
            }}>Service Fee & Tax</Text>
          <Text style={{
              color: '#48BD69',
              fontFamily: 'Raleway-Medium',
              fontSize: 12,
            }}>Free</Text>
        </View>
        </View>
        <Divider style={{borderColor:"#48BD69"}} />
        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop: 10}}>
          <Text style={{
              color: '#172331',
              fontFamily: 'Raleway-Bold',
              fontSize: 14,
            }}>Total Payable</Text>
          <Text style={{
              color: '#172331',
              fontFamily: 'Raleway-Bold',
              fontSize: 14,
            }}>₹1000</Text>
        </View>
      </View>
      </View>
      <View style={{marginTop: 30, width:"100%" }} >
        <TouchableOpacity onPress={()=>{
          navigation.navigate("AmountPayment")
        }} >
          <View style={styles.button}>
            <Text style={{fontSize:16, color:"#fff", fontFamily:"PlusJakartaSans-Bold"}}>Pay ₹1000</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View> */}
      <Tex style={{ fontFamily:"Raleway-Bold" }}>Hello</Tex>
    </View>
  );
};

export default Detail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     justifyContent:"space-between",
//     paddingBottom: 20,
//     paddingTop: responsiveScreenHeight(3)
//   },
//   appointmentContainer: {
//     backgroundColor: '#F5F7F9',
//     borderRadius: 12,
//   },
//   dotCircle:{
//     width: 4,
//     height: 4,
//     borderRadius: 4, color: "#000"
//   },
//   circle: {
//     width: 34,
//     height: 34,
//     borderRadius: 100,
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circleGreen: {
//     width: 34,
//     height: 34,
//     borderRadius: 100,
//     backgroundColor: '#48BD69',
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   button: {
//     backgroundColor: "#4464D9",
//     width: "100%",
//     height: responsiveScreenHeight(6),
//     color: "#fff",
//     borderRadius: 40,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//     fontFamily: "PlusJakartaSans-ExtraBold",
//   },
// });
