// import { StyleSheet, Text, View } from 'react-native'
// import React,  { useState } from 'react'
// import BackBtn from '../../../assets/assets/icon-button.svg'
// import Calender from '../../../assets/assets/calendar_today.svg'
// import Header from '../../../components/Header'
// import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions'
// import { Divider, TextInput } from 'react-native-paper';
// import { CheckBox } from 'react-native-elements'
// import CustomButtom from '../../../components/Button'
// import MyStatusBar from '../../../components/Statusbar'
// import { useNavigation } from '@react-navigation/native'

// const MyAvailability = () => {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [toggleCheckBox, setToggleCheckBox] = useState(false)

//     const handleCheck = ()=>{
//       setToggleCheckBox(!toggleCheckBox)
//     }
//     const Navigation = useNavigation()

//   return (
//     <View style={styles.container}>
//       <MyStatusBar backgroundColor="transparent"/>
//       <View style={{flexDirection:"row"}}>
//       <Header
//           image={<BackBtn/>}
//           handlePress={()=> Navigation.goBack()}
//           />
//           <View style={ {textAlign:"center", alignSelf:"center", margin:"auto"}}>
//           <Text style={styles.h1}>My Availability</Text>
//           </View>
//           </View>

//           <View style={styles.my}>
//             <Text style={styles.header}>Update your preferred working week days and time</Text>
//           </View>
//           <View style={styles.my4}>
//           <TextInput
//       mode="outlined"
//       label="Week days"
//       placeholder="This Week"
//       theme={{ 
//         roundness: 12,
//         colors:{
//           primary: "#D8D5D3",
//           underlineColor: "#D9D5D3",
//           background:"#fff"
//         }
//        }}
//       right={<TextInput.Affix text="" />}
//     />
//     <Calender style={{position:"absolute", right: 10, top: 32}}/>
//           </View>
//           <View >
//             <View style={{flexDirection:"row", alignItems:"center", gap:5, justifyContent:"flex-start"}}>
//           <CheckBox
//           checked={false}
//           disabled
//           iconType='material-community'
//           checkedIcon="checkbox-outline"
//           uncheckedIcon={'checkbox-blank-outline'}
//           containerStyle={{ marginLeft: 0 , paddingLeft: 0}}  
//          />
//   <Text style={styles.chechboxLabel}>Sunday</Text>
//   </View>
//   <Text style={styles.unavalable}>Unavailable</Text>
//           </View>
//           <Divider style={{marginTop: 10}}/>
//           <View >
//             <View style={{flexDirection:"row", alignItems:"center", gap:5, marginLeft:0}}>
//           <CheckBox
//     checked={toggleCheckBox}
//     onPress={handleCheck}
//     checkedColor='#4464D9'
//     iconType='material-community'
//     uncheckedIcon={'checkbox-blank-outline'}
//     checkedIcon="checkbox-marked"
//     containerStyle={{ marginLeft: 0 , paddingLeft: 0}}  
//   />
//   <Text style={styles.chechboxLabel}>Monday</Text>
//   </View>
//   <View style={[{flexDirection:"row", gap: 10, marginTop: responsiveScreenHeight(1.5), width:responsiveScreenWidth(60), flexWrap: 'wrap'}]}>
//     <View style={styles.timingcard}> 
//         <Text style={styles.timingcardTxt}>9:00am</Text>
//     </View>
//     <View style={styles.line}/>
//     <View style={styles.timingcard}>
//         <Text style={styles.timingcardTxt}>9:30am</Text>
//     </View>
//     <View style={styles.timingcard}> 
//         <Text style={styles.timingcardTxt}>9:00am</Text>
//     </View>
//     <View style={styles.line}/>
//     <View style={styles.timingcard}>
//         <Text style={styles.timingcardTxt}>9:30am</Text>
//     </View>
//   </View>
//           </View>
//           <View style={styles.my4}>
//             <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
//           <CheckBox
//    checkedColor='#4464D9'
//    iconType='material-community'
//    uncheckedIcon={'checkbox-blank-outline'}
//    checkedIcon="checkbox-marked"
//    containerStyle={{ marginLeft: 0 , paddingLeft: 0}}  
//   />
//   <Text style={styles.chechboxLabel}>Tuesday</Text>
//   </View>
//   <View style={[{flexDirection:"row", gap: 10, marginTop: responsiveScreenHeight(1.5), width:responsiveScreenWidth(60), flexWrap: 'wrap'}]}>
//     <View style={styles.timingcard}> 
//         <Text style={styles.timingcardTxt}>9:00am</Text>
//     </View>
//     <View style={styles.line}/>
//     <View style={styles.timingcard}>
//         <Text style={styles.timingcardTxt}>9:30am</Text>
//     </View>
//     <View style={styles.timingcard}> 
//         <Text style={styles.timingcardTxt}>9:00am</Text>
//     </View>
//     <View style={styles.line}/>
//     <View style={styles.timingcard}>
//         <Text style={styles.timingcardTxt}>9:30am</Text>
//     </View>
//   </View>
//           </View>

//           <View
//           style={{
//             position:"absolute",
//             width: '100%',
//             borderRadius: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#4464D9',
//             // padding: 10,
//             height: responsiveScreenHeight(6.5),
//             left: 20,
//             bottom: responsiveScreenHeight(3)
//           }}>
            
//             <Text style={{fontSize: responsiveScreenFontSize(2),
//     color: '#fff',
//     fontFamily: 'PlusJakartaSans-Bold',}}>Save my availability </Text>
//           </View>
//     </View>
//   )
// }

// export default MyAvailability

// const styles = StyleSheet.create({

//     container:{
//         flex: 1,
//         backgroundColor:"#fff",
//         padding: 20,
//         paddingTop: responsiveScreenHeight(5)
//     },
//     h1: {
//         fontFamily: "Raleway-SemiBold",
//         fontSize: 20,
//         color: "#172331",
//         marginHorizontal: responsiveScreenWidth(15)
//       },
//       my:{
//         marginTop: responsiveScreenHeight(3)
//       },
//       my4:{
//               paddingVertical:responsiveScreenHeight(1.5),
//               borderBottomColor: "#F5F5F5",
//               borderBottomWidth: 1,
//       },
//       header:{
//         fontFamily:"Raleway-Regular",
//         fontSize: 12,
//         color:"#172331"
//       },
//       input:{
//         borderColor: "#D8D5D3"
//       },
//       chechboxLabel:{
//         color: "#172331",
//         fontFamily: "Raleway-SemiBold",
//         fontSize: 16
//       },
//       unavalable:{
//         fontFamily:"Raleway-Regular",
//         fontSize: 14,
//         color: "#172331",
//         marginTop: responsiveScreenHeight(1.5),
//         lineHeight: 20
//       },
//       timingcard:{
//         borderColor:"#D8D5D3",
//         borderWidth:1,
//         borderRadius:8,
//         width:responsiveScreenWidth(20),
//         height: responsiveScreenHeight(5),
//         alignItems:"center",
//         justifyContent:"center"
//       },
//       timingcardTxt:{
//         fontFamily:"Raleway-Medium",
//         fontSize: 10,
//         color:"#172331"
//       },
//       line:{
//         width: 5
//       }
// })

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,  { useEffect, useState } from 'react'
import BackBtn from '../../../assets/assets/icon-button.svg'
import Calender from '../../../assets/assets/calendar_today.svg'
import Chechbox from '../../../assets/assets/Checkbox.svg'
import Header from '../../../components/Header'
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions'
import { Divider, TextInput } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import CustomButtom from '../../../components/Button'
import MyStatusBar from '../../../components/Statusbar'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import axios from 'axios'

const MyAvailability = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const user = useSelector(state => state.doctorAccount)
    const [availabilityData, setAvailabilityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [avaId, setAvaId] = useState(null)

  useEffect(() => {
    // Get the current date and format it to 'dd-mm-yyyy' format
    const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
// console.log(formattedDate);

    setSelectedDate(formattedDate); // Set the current date as the initial selected date
  }, []);
  const handleDateChange = (date) => {
    console.log(date)
    setSelectedDate(date);
  };
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);

  //     try {
  //       const response = await axios.post(
  //         `https://customdemowebsites.com/dbapi/availability/dr/${user.id}`,
  //         {
  //           week_date: selectedDate,
  //         }
  //       );

  //       // ... (rest of the code)

  //       setAvailabilityData(transformedData);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setAvailabilityData([]); // Reset the availabilityData state to an empty array
  //       setIsLoading(false);
  //     }
  //   };

  //   if (selectedDate) {
  //     fetchData();
  //   }
  // }, [selectedDate, user.id]);

    const handleCheck = ()=>{
      setToggleCheckBox(!toggleCheckBox)
    }
    const Navigation = useNavigation()
    useEffect(() => {
      async function fetchData() {
       
          try {
            const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}`;
        console.log(formattedDate)
            const response = await axios.post(`https://customdemowebsites.com/dbapi/availability/dr/${user.id}`, {
              week_date: selectedDate,
            });
            console.log(response.data.id)
            const transformedData = Object.entries(response.data.detail).map(([day, slots]) => ({
              day,
              slots: Object.values(slots),
            }));
            // console.log(response.data)
            setAvailabilityData(transformedData);
            setAvaId(response.data.id)
            setIsLoading(false);
          } catch (err) {
            console.log(err);
            setIsLoading(false);
          }
      }
    
      fetchData();
    }, [selectedDate, user.id]);
    const handleSlotChange = (day, index, field, value) => {
      // Make a copy of the availability data
      const updatedData = [...availabilityData];
      
      // Update the specific slot with the new value
      updatedData.forEach((item) => {
        if (item.day === day) {
          item.slots[index][field] = value;
        }
      });
    
      // Set the updated data to the state
      setAvailabilityData(updatedData);
    };
    const handleSaveAvailability = async () => {
      try {
        const availabilityDataToSend = {
          dr_id: user.id,
          week_date: selectedDate,
          detail: {},
        };
    
        // Loop through each item in the availabilityData array
        availabilityData.forEach((item) => {
          // Get the day and slots from the item
          const { day, slots } = item;
    
          // Create an object to store the slots for the current day
          const slotsData = {};
    
          // Loop through each slot in the slots array
          slots.forEach((slot, index) => {
            // Get the from and to values for the slot
            const { from, to } = slot;
    
            // Add the slot data to the slotsData object
            slotsData[index] = { from, to };
          });
    
          // Add the slotsData object to the availabilityDataToSend object with the day as the key
          availabilityDataToSend.detail[day] = slotsData;
        });
    
        console.log(availabilityDataToSend);
    
        // Make the API call to update the availability data
       const res =  await axios.put(`https://customdemowebsites.com/dbapi/availability/${avaId}`, availabilityDataToSend);
    console.log(res.data)
        // Show a success notification
        Navigation.navigate("Availibility")
       
      } catch (error) {
        console.log(error);
        // Show an error notification
       
      }
    };
    console.log(avaId)

  return (
<View style={{flex: 1}}>
<ScrollView style={styles.container}>
    <MyStatusBar backgroundColor="transparent"/>
    <View style={{flexDirection:"row"}}>
       <Header
          image={<BackBtn/>}
           handlePress={()=> Navigation.goBack()}
           />
          <View style={ {textAlign:"center", alignSelf:"center", margin:"auto"}}>
          <Text style={styles.h1}>My Availability</Text>
          </View>
          </View>
          <View style={styles.my}>
            <Text style={styles.header}>Update your preferred working week days and time</Text>
           </View>
          <View style={styles.my4}>
          <TextInput
          value={selectedDate} // Set the value of the input field to the selected date
          onChangeText={handleDateChange} 
       mode="outlined"
      label="Week days"
       placeholder="This Week"
       theme={{ 
         roundness: 12,
        colors:{
          primary: "#D8D5D3",
          underlineColor: "#D9D5D3",
          background:"#fff"
        }
       }}
      right={<TextInput.Affix text="" />}
    />
    <Calender style={{position:"absolute", right: 10, top: 32}}/>
          </View>

  {isLoading ? (
    <Text>Loading...</Text>
  ) : availabilityData.length > 0 ? (
    availabilityData.map((item, index) => (
      <ScrollView>
      <View key={index}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Chechbox/>
          
          <Text style={styles.chechboxLabel}>{item.day}</Text>
        </View>

       <View style={styles.slotContainer}>
  {item.slots.map((slot, index) => (
    <View key={index} style={styles.slot}>
      <View style={styles.timingcard}>
        <Text style={styles.timingcardTxt}>From:</Text>
        <TextInput
          style={styles.timeInput}
          value={slot.from}
          onChangeText={(value) => handleSlotChange(item.day, index, 'from', value)}
        />
      </View>
      <View style={styles.timingcard}>
        <Text style={styles.timingcardTxt}>To:</Text>
        <TextInput
          style={styles.timeInput}
          value={slot.to}
          onChangeText={(value) => handleSlotChange(item.day, index, 'to', value)}
        />
      </View>
    </View>
  ))}
</View>
      </View>
      </ScrollView>
    ))
  ) : (
    <Text>No availability data available</Text>
  )}
  </ScrollView>
  {/* ... */}
  <TouchableOpacity
  onPress={handleSaveAvailability}
          style={{
            position:"absolute",
            width: responsiveScreenWidth(90),
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4464D9',
            // padding: 10,
            height: responsiveScreenHeight(6.5),
            left: 20,
            bottom: responsiveScreenHeight(0),
          }}>
            
            <Text style={{fontSize: responsiveScreenFontSize(2),
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',}}>Save my availability </Text>
          </TouchableOpacity>
          </View>
  )
}

export default MyAvailability

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:"#fff",
        padding: 20,
        paddingTop: responsiveScreenHeight(5)
    },
    h1: {
        fontFamily: "Raleway-SemiBold",
        fontSize: 20,
        color: "#172331",
        marginHorizontal: responsiveScreenWidth(15)
      },
      my:{
        marginTop: responsiveScreenHeight(3)
      },
      my4:{
              paddingVertical:responsiveScreenHeight(1.5),
              borderBottomColor: "#F5F5F5",
              borderBottomWidth: 1,
      },
      header:{
        fontFamily:"Raleway-Regular",
        fontSize: 12,
        color:"#172331"
      },
      input:{
        borderColor: "#D8D5D3"
      },
      chechboxLabel:{
        color: "#172331",
        fontFamily: "Raleway-SemiBold",
        fontSize: 16
      },
      unavalable:{
        fontFamily:"Raleway-Regular",
        fontSize: 14,
        color: "#172331",
        marginTop: responsiveScreenHeight(1.5),
        lineHeight: 20
      },
      timingcard:{
        borderColor:"#D8D5D3",
        borderWidth:1,
        borderRadius:8,
        width:responsiveScreenWidth(20),
        height: responsiveScreenHeight(5),
        alignItems:"center",
        justifyContent:"center"
      },
      timingcardTxt:{
        fontFamily:"Raleway-Medium",
        fontSize: 10,
        color:"#172331",
      },
      line:{
        width: 5
      },
      slotContainer: {
        marginTop: responsiveScreenHeight(1.5),
        width: responsiveScreenWidth(60),
        flexWrap: 'wrap',
        gap: 10,
        marginBottom:responsiveScreenHeight(1.5)
      },
      slot: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      },
      timingcard: {
        borderColor: '#D8D5D3',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      timingcardTxt: {
        fontFamily: 'Raleway-Medium',
        fontSize: 10,
        color: '#172331',
      },
      timeInput: {
        fontFamily: 'Raleway-Medium',
        fontSize: 14,
        color: '#172331',
        backgroundColor: "#fff",
        textAlign: 'center',
        padding: 0,
        width:responsiveScreenWidth(42),
      },
}) 