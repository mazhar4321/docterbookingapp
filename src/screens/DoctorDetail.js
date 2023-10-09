import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import ExpandMore from '../assets/assets/expand_more.svg';
import {Avatar} from 'react-native-paper';
import {Divider} from 'react-native-paper';
import CalendarIcon from '../assets/assets/appointment.svg';
import HomeHealthIcon from '../assets/assets/home_health.svg';
import LocationIcon from '../assets/assets/my_location.svg';
import CoupenIcon from '../assets/assets/coupen.svg';
import BackBtn from '../assets/assets/icon-button.svg';
import Coupen from '../assets/assets/coupenicon.svg';
import Verified from '../assets/assets/doctorverified.svg';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import MyStatusBar from '../components/Statusbar';
import axios from 'axios';
import {parse, format} from 'date-fns';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import MapView, { Marker,  PROVIDER_GOOGLE  } from 'react-native-maps';
import { Linking } from 'react-native';


const DoctorDetail = ({route}) => {
  const {selectedDate, selectedTimefrom, selectedTimeTo, item, visitId , selectedDay} = route.params;
  console.log(selectedDate, selectedTimefrom, selectedTimeTo, visitId, selectedDay, item);

  const [data, setData] = useState([]);
  const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [address, setAddress] = useState(null);
  const [ loading , setLoading] = useState(false)
  const [loadingDotsCount, setLoadingDotsCount] = useState(1);
  const parsedDate = parse(selectedDate, 'yyyy-MM-dd', new Date());
  const [showMap, setShowMap] = useState(false);
  const user = useSelector(state => state.customerAccount);
  const phone = useSelector(State => State.phone);


  // // Format the date to "Fri, 10 Mar" format
  const formattedDate = format(parsedDate, 'E, d MMM');
  // console.log(formattedDate)

  const navigation = useNavigation();

  useEffect(() => {
    // Check and request location permission for Android
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If permission granted, get user's location
          getCurrentLocation();
        } else {
          console.log('Location permission denied.');
          // Handle permission denied
        }
      });
    } else {
      // For iOS, no need to request location permission
      // getCurrentLocation();
     getCurrentLocation()
    }
  }, [location]);

  const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    pos => {
      // Do somehting if location activated
      console.log(pos)
      const { latitude, longitude } = pos.coords;
      // setLocation({ latitude, longitude });
      getReverseGeocode(latitude, longitude);
    },
    error => {
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000}
  );
  }


const getReverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyB4kdLXqVay4JN-vuRNkLU_8Cu5D0saFMY`
    );

    if (response && response.data) {
      const results = response.data.results;
      if (results && results.length > 0) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress);
      } else {
        setAddress('Address not found');
      }
    }
  } catch (error) {
    console.log('Error getting address: ', error);
    setAddress('Error fetching address');
  }
};


  const formattedAddress = address
    ? `${address.houseNumber ? address.houseNumber : ''}, ${
        address.streetNumber
      }, ${address.city}, ${address.country}, ${address.postalCode}`
    : 'Loading...';

  const handlePay = async () => {
    setLoading(true)
    const data = await axios.put(
      `https://customdemowebsites.com/dbapi/paUsers/${user.id}`,
      {
        address: address,
      },
    );
    console.log(data.data);
   
    if(data){
      
      navigation.navigate('AmountPayment', {
        item: item,
        selectedDate: selectedDate, // Pass the selectedDate
        selectedTimefrom: selectedTimefrom,
        selectedTimeTo: selectedTimeTo,
        visitId: visitId, // Pass the selectedTime
        selectedDay: selectedDay
      });
      setLoading(false)
    }
    else{
      setLoading(false)
    
  }
  };

  console.log(location)
  const openGoogleMaps = () => {
    // Replace with your desired latitude and longitude
    // const latitude = 37.78825;
    // const longitude = -122.4324;
    
    // const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    // Linking.openURL(url)
    //   .catch((error) => {
    //     console.error('Error opening Google Maps:', error);
    //   });
    const latitude = location.latitude;
    const longitude = location.longitude
    navigation.navigate('MapView', {  setLocation, location});
  };

  

  useEffect(() => {
    // Simulate loading for a few seconds
    const loadingInterval = setInterval(() => {
      setLoadingDotsCount((prevCount) => (prevCount % 3) + 1); // Cycles through 1, 2, 3
    }, 500); // Adjust the interval as needed

    // Simulate an API call or some asynchronous operation
    setTimeout(() => {
      clearInterval(loadingInterval); // Stop the loading animation
      setLoading(false); // Set loading to false when the operation is complete
    }, 3000); // Adjust the duration to simulate the loading time
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <MyStatusBar backgroundColor="transparents" /> */}
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <BackBtn />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              alignItems: 'flex-start',
              marginVertical: responsiveScreenHeight(2),
            }}>
              <Avatar.Image size={64} source={{uri:`https://customdemowebsites.com/dbapi/${item.img}`}} />
            <View style={{gap: 5}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                <Text style={{color: '#172331', fontFamily: 'Raleway-Bold'}}>
                  {' '}
                  Dr {item.f_name}{' '}
                </Text>
                <Verified />
              </View>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#172331',
                    fontSize: 12,
                    fontFamily: 'Raleway-SemiBold',
                  }}>
                  {item.profession}
                </Text>
                <View style={styles.dotCircle} />
                <Text
                  style={{
                    color: '#172331',
                    fontSize: 12,
                    fontFamily: 'Raleway-SemiBold',
                  }}>
                  {item.experience}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                  <Image source={require('../assets/assets/star.png')} />
                  <Text
                    style={{
                      color: '#172331',
                      fontFamily: 'Raleway-SemiBold',
                      fontSize: 12,
                    }}>
                    {item.review_count}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Image source={require('../assets/assets/location.png')} />
                  <Text
                    style={{
                      color: '#172331',
                      fontFamily: 'Raleway-SemiBold',
                      fontSize: 12,
                    }}>
                    {item.hospital}
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
                  {formattedDate} {selectedTimefrom} 
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
                {/* <Text
              style={{
                color: '#172331',
                fontFamily: 'Raleway-Medium',
                fontSize: 14,
                width: '70%',
              }}>
              C-12/74, Khirki Ext. Malviya nagar New Delhi, 110017
            </Text> */}
                {address ? (
                  <Text
                    style={{
                      color: '#172331',
                      fontFamily: 'Raleway-Medium',
                      fontSize: 14,
                      width: responsiveScreenWidth(65),
                    }}>
                    {address}
                  </Text>
                ) : (
                  <Text>Loading...</Text>
                )}
              </View>
              <Divider />
            </View>
            <Divider />
            {/* <View
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
            </View> */}
            <View >

    <TouchableOpacity onPress={openGoogleMaps}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 5,
      }}
    >
        <LocationIcon />
      <Text
        style={{
          color: '#4464D9',
          fontFamily: 'Raleway-SemiBold',
          fontSize: 12,
        }}
      >
        Choose current location
      </Text>
    </TouchableOpacity>
  </View>
 
          </View>
          <Divider />
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
              <Coupen />
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
            <Text
              style={{
                fontFamily: 'Raleway-SemiBold',
                fontSize: 14,
                color: '#172331',
                marginBottom: responsiveScreenHeight(1.5),
              }}>
              Bill Details
            </Text>
            <View style={{marginBottom: responsiveScreenHeight(1.5)}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: '#172331',
                    fontFamily: 'Raleway-Medium',
                    fontSize: 12,
                  }}>
                  Consultation Fee
                </Text>
                <Text
                  style={{
                    color: '#172331',
                    fontFamily: 'Raleway-Medium',
                    fontSize: 12,
                  }}>
                  ₹{item.fee}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: '#172331',
                    fontFamily: 'Raleway-Medium',
                    fontSize: 12,
                  }}>
                  Service Fee & Tax
                </Text>
                <Text
                  style={{
                    color: '#48BD69',
                    fontFamily: 'Raleway-Medium',
                    fontSize: 12,
                  }}>
                  Free
                </Text>
              </View>
            </View>
            <Divider style={{borderColor: '#48BD69'}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#172331',
                  fontFamily: 'Raleway-Bold',
                  fontSize: 14,
                }}>
                Total Payable
              </Text>
              <Text
                style={{
                  color: '#172331',
                  fontFamily: 'Raleway-Bold',
                  fontSize: 14,
                }}>
                ₹{item.fee}
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 30, width: '100%'}}>
          <TouchableOpacity onPress={handlePay} disabled={!address} >
            <View style={styles.button}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontFamily: 'PlusJakartaSans-Bold',
                }}>
                {loading ? (
        `Loading${'.'.repeat(loadingDotsCount)}`
      ) : (
        `Pay ₹${item.fee}`
      )}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DoctorDetail;

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: responsiveScreenHeight(5),
  },
  appointmentContainer: {
    backgroundColor: '#F5F7F9',
    borderRadius: 12,
  },
  dotCircle: {
    width: 4,
    height: 4,
    borderRadius: 4,
    color: '#000',
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleGreen: {
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: '#48BD69',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#4464D9',
    width: '100%',
    height: responsiveScreenHeight(6),
    color: '#fff',
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
});
