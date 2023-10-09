import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Head from '../../../components/doctor/Header'
import NotificationIcon from '../../../assets/assets/notification.svg'
import ArrowRightIcon from '../../../assets/assets/arrowRight.svg'
import Orange from '../../../assets/assets/orange.svg'
import Green from '../../../assets/assets/green.svg'
import HomePageCard from '../../../components/doctor/HomeCard/indeex'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import Visits from '../../../components/doctor/Visits'
import Swiper from 'react-native-swiper'
import MyStatusBar from '../../../components/Statusbar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUserDetails } from '../../Redux/Reducer/doctorSlice'
import { useNavigation } from '@react-navigation/native'
import { setEmail, setExperience, setFee, setFirstName, setHospital, setImage, setLastName, setProfession, setgender } from '../../Redux/Reducer/CreateAccount/DoctorAccount'
// import { setUserDetails } from '../../Redux/Reducer/doctorDetail'

const DoctorHomePage = () => {
  const [userData, setUserDate] = useState([])
  const doctorDetails = useSelector((state) => state.doctorDetails);
  const {id} = useSelector((state)=> state.doctorAccount)
  const fcm_token = useSelector(state => state.fcmToken.fcmToken)
  console.log(id, fcm_token)
  console.log(doctorDetails)
  const navigation = useNavigation()
  const dispatch = useDispatch()
    const CustomDot = ({ active }) => (
        <View style={[styles.dot, active && styles.activeDot]} />
      );
      const doctordetails = useSelector(state => state.doctorAccount)
      const doctor = useSelector(state => state.doctorDetail)
      console.log(doctordetails,doctor)
      useEffect(()=>{
        async function fetchData() {
            try {
              const response = await axios.get(`https://customdemowebsites.com/dbapi/drUsers/detail/${doctordetails.id}`);
               console.log(response.data)
               setUserDate(response.data)
               dispatch(setUserDetails(response.data));
          
            } catch (err) {
              console.log(err);
            }
          }
          fetchData()
      },[])
      useEffect(()=>{
        async function fetchData() {
          try {
            const res = await axios.put(
              `https://customdemowebsites.com/dbapi/drUsers/${id}`,{
                fcm_token:fcm_token,
              }
            );
            console.log(res)
    
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      },[])
      useEffect(()=>{
        async function fetchData() {
            try {
              const response = await axios.get(`https://customdemowebsites.com/dbapi/drUsers/${doctordetails.id}`);
               console.log(response.data)
               dispatch(setEmail(response.data.email))
               dispatch(setFirstName(response.data.f_name))
               dispatch(setLastName(response.data.l_name))
               dispatch(setExperience(response.data.experience))
               dispatch(setProfession(response.data.profession))
               dispatch(setFee(response.data.fee))
               dispatch(setImage(response.data.img))
               dispatch(setHospital(response.data.hospital))
               dispatch(setgender(response.data.gender))
          
            } catch (err) {
              console.log(err);
            }
          }
          fetchData()
      },[])
  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="transparent" barStyle="dark-content"/>
      <Green style={{position:"absolute", top:0, right: 0}}/>
      <Orange style={{position:"absolute", top:0, right: 70}}/>
      <Head
      // title="Hello, Dr. Mehul 👋🏼"
      title={`Hello ${userData.f_name} 👋🏼`}
      image={<NotificationIcon/>}
      onPress={()=> navigation.navigate("DoctorNotification")}
      />
      
      <View style={styles.my}>
        <HomePageCard
        title="Earning"
        Head={userData.total_earning}
        style={{ backgroundColor: "#DFE6FF" }}
        />
        <HomePageCard
        title="Reviews"
        Head={Math.round(userData.avg_rating)}
        style={{ backgroundColor: "#E5F3E3" , color:"#77BE6C"}}
        // reviews="12 reviews added"
        reviews={`${userData.review_count} reviews added`}
        />
      </View>
      { userData.upcoming_visits &&
     <View>
      <View style={styles.my}>
        <Text style={styles.textsm}>Upcoming visit ({userData.upcoming_visits.length})</Text>
        <View style={{flexDirection:"row", gap: 5, alignItems:"center"}}>
          <TouchableOpacity onPress={()=> navigation.navigate("TotalVisits")}>
            <Text style={styles.textsmsemi}>View All</Text>
            </TouchableOpacity>
        <ArrowRightIcon/>
        </View>
      </View>
      {userData.upcoming_visits > 0 ?
      <View style={styles.containerss}>
      <Swiper
        loop={false}
        dot={<CustomDot />}
        activeDot={<CustomDot active />}
        paginationStyle={styles.pagination}
      >
        {userData.upcoming_visits.map((item)=>{
          console.log(item.email)
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
          
          console.log(item);
          return(
            <Visits formattedDate={formattedDate} item={item} detailData={detailData}/>
          )
        })}
   </Swiper>
   </View>
     :
     <View style={[styles.my,{marginBottom: 20, alignItems: "center"}]}>
     <Text style={styles.upcoming_visits}>No upcoming visits</Text>
     </View> 
}
   </View>
 
   }
   
  

   <View style={styles.popup}>
    <Text style={styles.popupTextlg}>More availability, </Text>
<Text style={styles.popupTextlg}>more chances to get booked 😀</Text>
<Text style={styles.popuptextsm}>With our quick & easy scheduling system. 
Add/Manage your availability purely 
based on your preferences.</Text>
<TouchableOpacity style={styles.popupbtn}>
    <Text style={styles.btnText}>Update availability now</Text>
</TouchableOpacity>
   </View>
     
    </View>
  )
}

export default DoctorHomePage

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#fff",
        padding: 20,
        paddingTop: responsiveScreenHeight(5)
    },
    containerss: {
        marginTop: responsiveScreenHeight(3),
        height: responsiveScreenHeight(27) ,
        position: "relative"
      },
    my:{
        flexDirection:"row", justifyContent:"space-between", marginTop: responsiveScreenHeight(3)
    },
    textsm:{
        color: "#172331",
        fontFamily:"Raleway-Medium",
        fontSize: 14
    },
    textsmsemi:{
        color: "#172331",
        fontFamily:"Raleway-SemiBold",
        fontSize: 14
    },
    upcoming_visits:{
      color: "#172331",
      fontFamily:"Raleway-Medium",
      fontSize: 14,
      textAlign:"center",
      width: "100%"
    },
    dot: {
       
        backgroundColor: "#aaa",
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 3,
      },
      activeDot: {
        backgroundColor: '#4464D9',
        width: 15,
        height: 8,
        borderRadius: 15,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 3,
      },
      popup:{
        backgroundColor:"#4464D9",
        padding: 15,
        borderRadius:12
      },
      popupTextlg:{
        color:"#fff",
        fontFamily: "Raleway-SemiBold",
        fontSize: 16,
      },
      popuptextsm:{
        fontSize: 10,
        color: "#fff",
        fontFamily:"Raleway-Regular",
        width: "50%",
        lineHeight: 14,
        marginVertical: responsiveScreenHeight(1)
      },
      popupbtn:{
        backgroundColor:"#fff",
        borderRadius: 12,
        width: responsiveScreenWidth(40),
        paddingHorizontal: responsiveScreenWidth(2),
        height: responsiveScreenHeight(3),
        alignItems:"center",
        justifyContent:"center"
    },
    btnText:{
        color: "#4464D9",
        fontSize: 12,
        fontFamily:"Raleway-Medium"
    },
    gradient:{
      position: "absolute",
      top: 0,
      right: 0,
      width: "30%",
      height: "30%",
      backgroundColor: "#F66E34",
      opacity: 0.05,
      borderRadius: 381

    }
})