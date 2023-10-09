import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Linking,
  ScrollView
} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
// import ClockImg from '../../../assets/assets/pace.svg';
// import PhoneIcon from '../../../assets/assets/phoneicon.svg';
import PencilIcon from '../../../assets/assets/border_color.svg';
import {Avatar, Divider} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Visits from '../../../components/doctor/Visits';
import MyStatusBar from '../../../components/Statusbar';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ClockImg from '../../../assets/assets/pace.svg';
import PhoneIcon from '../../../assets/assets/phoneicon.svg';
import Location from '../../../assets/assets/location.svg';
import { setPastData, setUpcomingData } from '../../Redux/Reducer/DoctorVisits';
// import PencilIcon from '../../../assets/assets/border_color.svg';
const TotalVisits = () => {
  const [status, setStatus] = useState('Upcoming');
  const [dataList, setDataList] = useState([]);
  // const [upcomingData, setUpcomingData] = useState([]);
  // const [pastData, setPastData] = useState([]);
  const dispatch = useDispatch();
  const upcomingData = useSelector((state) => state.visits.upcomingData); // Access upcomingData from Redux
  const pastData = useSelector((state) => state.visits.pastData); 
  console.log(upcomingData)
  // const {upcoming_visits} = useSelector(state => state.doctorDetail.userDetails)
  const user = useSelector(state => state.doctorAccount)
  const Navigation = useNavigation()

  const navigation = useNavigation()
  const ListTab = [
    {
      status: 'Upcoming',
    },
    {
      status: 'Past',
    },
  ];
  const data = [
    {
        id: 1,
      name: 'Dr. Neeraj Mehraniya',
      specialist: 'Physiotherapist',
      experience: '24 yrs exp',
      AppointmentDate: 'Fri, 20 Mar',
      AppointmentTime: ' 07:00 - 07:30 PM',
      status: 'Upcoming',
      statusCode: "Upcoming"
    },
    {
        id: 2,
      name: 'Dr. Neeraj Mehraniya',
      specialist: 'Physiotherapist',
      experience: '24 yrs exp',
      AppointmentDate: 'Fri, 20 Mar',
      AppointmentTime: ' 07:00 - 07:30 PM',
      status: 'Upcoming',
      statusCode: "Upcoming"
      
    },
    {
        id: 3,
      name: 'Dr. Neeraj Mehraniya',
      specialist: 'Physiotherapist',
      experience: '24 yrs exp',
      AppointmentDate: 'Fri, 20 Mar',
      AppointmentTime: ' 07:00 - 07:30 PM',
      status: 'Upcoming',
      statusCode: "Upcoming"
    },
    {
        id: 4,
      name: 'Dr. Neeraj Mehraniyaaaaaaaaaaaa',
      specialist: 'Physiotherapist',
      experience: '24 yrs exp',
      AppointmentDate: 'Fri, 20 Mar',
      AppointmentTime: ' 07:00 - 07:30 PM',
      status: 'Past',
      statusCode: "Past"
    },
  ];
  const setStatusFilter = status => {
     
    if(!status){
        setDataList(data)
    }
    else{
        
      setDataList([...data.filter(e=> e.status === status)])
    }
    setStatus(status);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://customdemowebsites.com/dbapi/visits/dr/${user.id}`
        );
        const currentDate = new Date();
        const data = response.data;
        console.log(response.data)
        const upcomingData = data.filter((item) => {
          const detail = JSON.parse(item.detail); 
          console.log(detail.from)
          const visitDate = new Date(item.start_date_time);
          return item.is_pending === 1   
           && visitDate > currentDate;
        });
        
        const pastData = data.filter((item) => {
          const visitDate = new Date(item.start_date_time);
          return item.is_pending === 1 || item.is_rejected || item.is_done  === 1 && visitDate < currentDate;
        });
        setDataList(upcomingData);
        // Save the filtered data in the "Upcoming" and "Past" tabs
        // setUpcomingData(upcomingData);
        // setPastData(pastData);
        dispatch(setUpcomingData(upcomingData));
        dispatch(setPastData(pastData));
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [dispatch]);

const renderItems = ({item, index})=>{
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

  return (
    <View style={styles.appointContainer}>
    <View style={styles.leftLine} />
  <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <Text style={styles.textsm}>Visit Date & Time</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            marginVertical: responsiveScreenHeight(1)
          }}>
          <ClockImg />
          <Text style={styles.h1}>{formattedDate} |  {detailData.from}- {detailData.to}</Text>
          
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            marginBottom: responsiveScreenHeight(2)
          }}>
          <Location />
          <Text style={[styles.h2, {width: responsiveScreenWidth(70)}]}>{item.address}</Text>
          
        </View>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone_no}`)}>
            <PhoneIcon />
          </TouchableOpacity>
      
    </View>
    <Divider />
    <View  style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
    <View style={{marginTop: responsiveScreenHeight(1), flexDirection:"row", gap: 10, alignItems:"center"}}>
    <Avatar.Image size={24} source={ {uri:`https://customdemowebsites.com/dbapi/${item.img}`} }/>
    {/* <Avatar.Image
        size={responsiveScreenWidth(6)}
        
        source={uri}
      /> */}
      <TouchableOpacity onPress={()=> Navigation.navigate("VisitDetails", {item})}>
        <Text style={styles.name}>{item.f_name}</Text>
        </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={()=> Navigation.navigate("VisitDetails", {item})}>
      <Text>Visit # {item.visit_id}</Text>
    </TouchableOpacity>
    </View>
</View>
  )
}
 
  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="transparent"/>
      <View style={styles.my2}>
        <Text style={styles.h1}>Visits</Text>
      </View>
      <View style={styles.tabcontainer}>
        {ListTab.map(e => (
          <TouchableOpacity
            onPress={() => setStatusFilter(e.status)}
            style={[styles.btnTab, status === e.status && styles.btnActiveTab]}>
            <View
              style={{alignItems:"center", flexDirection:"row", justifyContent:"center"}}>
              <Text style={[
                styles.tabText,
                status === e.status && styles.tabActiveText,
              ]}>{e.status}</Text>
              <View style={[styles.totalvisits, status === e.status && styles.totolvisitsActive]}>
                <Text style={{color:"#fff", fontWeight: 600}}>{e.status === "Upcoming" ? upcomingData.length : pastData.length}</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
     



<View style={styles.flatListContainer}>
  
        {status === 'Upcoming' && (
          <View>
            {upcomingData.length > 0 ? (
              <FlatList
                data={upcomingData}
                keyExtractor={(item, index) => index}
                renderItem={renderItems}
                showsVerticalScrollIndicator={true} // Hide the scrollbar for FlatList
              />
            ) : (
              <Text style={styles.noDataText}>No Visits Found</Text>
            )}
          </View>
        )}
        {status === 'Past' && (
          <View >
            {pastData.length > 0 ? (
              <FlatList
                data={pastData}
                keyExtractor={(item, index) => index}
                renderItem={renderItems}
                showsVerticalScrollIndicator={true} // Hide the scrollbar for FlatList
              />
            ) : (
              <Text style={styles.noDataText}>No data found</Text>
            )}
          </View>
        )}
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: responsiveScreenHeight(5),
    flex: 1,
  },
  appointContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E9ECF2',
    padding: 10,
    gap: 5,
    borderRadius: 12,
    marginLeft: 10
  },
  tabcontainer: {
    backgroundColor: '#F0F4F9',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnActiveTab: {
    backgroundColor: '#FEFEFE',
  },
  
  btnTab: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 8,
    flex: 2,
    alignContent: 'center',
  },
  tabText: {
    color: '#172331',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    flexDirection:"row",
    gap: 5
  },
  noDataText : {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 24,
    margin: 'auto',
    textAlign:'center',
    marginTop: responsiveScreenHeight(30)
  },
  tabActiveText: {
    color: '#666E7D',
  },
  lineblue: {
    borderLeftWidth: 5,
    borderLeftColor: '#4464D9',
    height: '100%',
    position:"absolute",
    borderRadius: 10,
    left: -3,
    top: 10
  },
  linegreen: {
    borderLeftWidth: 5,
    borderLeftColor: '#48BD69',
    height: '80%',
    position:"absolute",
    borderRadius: 10,
    left: -3,
    top: 10
  },
  linered: {
    borderLeftWidth: 5,
    borderLeftColor: '#FC2C2C',
    height: '100%',
    position:"absolute",
    borderRadius: 10,
    left: -3,
    top: 10
  },
  my2: {
    marginVertical: 10,
  },
  h1: {
    color: '#172331',
    fontSize: 23,
    fontFamily: 'Raleway-SemiBold',
  },
  textsm: {
    color: '#172331',
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
  },
  textwhitelg: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
  },
  profileDetail: {
    backgroundColor: '#4464D9',
    borderRadius: 12,
    padding: 10,
  },
  sectionDone: {
    flexDirection: 'row',
    gap: 20,
  },
  cardContainer: {
    borderBottomColor: '#E7E7E7',
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    color: '#172331',
  },
  cardText: {
    color: '#66708F',
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4464D9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 5,
    color: '#fff',
    borderRadius: 12,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily:"Ralway-Medium"
  },
  danger: {
    backgroundColor: '#FC2C2C1A',
  },
  warning: {
    backgroundColor: 'orange',
  },
  success: {
    backgroundColor: '#48BD691A',
  },
  labeldanger:{
    color: "#FC2C2C",
    fontFamily:"Raleway-Medium"
  },
  labelsuccess:{
    color:"#48BD69",
    fontFamily:"Raleway-Medium"
  },
  totalvisits:{
    backgroundColor: "#4464D9",
    width: 18,
    height: 18,
    marginLeft: 10,
    color: "#fff",
    borderRadius: 100,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
  },
  totolvisitsActive:{
    backgroundColor:"#666E7D",
    width: 18,
    height: 18,
    marginLeft: 10,
    color: "#fff",
    borderRadius: 100,
    flexDirection:"row",
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center",
textAlign:"center"
  },
  appointContainer: {
    borderWidth: 1,
    borderColor: '#E9ECF2',
    padding: 10,
    gap: 5,
    borderRadius: 12,
    marginVertical: responsiveScreenHeight(1),
  },
h1: {
    color: '#172331',
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
  },
h2: {
    color: '#172331',
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
  },
  textsm: {
    color: '#172331',
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
  },
  name:{
    fontFamily:"Raleway-Bold",
    color: '#172331',
    fontSize: responsiveFontSize(1.7)
  },
  leftLine: {
    borderLeftWidth: 4,
    borderLeftColor: '#4464D9',
    height: '100%',
    position:"absolute",
    borderRadius: 10,
    left: -1,
    top: 10
  },
  flatListContainer: {
    maxHeight: responsiveScreenHeight(70), // Set the desired height for the FlatList
  },
});


export default TotalVisits;
const Tag = ({ label, color }) => {
    const tagStyles = [styles.tag, color === 'danger' && styles.danger, color === 'warning' && styles.warning, color === 'success' && styles.success];
    const labelStyles = [styles.label, label === 'cancelled' && styles.labeldanger,  label === 'Completed' && styles.labelsuccess];
  
    return (
      <View style={tagStyles}>
        <Text style={labelStyles}>{label}</Text>
      </View>
    );
  };