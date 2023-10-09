// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
// // import DatePicker from 'react-native-datepicker';
// // import axios from 'axios';
// // import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

// // // const daysOfWeek = [
// // //   'Monday',
// // //   'Tuesday',
// // //   'Wednesday',
// // //   'Thursday',
// // //   'Friday',
// // //   'Saturday',
// // //   'Sunday',
// // // ];

// // // const AddAvailability = () => {
// // //   const [availabilityData, setAvailabilityData] = useState({
// // //     dr_id: 16,
// // //     detail: {
// // //       Monday: {},
// // //       Tuesday: {},
// // //       Wednesday: {},
// // //       Thursday: {},
// // //       Friday: {},
// // //       Saturday: {},
// // //       Sunday: {},
// // //     },
// // //     week_date: null,
// // //   });
// // //   const [selectedDay, setSelectedDay] = useState(daysOfWeek[new Date().getDay()]);
// // //   const [newSlotFrom, setNewSlotFrom] = useState('');
// // //   const [newSlotTo, setNewSlotTo] = useState('');

// // //   const formatDate = (date) => {
// // //     console.log(date)
// // //     const year = date.getFullYear();
// // //     console.log(year)
// // //     const month = date.getMonth() + 1;
// // //     const day = date.getDate();
// // //     const res = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
// // //     console.log(res)
// // //     return res
// // //   };

// // //   const calculateWeekDates = (selectedDate) => {
// // //     console.log(selectedDate)
// // //     const startOfWeek = new Date(selectedDate);
// // //     startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Get the starting date of the week (Sunday)
// // //     const endOfWeek = new Date(selectedDate);
// // //     endOfWeek.setDate(selectedDate.getDate() + (6 - selectedDate.getDay())); // Get the ending date of the week (Saturday)

// // //     // Update the availabilityData with the calculated week start and end dates
// // //     setAvailabilityData({
// // //       ...availabilityData,
// // //       week_date: formatDate(selectedDate),
// // //     });

// // //     // Update the selected day based on the selected date
// // //     setSelectedDay(daysOfWeek[selectedDate.getDay()]);
// // //   };

// // //   const addNewSlot = () => {
// // //     // Validate inputs
// // //     if (newSlotFrom.trim() === '' || newSlotTo.trim() === '') {
// // //       // Show an error message or alert
// // //       return;
// // //     }

// // //     const updatedAvailabilityData = { ...availabilityData };

// // //     if (!updatedAvailabilityData.detail[selectedDay]) {
// // //       updatedAvailabilityData.detail[selectedDay] = {};
// // //     }

// // //     const slotCount = Object.keys(updatedAvailabilityData.detail[selectedDay]).length;
// // //     updatedAvailabilityData.detail[selectedDay][slotCount] = {
// // //       from: newSlotFrom,
// // //       to: newSlotTo,
// // //     };

// // //     setAvailabilityData(updatedAvailabilityData);

// // //     // Clear the inputs after adding the slot
// // //     setNewSlotFrom('');
// // //     setNewSlotTo('');
// // //   };

// // //   const updateSelectedDay = (day) => {
// // //     // Validate if the provided day is a valid day of the week
// // //     if (daysOfWeek.includes(day)) {
// // //       setSelectedDay(day);
// // //     }
// // //   };

// // //   const submitAvailabilityData = () => {
// // //     // Send availabilityData to the API
// // //     axios.post('https://customdemowebsites.com/dbapi/availability', availabilityData)
// // //       .then((response) => {
// // //         // Handle successful API response
// // //         console.log('Data successfully saved:', response.data);
// // //       })
// // //       .catch((error) => {
// // //         // Handle error
// // //         console.error('Error saving data:', error);
// // //       });
// // //   };

// // //   const renderSlotItem = ({ item }) => (
// // //     <TouchableOpacity
// // //       onPress={() => {}}
// // //       style={{ padding: 10, backgroundColor: '#5cb85c' }}
// // //     >
// // //       <Text style={{ color: 'white' }}>
// // //         {selectedDay} - {item.from} to {item.to}
// // //       </Text>
// // //     </TouchableOpacity>
// // //   );
// // //   console.log(availabilityData.week_date)
// // //   console.log(selectedDay)

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text>Add Availability</Text>
// // //       <View style={styles.datePickerContainer}>
// // //         <DatePicker
// // //           style={styles.datePicker}
// // //           date={availabilityData.week_date}
// // //           mode="date"
// // //           placeholder="Select week date"
// // //           format="DD-MM-YYYY"
// // //           confirmBtnText="Confirm"
// // //           cancelBtnText="Cancel"
// // //           onDateChange={(date) => {
// // //             console.log(date)
// // //             const selectedDate = new Date(date);
// // //             calculateWeekDates(selectedDate);
// // //           }}
// // //         />
// // //       </View>
// // //       {availabilityData.week_date && (
// // //         <>
// // //           <Text>Selected Week Date: {availabilityData.week_date}</Text>
// // //           <View style={styles.my4}>
// // //             <TextInput
// // //               placeholder="Enter day of the week (e.g., Monday)"
// // //               value={selectedDay}
// // //               onChangeText={updateSelectedDay}
// // //             />
// // //             <FlatList
// // //               data={Object.values(availabilityData.detail[selectedDay])}
// // //               renderItem={renderSlotItem}
// // //               keyExtractor={(slot, index) => index.toString()}
// // //             />
// // //           </View>
// // //           <View style={styles.timeSlotsContainer}>
// // //             <TextInput
// // //               placeholder="From"
// // //               value={newSlotFrom}
// // //               onChangeText={(text) => setNewSlotFrom(text)}
// // //               style={styles.timeSlotInput}
// // //             />
// // //             <TextInput
// // //               placeholder="To"
// // //               value={newSlotTo}
// // //               onChangeText={(text) => setNewSlotTo(text)}
// // //               style={styles.timeSlotInput}
// // //             />
// // //             <TouchableOpacity onPress={addNewSlot} style={styles.addButton}>
// // //               <Text style={styles.addButtonLabel}>Add Slot</Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         </>
// // //       )}
// // //       <TouchableOpacity onPress={submitAvailabilityData} style={styles.submitButton}>
// // //         <Text style={styles.submitButtonLabel}>Submit Availability</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // };

// // // export default AddAvailability;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     padding: 20,
// //     paddingTop: responsiveScreenHeight(6),
// //   },
// //   datePickerContainer: {
// //     borderColor: 'gray',
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     overflow: 'hidden',
// //     marginBottom: 10,
// //   },
// // //   datePicker: {
// // //     width: '100%',
// // //   },
// //   my4: {
// //     paddingVertical: responsiveScreenHeight(1.5),
// //     borderBottomColor: '#F5F5F5',
// //     borderBottomWidth: 1,
// //     marginBottom: 10,
// //   },
// //   timeSlotsContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   timeSlotInput: {
// //     flex: 1,
// //     padding: 10,
// //     borderColor: 'gray',
// //     borderWidth: 1,
// //     marginRight: 5,
// //   },
// //   addButton: {
// //     padding: 10,
// //     backgroundColor: '#007bff',
// //     borderRadius: 8,
// //   },
// //   addButtonLabel: {
// //     color: 'white',
// //   },
// //   submitButton: {
// //     padding: 10,
// //     backgroundColor: '#007bff',
// //     borderRadius: 8,
// //     marginTop: 10,
// //     alignItems: 'center',
// //   },
// //   submitButtonLabel: {
// //     color: 'white',
// //   },
// // });



// // // import React, { useState } from 'react';
// // // import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
// // // import DatePicker from 'react-native-datepicker';
// // // import axios from 'axios';

// // // const daysOfWeek = [
// // //   'Monday',
// // //   'Tuesday',
// // //   'Wednesday',
// // //   'Thursday',
// // //   'Friday',
// // //   'Saturday',
// // //   'Sunday',
// // // ];

// // // const AddAvailibility = () => {
// // //     const [availabilityData, setAvailabilityData] = useState({
// // //         dr_id: 16,
// // //         detail: {
// // //           Monday: {},
// // //           Tuesday: {},
// // //           Wednesday: {},
// // //           Thursday: {},
// // //           Friday: {},
// // //           Saturday: {},
// // //           Sunday: {},
// // //         },
// // //         week_date: null,
// // //       });
// // //       const [selectedDay, setSelectedDay] = useState(daysOfWeek[new Date().getDay()]);
// // //       const [newSlotFrom, setNewSlotFrom] = useState('');
// // //       const [newSlotTo, setNewSlotTo] = useState('');
// // //       const formatDateDDMMYYYY = (date) => {
// // //         const day = date.getDate();
// // //         const month = date.getMonth() + 1;
// // //         const year = date.getFullYear();
// // //         return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
// // //       };
// // //       const calculateWeekDates = (selectedDate) => {
// // //         const startOfWeek = new Date(selectedDate);
// // //         startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Get the starting date of the week (Sunday)
// // //         const endOfWeek = new Date(selectedDate);
// // //         endOfWeek.setDate(selectedDate.getDate() + (6 - selectedDate.getDay())); // Get the ending date of the week (Saturday)
      
// // //         // Update the availabilityData with the calculated week start and end dates
// // //         setAvailabilityData({
// // //           ...availabilityData,
// // //           week_date: formatDateDDMMYYYY(startOfWeek),
// // //         });
      
// // //         // Update the selected day based on the selected date
// // //         setSelectedDay(daysOfWeek[selectedDate.getDay()]);
// // //       };
    
// // //       const addNewSlot = () => {
// // //         // Validate inputs
// // //         if (newSlotFrom.trim() === '' || newSlotTo.trim() === '') {
// // //           // Show an error message or alert
// // //           return;
// // //         }
    
// // //         const updatedAvailabilityData = { ...availabilityData };
    
// // //         if (!updatedAvailabilityData.detail[selectedDay]) {
// // //           updatedAvailabilityData.detail[selectedDay] = {};
// // //         }
    
// // //         const slotCount = Object.keys(updatedAvailabilityData.detail[selectedDay]).length;
// // //         updatedAvailabilityData.detail[selectedDay][slotCount] = {
// // //           from: newSlotFrom,
// // //           to: newSlotTo,
// // //         };
    
// // //         setAvailabilityData(updatedAvailabilityData);
    
// // //         // Clear the inputs after adding the slot
// // //         setNewSlotFrom('');
// // //         setNewSlotTo('');
// // //       };
    
// // //       const updateSelectedDay = (day) => {
// // //         // Validate if the provided day is a valid day of the week
// // //         if (daysOfWeek.includes(day)) {
// // //           setSelectedDay(day);
// // //         }
// // //       };
    
// // //       const submitAvailabilityData = () => {
// // //         // Send availabilityData to the API
// // //         axios
// // //           .post('https://customdemowebsites.com/dbapi/availability/add', availabilityData)
// // //           .then((response) => {
// // //             // Handle successful API response
// // //             console.log('Data successfully saved:', response.data);
// // //           })
// // //           .catch((error) => {
// // //             // Handle error
// // //             console.error('Error saving data:', error);
// // //           });
// // //       };
    
// // //       const renderSlotItem = ({ item }) => (
// // //         <TouchableOpacity
// // //           onPress={() => {}}
// // //           style={{ padding: 10, backgroundColor: '#5cb85c' }}
// // //         >
// // //           <Text style={{ color: 'white' }}>
// // //             {selectedDay} - {item.from} to {item.to}
// // //           </Text>
// // //         </TouchableOpacity>
// // //       );
    
    
// // //   console.log(availabilityData)

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text>Doctor Availability Screen</Text>
// // //       <DatePicker
// // //         style={{ width: "100%", borderColor: 'gray', borderWidth: 1 }}
// // //         date={availabilityData.week_date}
// // //         mode="date"
// // //         placeholder="Select week date"
// // //         format="YYYY-MM-DD" // Use ISO format for correct parsing
// // //         confirmBtnText="Confirm"
// // //         cancelBtnText="Cancel"
// // //         onDateChange={(date) => {
// // //           const selectedDate = new Date(date);
// // //           calculateWeekDates(selectedDate);
// // //         }}
// // //       />
// // //       {availabilityData.week_date && (
// // //         <>
// // //           <Text>Selected Week Date: {availabilityData.week_date}</Text>
// // //           <View style={{ flexDirection: 'column', gap: 30, alignItems: 'center' }}>
// // //             <TextInput
// // //               placeholder="Enter day of the week (e.g., Monday)"
// // //               value={selectedDay}
// // //               onChangeText={updateSelectedDay}
// // //               style={{
// // //                 flex: 1,
// // //                 padding: 10,
// // //                 borderColor: 'gray',
// // //                 borderWidth: 1,
// // //                 marginRight: 10,
// // //               }}
// // //             />
// // //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
// // //               <TextInput
// // //                 placeholder="From"
// // //                 value={newSlotFrom}
// // //                 onChangeText={(text) => setNewSlotFrom(text)}
// // //                 style={{
// // //                   padding: 10,
// // //                   borderColor: 'gray',
// // //                   borderWidth: 1,
// // //                   marginRight: 10,
// // //                 }}
// // //               />
// // //               <TextInput
// // //                 placeholder="To"
// // //                 value={newSlotTo}
// // //                 onChangeText={(text) => setNewSlotTo(text)}
// // //                 style={{
// // //                   padding: 10,
// // //                   borderColor: 'gray',
// // //                   borderWidth: 1,
// // //                   marginRight: 10,
// // //                 }}
// // //               />
// // //               <TouchableOpacity
// // //                 onPress={addNewSlot}
// // //                 style={{ padding: 10, backgroundColor: '#007bff' }}
// // //               >
// // //                 <Text style={{ color: 'white' }}>Add Slot</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           </View>
// // //           {availabilityData.detail[selectedDay] && (
// // //             <FlatList
// // //               data={Object.values(availabilityData.detail[selectedDay])}
// // //               renderItem={renderSlotItem}
// // //               keyExtractor={(item, index) => index.toString()}
// // //             />
// // //           )}
// // //         </>
// // //       )}
// // //       <TouchableOpacity
// // //         onPress={submitAvailabilityData}
// // //         style={{ padding: 10, backgroundColor: '#007bff', marginTop: 10 }}
// // //       >
// // //         <Text style={{ color: 'white' }}>Submit Availability</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // };


// // export default AddAvailibility;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Alert} from 'react-native';
// import BackBtn from '../../../assets/assets/icon-button.svg';
// import Calender from '../../../assets/assets/calendar_today.svg';
// import Checkbox from '../../../assets/assets/Checkbox.svg';
// import Uncheckbox from '../../../assets/assets/uncheckbox.svg';
// import Header from '../../../components/Header';
// import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
// import { Divider, TextInput } from 'react-native-paper';
// import { CheckBox } from 'react-native-elements';
// import CustomButtom from '../../../components/Button';
// import MyStatusBar from '../../../components/Statusbar';
// import { useNavigation } from '@react-navigation/native';
// import DatePicker from 'react-native-date-picker';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { DateTimePicker } from 'react-native-paper-dates';
// import { updateAvailability } from '../../Redux/Reducer/availabilitySlice';
// // import { TouchableOpacity } from 'react-native-gesture-handler';


// const AddAvailability = () => {
//   const [availabilityData, setAvailabilityData] = useState({});
//   const [selectedWeek, setSelectedWeek] = useState('');
//   const [date, setDate] = useState(new Date())
//   const [open, setOpen] = useState(false)
//   const [check, setCheck] = useState({}); 
//   const dispatch = useDispatch()
//   const user = useSelector(state => state.doctorAccount)
//   const availabibilityData = useSelector(state => state.availability)
//   console.log(availabibilityData)
//   console.log(user.id)
//   const Navigation = useNavigation();

//   // Mock API response, replace this with the actual API call to fetch availability data
//   useEffect(() => {
//     // Replace this with your API call to fetch availability data for the doctor
//     const availabilityApiResponse = {
//       // Data here...
//     };

//     // Initialize availabilityData with all weekdays
//     const initialAvailabilityData = {
//       Monday: { status: false, timings: [] },
//       Tuesday: { status: false, timings: [] },
//       Wednesday: { status: false, timings: [] },
//       Thursday: { status: false, timings: [] },
//       Friday: { status: false, timings: [] },
//       Saturday: { status: false, timings: [] },
//       Sunday: { status: false, timings: [] },
//     };

//     // Merge the fetched data with the initial data (if available)
//     const mergedData = {
//       ...initialAvailabilityData,
//       ...availabilityApiResponse.detail,
//     };

//     setAvailabilityData(mergedData);
//     setSelectedWeek(availabilityApiResponse.week_date);
//   }, []);
//   const handleSaveAvailability = () => {
//     // Create an object to store availability data for each day
//     const availabilityDataToSend = {};
  
//     // Loop through the availabilityData object and extract "from" and "to" values for each day
//     Object.entries(availabilityData).forEach(([day, data]) => {
//       if (data.timings && data.timings.length > 0) {
//         // Extract "from" and "to" values from timings array
//         const timingsToSend = {};
//         data.timings.forEach((timing, index) => {
//           timingsToSend[index] = {
//             from: timing.from,
//             to: timing.to,
//           };
//         });
  
//         // Update the data for each day in the object
//         availabilityDataToSend[day] = timingsToSend;
//       }
//     });
//     console.log(availabilityDataToSend, user);
  
//     // Example data to be sent to the server
//     const data = {
//       dr_id: user.id,
//       detail: availabilityDataToSend,
//       week_date: selectedWeek,
//     };
//     if(!selectedWeek && availabilityDataToSend){
//       return Alert.alert("select values")
//     }
//     dispatch(updateAvailability(availabilityDataToSend));
  
//     // Send the POST request to save the availability data
//     axios
//       .post('https://customdemowebsites.com/dbapi/availability/add', data)
//       .then((response) => {
//         // Handle the response from the server if needed
//         console.log('Availability data saved successfully:', response.data);
//         Alert.alert("Availability data saved successfully")
//       })
//       .catch((error) => {
//         // Handle errors if any
//         console.error('Error saving availability data:', error);
//       });

      
//   };
//   const handleCheck = (day) => {
//     setCheck((prevCheck) => ({
//       ...prevCheck,
//       [day]: !prevCheck[day], // Toggle the checkbox status
//     }));
//     setAvailabilityData((prevData) => {
//       const updatedData = { ...prevData };
//       if (updatedData[day].status) {
//         updatedData[day].timings = [];
//       } else {
//         updatedData[day].timings = [{ from: '', to: '' }];
//       }
//       updatedData[day].status = !prevData[day].status;
//       return updatedData;
//     });
//   };

//   const handleAddTiming = (day) => {
//     setAvailabilityData((prevData) => {
//       const updatedData = { ...prevData };
//       updatedData[day].timings.push({ from: '', to: '' });
//       return updatedData;
//     });
//   };

//   const handleRemoveTiming = (day, index) => {
//     setAvailabilityData((prevData) => {
//       const updatedData = { ...prevData };
//       updatedData[day].timings.splice(index, 1);
//       return updatedData;
//     });
//   };

//   const handleTimingChange = (day, index, field, value) => {
//     setAvailabilityData((prevData) => {
//       const updatedData = { ...prevData };
//       updatedData[day].timings[index][field] = value;
//       return updatedData;
//     });
//   };
//   console.log(selectedWeek)
 

//   // console.log(availabilityData)

 
//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     setSelectedWeek(newDate.toISOString().split('T')[0]); // Extract date portion and set it as a string
//   };
//   console.log(date, selectedWeek)
//   return (
//     <View style={styles.container}>
//     <MyStatusBar backgroundColor="transparent" />
//     <View style={{ flexDirection: "row" }}>
//       <Header
//         image={<BackBtn />}
//         handlePress={() => Navigation.goBack()}
//       />
//       <View style={{ textAlign: "center", alignSelf: "center", margin: "auto" }}>
//         <Text style={styles.h1}>My Availability</Text>
//       </View>
//     </View>

//     <ScrollView>
//       <View style={styles.my}>
//         <Text style={styles.header}>Update your preferred working week days and time</Text>
//       </View>
//       <TouchableOpacity style={[styles.my4, {marginBottom:20}]} onPress={() => setOpen(true)}>
//         <Text>{selectedWeek ? selectedWeek : "Select Week"} </Text>
//       {/* <Button sty title="Open" onPress={() => setOpen(true)} /> */}
//         {/* <DatePicker
//           style={styles.datePicker}
//           date={selectedWeek}
//           mode="date"
//           placeholder="Select Week"
//           format="YYYY-MM-DD"
//           minDate="01-01-2020"
//           maxDate="31-12-2030"
//           confirmBtnText="Confirm"
//           cancelBtnText="Cancel"
//           showIcon={false} 
//           customStyles={{
//             dateInput: {
//               borderWidth: 0,
//               alignItems: 'flex-start',
//             },
//             dateText: {
//               fontSize: 16,
//               color: '#172331',
//               fontFamily: 'Raleway-Medium',
//             },
//           }}
//           onDateChange={(date) => setSelectedWeek(date)}
//         /> */}
//         <DatePicker
//          style={styles.datePicker}
//         modal
//         mode='date'
//         open={open}
//         date={date}
//         onConfirm={(newDate) => {
//           setOpen(false);
//           handleDateChange(newDate);
//         }}
//         onDateChange={(date) => setSelectedWeek(date)}
//         onCancel={() => {
//           setOpen(false)
//         }}
//       />
//         <Calender style={{ position: "absolute", right: 10, top: 12 }} />
//       </TouchableOpacity>

//       {Object.entries(availabilityData).map(([day, data]) => (
//         <View key={day}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'flex-start' }}>
//             {/* <CheckBox
//               checked={data.status === true}
//               onPress={() => handleCheck(day)}
//               checkedColor="#4464D9"
//               iconType="material-community"
//               uncheckedIcon="checkbox-blank-outline"
//               checkedIcon="checkbox-marked"
//               containerStyle={{ marginLeft: 0, paddingLeft: 0 }}
//             /> */}
//             <TouchableOpacity  onPress={() => handleCheck(day)}>
//             {check[day] ?  <Checkbox/> : <Uncheckbox/>}
//             </TouchableOpacity>
//             <Text style={styles.checkboxLabel}>{day}</Text>
//           </View>
//           {data.status === false && <Text style={styles.unavailable}>Unavailable</Text>}
//           {data.status === true && data.timings && (
//             <View>
//               {data.timings.map((timing, index) => (
//                 <View key={index} style={styles.timingContainer}>
//                    {/* <DatePicker
//          style={styles.datePicker}
//         modal
//         mode='time'
//         open={open}
//         date={date}
//         onConfirm={(newDate) => {
//           setOpen(false);
//           handleDateChange(newDate);
//         }}
//         onDateChange={(date) => setSelectedWeek(date)}
//         onCancel={() => {
//           setOpen(false)
//         }}
//       /> */}
//                   <TextInput
//                   style={{width: responsiveScreenWidth(42)}}
//                     mode="outlined"
//                     label="From"
//                     placeholder="09:00am"
//                     value={timing.from}
//                     onChangeText={(text) => handleTimingChange(day, index, 'from', text)}
//                     theme={{
//                       roundness: 12,
//                       colors: {
//                         primary: "#D8D5D3",
//                         underlineColor: "#D9D5D3",
//                         background: "#fff"
//                       }
//                     }}
//                   />
//                   {/* <DatePicker
//               style={{ width: 170 }}
//               date={timing.from}
//               mode="time"
//               placeholder="From"
//               format="hh:mm A"
//               confirmBtnText="Confirm"
//               cancelBtnText="Cancel"
//               showIcon={false} 
//               onDateChange={time =>
//                 handleTimingChange(day, index, 'from', time)
//                 // console.log(time)
//               }
//             /> */}
//              {/* <DatePicker
//               style={{ width: 170 }}
//               date={timing.to}
//               mode="time"
//               placeholder="From"
//               format="hh:mm A"
//               confirmBtnText="Confirm"
//               cancelBtnText="Cancel"
//               showIcon={false} 
//               onDateChange={time =>
//                 handleTimingChange(day, index, 'to', time)
//                 // console.log(time)
//               }
//             /> */}
//                   <TextInput
//                   style={{width: responsiveScreenWidth(42)}}
//                     mode="outlined"
//                     label="To"
//                     placeholder="05:00pm"
//                     value={timing.to}
//                     onChangeText={(text) => handleTimingChange(day, index, 'to', text)}
//                     theme={{
//                       roundness: 12,
//                       colors: {
//                         primary: "#D8D5D3",
//                         underlineColor: "#D9D5D3",
//                         background: "#fff"
//                       }
//                     }}
//                   />
//                   {index === data.timings.length - 1 && (
//                     <CustomButtom title="+" onPress={() => handleAddTiming(day)} />
//                   )}
//                   {index !== data.timings.length - 1 && (
//                     <CustomButtom title="-" onPress={() => handleRemoveTiming(day, index)} />
//                   )}
//                 </View>
//               ))}
//             </View>
//           )}
//           <Divider style={{ marginTop: 10 }} />
//         </View>
//       ))}
//     </ScrollView>

//     <View
//       onPress={handleSaveAvailability}
//       style={{
//         position: "absolute",
//         width: '100%',
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         bottom: 0,
//       }}
//     >
//       {/* <CustomButtom
//         text="Save"
//         onPress={handleSaveAvailability}
//         style={{
//           marginBottom: responsiveScreenHeight(3),
//           marginTop: responsiveScreenHeight(1),
//           width: responsiveScreenWidth(90),
//         }}
//       /> */}
//       <TouchableOpacity
//       onPress={handleSaveAvailability}
//        style={{
//           marginBottom: responsiveScreenHeight(3),
//           marginTop: responsiveScreenHeight(1),
//           width: responsiveScreenWidth(90),
//           padding: 15, backgroundColor: '#007bff',
//           alignItems:'center',borderRadius: 28
//         }}>
//         <Text style={{color: "#fff"}}>Save</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     paddingTop: responsiveScreenHeight(5)
//   },
//   h1: {
//     fontFamily: "Raleway-SemiBold",
//     fontSize: 20,
//     color: "#172331",
//     marginHorizontal: responsiveScreenWidth(15)
//   },
//   my: {
//     marginTop: responsiveScreenHeight(3)
//   },
//   my4: {
//     paddingVertical: responsiveScreenHeight(1.5),
//     borderBottomColor: "#F5F5F5",
//     borderBottomWidth: 1,
//   },
//   header: {
//     fontFamily: "Raleway-Regular",
//     fontSize: 12,
//     color: "#172331"
//   },
//   checkboxLabel: {
//     color: "#172331",
//     fontFamily: "Raleway-SemiBold",
//     fontSize: 16
//   },
//   unavailable: {
//     fontFamily: "Raleway-Regular",
//     fontSize: 14,
//     color: "#172331",
//     marginTop: responsiveScreenHeight(1.5),
//     lineHeight: 20
//   },
//   timingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginTop: responsiveScreenHeight(1.5),
//     flexWrap: 'wrap',
//     marginBottom: 10,
//   },
//   timingcard: {
//     borderColor: "#D8D5D3",
//     borderWidth: 1,
//     borderRadius: 8,
//     width: responsiveScreenWidth(20),
//     height: responsiveScreenHeight(5),
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   timingcardTxt: {
//     fontFamily: "Raleway-Medium",
//     fontSize: 10,
//     color: "#172331"
//   },
// });
// export default AddAvailability
// import axios from 'axios';
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { TextInput, Button } from 'react-native-paper';

import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView , StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import Header from '../../../components/Header';
import BackBtn from '../../../assets/assets/icon-button.svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { DatePicker } from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const AddAvailability = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [availabilitySlots, setAvailabilitySlots] = useState([]); // Array to store availability slots
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const user = useSelector(state => state.doctorAccount)
  const [isFromDatePickerVisible, setFromDatePickerVisible] = useState(false);
const [isToDatePickerVisible, setToDatePickerVisible] = useState(false);
const [isFromTimePickerVisible, setIsFromTimePickerVisible] = useState(false);
const [isToTimePickerVisible, setIsToTimePickerVisible] = useState(false);
const [saveButton , setSaveButton] = useState(false)
  console.log(user.id)
  const Navigation = useNavigation();
  console.log(selectedDay)
  const showFromTimePicker = () => {
    setIsFromTimePickerVisible(true);
  };
  
  const hideFromTimePicker = () => {
    setIsFromTimePickerVisible(false);
  };
  
  const showToTimePicker = () => {
    setIsToTimePickerVisible(true);
  };
  
  const hideToTimePicker = () => {
    setIsToTimePickerVisible(false);
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const date = new Date(day.dateString);
    const selectedDay = date.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0];
    setSelectedDay(selectedDay);
    console.log('Selected Date:', day.dateString);
    console.log('Selected Day:', selectedDay);
  };

  const handleSaveAvailability = () => {
    // Create a new availability slot object
    const newSlot = {
      from: fromTime,
      to: toTime,
    };

    // Add the new slot to the array of availability slots
    setAvailabilitySlots([...availabilitySlots, newSlot]);

    // Clear the input fields after adding
    setFromTime('');
    setToTime('');
    setSaveButton(true)
  };

  console.log(selectedDate)

  const handleSaveToBackend = () => {
    // Prepare the availability data to send to the backend
    const availabilityData = {
      dr_id: user.id, // Replace with the doctor's ID
      detail: {
        [selectedDay]: availabilitySlots.reduce((acc, slot, index) => {
          acc[index] = {
            from: slot.from,
            to: slot.to,
          };
          return acc;
        }, {}),
      },
      week_date: selectedDate,
    };

    // API endpoint
    const apiUrl = 'https://customdemowebsites.com/dbapi/availability/add';

    // Send the availability data to the API using Axios
    axios
      .post(apiUrl, availabilityData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Availability data saved:', response.data);
        // Handle success, e.g., show a success message to the user
        setSnackbarMessage('Availability data saved successfully');
        setSnackbarVisible(true);
      })
      .catch((error) => {
        console.error('Error saving availability data:', error);
        // Handle error, e.g., show an error message to the user
        setSnackbarMessage('Error saving availability data');
        setSnackbarVisible(true);
      });
      Navigation.navigate("Availibility")
      setSaveButton(false)
  };

  const renderAvailabilitySlots = () => {
    return availabilitySlots.map((slot, index) => (
      <View key={index}>
        <Text>From: {slot.from}</Text>
        <Text>To: {slot.to}</Text>
        {/* You can add a delete button for each slot if needed */}
      </View>
    ));
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.calendarContainer}>
      <Text style={styles.selectDateText}>Select a Date:</Text>
      <Calendar
        onDayPress={handleDayPress}
        
        // Customize calendar styles as needed
        // Add minDate and maxDate props to limit date selection
      />
    </View>
    {selectedDate !== '' && (
      <View style={styles.availabilityFormContainer}>
        <Text style={styles.availabilityHeaderText}>
          Availability for {selectedDate} ({selectedDay}):
        </Text>
        <TextInput
  label="From"
  value={fromTime}
  onChangeText={setFromTime}
  placeholder="09:00 AM"
  style={styles.input}
  onTouchStart={showFromTimePicker} // Open "From" time picker
/>

<TextInput
  label="To"
  value={toTime}
  onChangeText={setToTime}
  placeholder="05:00 PM"
  style={styles.input}
  onTouchStart={showToTimePicker} // Open "To" time picker
/>
<DateTimePickerModal
  isVisible={isFromTimePickerVisible}
  mode="time"
  onConfirm={selectedTime => {
    // Handle the selected time for "From"
    setFromTime(
      selectedTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    hideFromTimePicker();
  }}
  onCancel={hideFromTimePicker}
/>

<DateTimePickerModal
  isVisible={isToTimePickerVisible}
  mode="time"
  onConfirm={selectedTime => {
    // Handle the selected time for "To"
    setToTime(
      selectedTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    hideToTimePicker();
  }}
  onCancel={hideToTimePicker}
/>
        <Button mode="contained" onPress={handleSaveAvailability} style={styles.addButton}>
          Add Availability Slot
        </Button>
        {/* {availabilitySlots.length > 0 && (
          <View style={styles.availabilitySlotsContainer}>
            <Text style={styles.availabilityHeaderText}>Availability Slots:</Text>
            {renderAvailabilitySlots()}
          </View>
        )} */}
        {saveButton && 
        <Button mode="contained" onPress={handleSaveToBackend} style={styles.saveButton}>
          Save Availability
        </Button>
}
      </View>
    )}
    <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      duration={3000} // You can adjust the duration as needed
      style={styles.snackbar}
    >
      {snackbarMessage}
    </Snackbar>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#fff"
  },
  calendarContainer: {
    marginBottom: 20,
  },
  selectDateText: {
    fontSize: 20,
    marginBottom: 10,
  },
  availabilityFormContainer: {
    marginBottom: 20,
  },
  availabilityHeaderText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Raleway-Medium',
    color: '#172331',
  },
  input: {
    marginBottom: 10,
    fontFamily: 'Raleway-Medium',
    backgroundColor: '#fff',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#172331',
    justifyContent: 'center',
  },
  addButton: {
    marginBottom: 10,
  },
  availabilitySlotsContainer: {
    marginBottom: 20,
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  slotText: {
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
  },
});

export default AddAvailability;
