import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    Dimensions,
    Text,
    Alert
  } from 'react-native';
import React from 'react'
import {Avatar, Divider} from 'react-native-paper';
import CalendarIcon from '../../../assets/assets/appointment.svg';
import HomeHealthIcon from '../../../assets/assets/home_health.svg';
import LocationIcon from '../../../assets/assets/my_location.svg';
import CoupenIcon from '../../../assets/assets/coupen.svg';
import Backbtn from '../../../assets/assets/icon-button.svg';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import MyStatusBar from '../../../components/Statusbar';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header'
import axios from 'axios';
import { moveVisitToPast } from '../../Redux/Reducer/DoctorVisits';
import { useDispatch } from 'react-redux';

const VisitDetails = ({route}) => {
  const dispatch = useDispatch()
  const {item} = route.params
  console.log(item)
  const Navigation = useNavigation()

  const detailData = JSON.parse(item.detail);
  const inputDateString = item.start_date_time;
const inputDate = new Date(inputDateString);

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const dayOfWeek = daysOfWeek[inputDate.getDay()];
const dayOfMonth = inputDate.getDate();
const month = months[inputDate.getMonth()];

const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

const handleCancel = async()=>{
   const data = await axios.put(`https://customdemowebsites.com/dbapi/visits/${item.visit_id}`,{
    is_pending:0,
    is_done:0,
    is_rejected:1
   })
   console.log(data.status)
   if(data.status === 200){
    Alert.alert("Booking has been cancelled")
    dispatch(moveVisitToPast(item.visit_id));
   }
   else{
    Alert.alert("Something went wrong")
   }
}
  return (
    
          <View style={styles.container}>
            <View>
            <MyStatusBar backgroundColor="transparent"/>
            <View style={{flexDirection:"row"}}>
      <Header
          image={<Backbtn/>}
          handlePress={()=> Navigation.goBack()}
          />
          <View style={ {textAlign:"center", alignSelf:"center", margin:"auto"}}>
          <Text style={styles.h1}>Visit#{item.visit_id}</Text>
          </View>
          </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'flex-start',
          marginVertical: 20,
          justifyContent:"space-between"
        }}>
            <View style={{flexDirection:"row", gap: 20}}>
            <Avatar.Image size={42} source={ {uri:`https://customdemowebsites.com/dbapi/${item.img}`} }/>
        <View style={{gap: 2}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <Text style={{color: '#172331', fontFamily: 'Raleway-Bold'}}>
              {item.f_name} Ahmed
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text
              style={{
                color: '#172331',
                fontSize: 12,
                fontFamily: 'Raleway-SemiBold',
              }}>
              Delhi
            </Text>
            <View style={styles.dotCircles} />
            <Text
              style={{
                color: '#172331',
                fontSize: 12,
                fontFamily: 'Raleway-SemiBold',
              }}>
              24 yrs exp
            </Text>
          </View>
         
        </View>
        </View>
        
        <View style={styles.confirmedBtn}>
               {item.is_pending === 1 ? <Text style={{color:"#fff", fontFamily: "Raleway-SemiBold", fontSize: 12}}>Upcoming</Text> : 
               <Text style={{color:"#fff", fontFamily: "Raleway-SemiBold", fontSize: 12}}>Past</Text>} 
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
             {formattedDate} {detailData.from}
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
                width: responsiveScreenWidth(70),
              }}>
             {item.address}
            </Text>
          </View>
          <Divider />
        </View>
 
      </View>
    <View style={{marginVertical: responsiveScreenHeight(2), margin:"auto", justifyContent:"center", alignItems:"center"}}>
      {item.is_pending ===1 &&
        <TouchableOpacity onPress={handleCancel} style={[styles.button, {backgroundColor:"#fff", borderColor:"#BE2831", borderWidth: 1, borderRadius: 30, width:"80%", margin:"auto"}]}>
            <Text style={{fontSize:16, color:"#BE2831",fontWeight: 700, fontFamily:"PlusJakartaSans-Bold"}}>Cancel Booking</Text>
        </TouchableOpacity>
}
    </View>
      <View>
        <Text style={{fontFamily:"Raleway-SemiBold", fontSize: 14, color: "#172331", marginBottom: 10}}>Bill Details</Text>
        <View style={{marginBottom: 20}}>
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
            }}>₹{item.charges}</Text>
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
            }}>₹{item.charges}</Text>
        </View>
      </View>
      </View>
      <View style={{marginTop: 30, width:"100%" }} >
        <TouchableOpacity >
          <View style={styles.button}>
            <Text style={{fontSize:16, color:"#fff", fontFamily:"PlusJakartaSans-Bold"}}>Show Route Map</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
  )
}

export default VisitDetails

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      paddingTop: responsiveScreenHeight(5),
      justifyContent: "space-between"
    },
    h1:{
      ontFamily: "Raleway-Medium",
        fontSize: 16,
        color: "#172331",
        marginHorizontal: responsiveScreenWidth(15)
    },
    appointmentContainer: {
      backgroundColor: '#F5F7F9',
      borderRadius: 12,
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
      backgroundColor: "#4464D9",
      width: "100%",
      height: responsiveScreenHeight(6.5),
      color: "#fff",
      borderRadius: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
      fontFamily: "PlusJakartaSans-ExtraBold",
    },
    confirmedBtn:{
        backgroundColor:"#4464D9",
        alignItems:"center",
        justifyContent:"center",
        padding: 5,
        borderRadius: 4
      },
      dotCircles:{
        width: 4,
        height:4,
        color: "#000",
        zIndex: 1
      }
  });