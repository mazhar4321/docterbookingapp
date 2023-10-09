import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import ExpandMore from '../assets/assets/expand_more.svg';
import {Avatar} from 'react-native-paper';
import MorningICon from '../assets/assets/noon.svg';
import NoonICon from '../assets/assets/Morning.svg';
import EveningICon from '../assets/assets/Evening.svg';
import HomeIcon from '../assets/assets/group.svg';
import ReviewComponent from '../components/Reviews';
import ArrowOutward from '../assets/assets/arrow_outward.svg';
import {useNavigation} from '@react-navigation/native';
import BackBtn from '../assets/assets/icon-button.svg';
import Header from '../components/Header';
import CustomButtom from '../components/Button';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import MyStatusBar from '../components/Statusbar';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {setVisitId as visit} from '../screens/Redux/Reducer/CreateAccount/CustomerAccount';

const DoctorBooking = ({route}) => {
  const [data, setData] = useState([]);
  const [availabilityData, setAvailabilityData] = useState({});
  const [visitId, setVisitId] = useState('');
  const [message, setMessage] = useState(null);
  const user = useSelector(state => state.customerAccount);
  // console.log(user.id)
  const {item} = route.params;
  const isToday = date => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  // console.log(item)
  // const id = route.params
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://customdemowebsites.com/dbapi/drUsers/detail/${item.id}`,
        );
        // console.log(response.data)
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  // console.log(data)
  // console.log(availabilityData.detail)
  const navigation = useNavigation();
  //     const currentDate = new Date();
  //     const daysInNumber = [ 'M', 'T', 'W', 'T', 'F', 'S'];
  //     const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(startOfWeek.toISOString().split('T')[0]);
  const morningTimings = ['09:00 AM', '11:00 AM', '11:30 AM'];
  const afternoonTimings = ['12:00 PM', '12:30 PM'];
  const eveningTimings = ['05:00 PM', '05:30 PM', '06:00 PM'];
  const [selectedTimefrom, setSelectedTimefrom] = useState(null);
  const [selectedTimeTo, setSelectedTimeTo] = useState(null);
  const [lastVisitNumber, setLastVisitNumber] = useState(122);
  console.log(selectedTimefrom , selectedTimeTo)

  const handleTimePress = (time, val) => {
    // console.log(time , val);
    if(val === "to"){
      setSelectedTimeTo(time)
    }
    if(val === "from"){
      setSelectedTimefrom(time)
    }
    
  };

  // const handleDayPress = (index) => {
  //   setSelectedDayIndex(index);
  //   const futureDate = new Date(startOfWeek);
  //   futureDate.setDate(startOfWeek.getDate() + index);
  //   setSelectedDate(futureDate.toISOString().split('T')[0]); // Set the selected date in "YYYY-MM-DD" format
  // };
  const windowWidth = Dimensions.get('window').width;

  const calendarContainerWidth = responsiveScreenWidth(10);
  const calendarContainerHeight = calendarContainerWidth;

  const calendarContainerStyle = {
    width: calendarContainerWidth,
    margin: 4,
    // height: calendarContainerHeight,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    height: responsiveScreenHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  };

  const dayTextStyle = {
    fontSize: 12,
    color: '#78879A',
    fontFamily: 'Raleway-SemiBold',
  };

  const dateTextStyle = {
    fontSize: 14,
    color: '#172331',
    fontFamily: 'Raleway-Bold',
  };

  const calendarContainerSelectedStyle = {
    ...calendarContainerStyle,
    backgroundColor: '#4464D9',
  };

  const daySelectedTextStyle = {
    ...dayTextStyle,
    color: 'white',
  };

  const dateSelectedTextStyle = {
    ...dateTextStyle,
    color: 'white',
  };
  const currentDate = new Date();
  const daysInNumber = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // const currentDate = new Date(); // Get the current date
  const formattedDate = formatDate(currentDate); // Call the function with the current date
  console.log(formattedDate);

  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formattedDate);

  // Rest of the component code...

  const handleDayPress = index => {
    setSelectedDayIndex(index);
    const futureDate = new Date(startOfWeek);
    futureDate.setDate(startOfWeek.getDate() + index);
    setSelectedDate(formatDate(futureDate)); // Set the selected date in "DD-MM-YYYY" format
  };
  // console.log(selectedDate)
  const processAvailabilityData = responseData => {
    // Extract the availability data from the API response
    const availabilityData = responseData;

    // Initialize an empty object to store the categorized slots
    const categorizedSlots = {};

    // Loop through each day in the availabilityData and categorize the slots
    for (const day in availabilityData) {
      const dayIndex = daysInNumber.indexOf(day);
      if (dayIndex !== -1) {
        const slots = Object.values(availabilityData[day]); // Get the array of slots for the day
        const categorizedSlotsForDay = {
          morning: [],
          afternoon: [],
          evening: [],
          night: [],
        };

        // Loop through each slot and categorize it based on the "from" and "to" values
        slots.forEach(slot => {
          console.log(slot)
          const fromTime = parseInt(slot.from.split(':')[0]);
          const toTime = parseInt(slot.to.split(':')[0]);

          if (fromTime >= 6 && fromTime < 12) {
            categorizedSlotsForDay.morning.push(`${slot.from} to ${slot.to}`);
          } else if (fromTime >= 12 && toTime < 18) {
            categorizedSlotsForDay.afternoon.push(`${slot.from} to ${slot.to}`);
          } else if (fromTime >= 18 && toTime < 24) {
            categorizedSlotsForDay.evening.push(`${slot.from} to ${slot.to}`);
          } else {
            categorizedSlotsForDay.night.push(`${slot.from} to ${slot.to}`);
          }
        });

        categorizedSlots[day] = categorizedSlotsForDay;
      }
    }

    return categorizedSlots;
  };
  console.log(selectedDate, 'selected date');
  useEffect(() => {
    async function fetchAvailabilityData() {
      try {
        const response = await axios.post(
          `https://customdemowebsites.com/dbapi/availability/dr/${item.id}`,
          {
            week_date: selectedDate,
          },
        );
        // console.log(response.data);
        const categorizedSlots = processAvailabilityData(response.data.detail);
        console.log(categorizedSlots)
        setAvailabilityData(categorizedSlots);
        // setAvailabilityData(response.data.detail);
        setSelectedTimefrom(null);
        setSelectedTimeTo(null);
      } catch (err) {
        console.log(err, 'err');
        setMessage(`No Availibility found on ${selectedDate} date`);
      }
    }

    fetchAvailabilityData();
  }, [selectedDate]);
  // console.log(availabilityData)
  // console.log(selectedDate)
  // console.log(selectedTime)
  console.log(visitId);

  const handleDoneButtonPress = async () => {
    if (selectedDate && selectedTimefrom && selectedTimeTo) {
      try {
        // Prepare the visit data...
        const selectedDay = daysInNumber[selectedDayIndex]; // Get the full day name based on the selectedDayIndex

        navigation.navigate('DoctorDetail', {
          item: item,
          selectedDate: selectedDate, // Pass the selectedDate
          selectedTimefrom: selectedTimefrom, // Pass the selectedTime
          selectedTimeTo: selectedTimeTo, // Pass the selectedTime
          docData: data,
          visitId: visitId,
          selectedDay: selectedDay,
        });

        // }
      } catch (err) {
        // Handle any errors that occur during the API call
        console.log(err);
        // You can show a generic error message to the user here if needed
      }
    } else {
      Alert.alert('Please Select a Time');
    }
  };
  // console.log(id)

  return (
    <View style={styles.container}>
      <View>
        <MyStatusBar backgroundColor="transparent" />
        <Header
          image={<BackBtn />}
          handlePress={() => {
            navigation.goBack();
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            alignItems: 'flex-start',
            marginVertical: responsiveScreenHeight(1.5),
          }}>
          <Avatar.Image
            size={64}
            source={{uri: `https://customdemowebsites.com/dbapi/${data.img}`}}
          />
          <View style={{gap: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <Text style={{color: '#172331', fontFamily: 'Raleway-Bold'}}>
                Dr {data.f_name}
              </Text>
              <Image source={require('../assets/assets/verified.png')} />
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Text
                style={{
                  color: '#172331',
                  fontSize: 12,
                  fontFamily: 'Raleway-SemiBold',
                }}>
                {data.profession}
              </Text>
              <View style={styles.dotCircle} />
              <Text
                style={{
                  color: '#172331',
                  fontSize: 12,
                  fontFamily: 'Raleway-SemiBold',
                }}>
                {data.experience}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                <Image source={require('../assets/assets/star.png')} />
                <Text
                  style={{
                    color: '#172331',
                    fontFamily: 'Raleway-SemiBold',
                    fontSize: 12,
                  }}>
                  {data.avg_rating}
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
                  {data.address}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          {/* <Text style={styles.day}>{daysInNumber[dayInNumber]}</Text>
      <Text style={styles.date}>{day}</Text> */}
          <View style={{flexDirection: 'row', gap: 5}}>
            {daysInNumber.map((day, index) => {
              const futureDate = new Date(startOfWeek);
              futureDate.setDate(startOfWeek.getDate() + index);

              const dayNumber = futureDate.getDate();

              const isSelected =
                selectedDayIndex === index || isToday(futureDate); // Check if it's today's date
              const style = isSelected
                ? {
                    ...calendarContainerSelectedStyle,
                    backgroundColor: '#4464D9',
                  } // Apply the background color for today
                : calendarContainerStyle;
              const dayTextStyleToApply = isSelected
                ? daySelectedTextStyle
                : dayTextStyle;
              const dateTextStyleToApply = isSelected
                ? dateSelectedTextStyle
                : dateTextStyle;

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.calendarContainer, style]}
                  onPress={() => handleDayPress(index)}>
                  <Text style={dayTextStyleToApply}>{day.charAt(0)}</Text>
                  <Text style={dateTextStyleToApply}>{dayNumber}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* {Object.keys(availabilityData).map((day, index) => (
            <View key={index}>
        
              {availabilityData[day].morning &&
                availabilityData[day].morning.length > 0 && (
                  <>
                    <View style={styles.row}>
                      <MorningICon />
                      <Text style={styles.sectionTitle}>Morning</Text>
                    </View>
                    <View style={styles.timeContainer}>
                      {availabilityData[day].morning.map(
                        (timeSlot, slotIndex) => {
                          const [startTime, endTime] = timeSlot.split(' - ');

                          return (
                            <View
                              key={slotIndex}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <TouchableOpacity
                                style={[
                                  styles.timeButton,
                                  (selectedTime === startTime ||
                                    selectedTime === endTime) &&
                                    styles.timeButtonSelected,
                                ]}
                                onPress={() => handleTimePress(startTime)}>
                                <Text
                                  style={[
                                    styles.timeText,
                                    (selectedTime === startTime ||
                                      selectedTime === endTime) &&
                                      styles.timeTextSelected,
                                  ]}>
                                  {startTime}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.timeButton,
                                  (selectedTime === startTime ||
                                    selectedTime === endTime) &&
                                    styles.timeButtonSelected,
                                ]}
                                onPress={() => handleTimePress(endTime)}>
                                <Text
                                  style={[
                                    styles.timeText,
                                    (selectedTime === startTime ||
                                      selectedTime === endTime) &&
                                      styles.timeTextSelected,
                                  ]}>
                                  {endTime}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        },
                      )}
                    </View>
                  </>
                )}

              {availabilityData[day].afternoon &&
                availabilityData[day].afternoon.length > 0 && (
                  <>
                    <View style={styles.row}>
                      <NoonICon />
                      <Text style={styles.sectionTitle}>Afternoon</Text>
                    </View>
                    <View style={styles.timeContainer}>
                      {availabilityData[day].afternoon.map(
                        (timeSlot, slotIndex) => {
                          const [startTime, endTime] = timeSlot.split(' - ');

                          return (
                            <TouchableOpacity
                              key={slotIndex}
                              style={[
                                styles.timeButton,
                                selectedTime === startTime &&
                                  styles.timeButtonSelected,
                              ]}
                              onPress={() => handleTimePress(startTime)}>
                              <Text
                                style={[
                                  styles.timeText,
                                  selectedTime === startTime &&
                                    styles.timeTextSelected,
                                ]}>
                                {startTime}
                              </Text>
                            </TouchableOpacity>
                          );
                        },
                      )}
                    </View>
                  </>
                )}

              {availabilityData[day].evening &&
                availabilityData[day].evening.length > 0 && (
                  <>
                    <View style={styles.row}>
                      <EveningICon />
                      <Text style={styles.sectionTitle}>Evening</Text>
                    </View>
                    <View style={styles.timeContainer}>
                      {availabilityData[day].evening.map(
                        (timeSlot, slotIndex) => {
                          const [startTime, endTime] = timeSlot.split(' - ');

                          return (
                            <View
                              key={slotIndex}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <TouchableOpacity
                                style={[
                                  styles.timeButton,
                                  selectedTime === startTime &&
                                    styles.timeButtonSelected,
                                ]}
                                onPress={() => handleTimePress(startTime)}>
                                <Text
                                  style={[
                                    styles.timeText,
                                    selectedTime === startTime &&
                                      styles.timeTextSelected,
                                  ]}>
                                  {startTime}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.timeButton,
                                  selectedTime === endTime &&
                                    styles.timeButtonSelected,
                                ]}
                                onPress={() => handleTimePress(endTime)}>
                                <Text
                                  style={[
                                    styles.timeText,
                                    selectedTime === endTime &&
                                      styles.timeTextSelected,
                                  ]}>
                                  {endTime}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        },
                      )}
                    </View>
                  </>
                )}

              {availabilityData[day].night &&
                availabilityData[day].night.length > 0 && (
                  <>
                    <View style={styles.row}>
                      <EveningICon />
                      <Text style={styles.sectionTitle}>Night</Text>
                    </View>
                    <View style={styles.timeContainer}>
                      {availabilityData[day].night.map(
                        (timeSlot, slotIndex) => {
                          const [startTime, endTime] = timeSlot.split(' - ');

                          return (
                            <View
                              key={slotIndex}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <TouchableOpacity
                                style={[
                                  styles.timeButton,
                                  selectedTime === startTime &&
                                    styles.timeButtonSelected,
                                ]}
                                onPress={() => handleTimePress(startTime)}>
                                <Text
                                  style={[
                                    styles.timeText,
                                    selectedTime === startTime &&
                                      styles.timeTextSelected,
                                  ]}>
                                  {startTime}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.timeButton,
                                  selectedTime === endTime &&
                                    styles.timeButtonSelected,
                                ]}
                                onPress={() => handleTimePress(endTime)}>
                                <Text
                                  style={[
                                    styles.timeText,
                                    selectedTime === endTime &&
                                      styles.timeTextSelected,
                                  ]}>
                                  {endTime}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        },
                      )}
                    </View>
                  </>
                )}
            </View>
          ))} */}

          {Object.keys(availabilityData).length > 0 ? (
            Object.keys(availabilityData).map((day, index) => (
              <View key={index}>
                {/* Render the day */}
                {/* ...

        {/* Conditionally render slots */}
                {['morning', 'afternoon', 'evening', 'night'].map(slotType => {
                  const timeSlots = availabilityData[day][slotType];
                  if (timeSlots && timeSlots.length > 0) {
                    return (
                      <>
                        <View style={styles.row}>
                          {slotType === 'morning' && <MorningICon />}
                          {slotType === 'afternoon' && <NoonICon />}
                          {slotType === 'evening' && <EveningICon />}
                          <Text style={styles.sectionTitle}>{slotType}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                          {timeSlots.map((timeSlot, slotIndex) => (
                            // <SlotComponent
                            //   key={slotIndex}
                            //   timeSlot={timeSlot}
                            //   selectedSlot={selectedTimefrom || selectedTimeTo} // Pass selectedTime as selectedSlot
                            //   handleTimePress={handleTimePress}
                            // />
                            <SlotComponent
                            key={slotIndex}
                            timeSlot={timeSlot}
  selectedTimefrom={selectedTimefrom}
  selectedTimeTo={selectedTimeTo}
  handleTimePress={(time, val) => handleTimePress(time, val)}
/>
                          ))}
                        </View>
                      </>
                    );
                  }
                  return null; // Skip rendering if no time slots for this slotType
                })}
              </View>
            ))
          ) : (
            <Text style={styles.dataNotFound}>No Availability found</Text>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              backgroundColor: '#F5F7F9',
              borderRadius: 8,
              alignItems: 'center',
              paddingHorizontal: responsiveScreenWidth(6),
              paddingVertical: responsiveScreenHeight(0),
            }}>
            <View style={styles.row}>
              <View style={styles.circle}>
                <HomeIcon />
              </View>
              <Text
                style={{
                  color: '#172331',
                  fontFamily: 'Raleway-Medium',
                  fontSize: 14,
                }}>
                Visit charges
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Raleway-Bold',
                  fontSize: 14,
                  color: '#172331',
                }}>
                ₹{data.fee}
              </Text>
              <Text
                style={{
                  fontFamily: 'Raleway-Medium',
                  fontSize: 12,
                  color: '#172331',
                }}>
                Fees
              </Text>
            </View>
          </View>

          <View>
            {/* <ReviewComponent/> */}
            {/* <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center" , gap: 10,}}>
        <Text  onPress={() => {
        navigation.navigate("DoctorDetail");
      }} style={{color:"#0D1927", fontFamily:"Raleway-SemiBold", fontSize: 16}}>See all reviews</Text>
        <ArrowOutward />
    </View> */}
          </View>
          {/* <CustomButtom
    title="Continue"
    onPress={()=> navigation.navigate("DoctorDetail")}
    /> */}
        </View>
      </View>
      {/* <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
        navigation.navigate("DoctorDetail");
      }}>
          <View style={styles.button}>
            <Text style={{fontSize:16, color:"#fff", fontFamily:"PlusJakartaSans-Bold"}}>Done</Text>
          </View>
        </TouchableOpacity> */}
      <TouchableOpacity style={{marginTop: 10}} onPress={handleDoneButtonPress}>
        <View style={styles.button}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            Done
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SlotComponent = ({ timeSlot, selectedTimefrom, selectedTimeTo,  handleTimePress }) => {
  const [startTime, endTime] = timeSlot.split(' to ');
  const isActive = selectedTimefrom === startTime ;
  const isActives =  selectedTimeTo === endTime ;

  return (
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
    <TouchableOpacity
      style={[
        styles.timeButton,
        isActive && styles.timeButtonSelected,
      ]}
      onPress={() => handleTimePress(startTime, "from")}>
      <Text style={[styles.timeText, isActive && styles.timeTextSelected]}>
        {startTime}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.timeButton,
        isActives && styles.timeButtonSelected,
      ]}
      onPress={() => handleTimePress(endTime, "to")}>
      <Text style={[styles.timeText, isActives && styles.timeTextSelected]}>
        {endTime}
      </Text>
    </TouchableOpacity>
  </View>
  );
};

export default DoctorBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: responsiveScreenHeight(6),
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 12,
    color: '#78879A',
    fontFamily: 'Raleway-SemiBold',
  },
  timeContainer: {
    flexDirection: 'row',
    marginBottom: responsiveScreenHeight(0.8),
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: '#4464D9',
    borderWidth: 1,
    marginRight: 10,
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(5),
  },
  timeButtonSelected: {
    backgroundColor: '#4464D9',
  },
  timeText: {
    fontSize: 16,
    color: '#4464D9',
    fontFamily: 'Raleway-SemiBold',
  },
  timeTextSelected: {
    color: 'white',
  },
  dataNotFound: {
    margin: 10,
    textAlign: 'center',
    fontFamily: 'Raleway-SemiBold',
  },
  row: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(1),
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: '#4464D9',
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
