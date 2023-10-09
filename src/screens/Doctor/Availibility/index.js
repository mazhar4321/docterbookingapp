// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Head from '../../../components/doctor/Header'
// import AddIcon from '../../../assets/assets/add.svg'
// import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
// import Slots from '../../../components/availibility/Slots'
// import { useNavigation } from '@react-navigation/native'
// import MyStatusBar from '../../../components/Statusbar'

// const Availibility = () => {
//     const navigation = useNavigation()
//     const handlePress = ()=>{
//         navigation.navigate("MyAvailability")
//     }
//   return (
//     <View style={styles.container}>
//       <MyStatusBar backgroundColor="transparent"/>
//       <Head
//       title="Schedule"
//      image={<AddIcon/>}
//      availabibility="Add Availabibility"
//      onPress={()=> navigation.navigate("AddAvailability")}
//      style={{ fontSize: 23 }}
//       />

//       <View style={styles.my}>
//         <Text style={styles.textsm}>Update your preferred working week days and time</Text>
//       </View>
//       <View style={styles.my}>
//    <Slots
//    date="Monday, Tuesday, "
//    slots="2 Slots"
//    handlePress={handlePress}
//    />
//    <Slots
//    date="Wednesday"
//    slots="5 Slots"
//    />
//    <Slots
//    date="Thursday, Friday, Saturday"
//    slots="4 Slots"
//    />
//       </View>
//     </View>
//   )
// }

// export default Availibility

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor:"#fff",
//         padding: 20,
//         paddingTop : responsiveScreenHeight(6)
//     },
//     my:{
//            marginTop: responsiveScreenHeight(4)
//     },
//     textsm:{
//         color: "#000",
//         fontFamily:"PlusJakartaSans-Medium",
//         fontSize: 12
//     }
// })

import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Head from '../../../components/doctor/Header'
import AddIcon from '../../../assets/assets/add.svg'
import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
import Slots from '../../../components/availibility/Slots'
import { useNavigation } from '@react-navigation/native'
import MyStatusBar from '../../../components/Statusbar'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Availibility = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.doctorAccount);
  console.log(user.id);

  const [availabilityData, setAvailabilityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   
  console.log(user)
    const handlePress = ()=>{
        navigation.navigate("MyAvailability")
    }
    useEffect(() => {
      async function fetchData() {
        try {
          const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
console.log(formattedDate);
    
          const response = await axios.post(
            `https://customdemowebsites.com/dbapi/availability/dr/${user.id}`,
            {
              week_date: formattedDate,
            }
          );
          console.log(response.data)
          const { detail } = response.data;
          console.log(detail)
    
          // Transform the API response into an array of objects
          const transformedData = Object.keys(detail).map(day => ({
            day: day,
            slotsCount: Object.keys(detail[day]).length,
          }))  
          setAvailabilityData(transformedData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }
      const pollingInterval = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(pollingInterval);
    };
      // fetchData();
    }, [user.id]);
    console.log(availabilityData)
  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="transparent"/>
      <Head
      title="Schedule"
     image={<AddIcon/>}
     availabibility="Add Availabibility"
     onPress={()=> navigation.navigate("AddAvailability")}
     style={{ fontSize: 23 }}
      />

      <View style={styles.my}>
        <Text style={styles.textsm}>Update your preferred working week days and time</Text>
      </View>
      {/* <View style={styles.my}>
   <Slots
   date="Monday, Tuesday, "
   slots="2 Slots"
   handlePress={handlePress}
   />
   <Slots
   date="Wednesday"
   slots="5 Slots"
   />
   <Slots
   date="Thursday, Friday, Saturday"
   slots="4 Slots"
   />
      </View> */}

<View style={styles.my}>
        {isLoading ? ( // Show loading indicator while data is being fetched
          <Text>Loading...</Text>
        ) : availabilityData.length > 0 ? ( // Check if data is available
          availabilityData.map((item) => (
            <Slots
              key={item.day} // Assuming day is unique, otherwise use 'item.id' if available
              date={item.day}
              slots={`${item.slotsCount} Slots`}
              handlePress={handlePress}
            />
          ))
        ) : (
          <Text>No availability data available</Text>
        )}
      </View>
    </View>
  )
}

export default Availibility

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#fff",
        padding: 20,
        paddingTop : responsiveScreenHeight(6)
    },
    my:{
           marginTop: responsiveScreenHeight(4)
    },
    textsm:{
        color: "#000",
        fontFamily:"PlusJakartaSans-Medium",
        fontSize: 12
    }
})