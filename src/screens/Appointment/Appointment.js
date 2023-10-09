import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Linking
} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler'; 
import ClockImg from '../../assets/assets/pace.svg';
import PhoneIcon from '../../assets/assets/phoneicon.svg';
import PencilIcon from '../../assets/assets/border_color.svg';
import Verified from '../../assets/assets/doctorverified.svg'
import {Avatar, Divider} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { responsiveScreenFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions';
import MyStatusBar from '../../components/Statusbar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Schedule = () => {
  const [status, setStatus] = useState('Upcoming');
  const [dataList, setDataList] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [pastData, setPastData] = useState([]);
  const user = useSelector((state) => state.customerAccount);
  const navigation = useNavigation()
  const ListTab = [
    {
      status: 'Upcoming',
    },
    {
      status: 'Past',
    },
  ];
const setStatusFilter = (status) => {
  setStatus(status);
};
const renderItem = ({ item, index }) => {
  console.log(item);
  const leftLine = [
    item.is_done === 0 && styles.linegreen,
    item.is_pending === 1 && styles.linered,
    !item.statusCode && styles.lineblue,
  ];
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
  // const inputDateString = item.start_date_time;
  // const inputDate = new Date(inputDateString);
  const currentDate = new Date();

  const isPast = inputDate < currentDate;
  return (
    <View style={styles.appointContainer}>
      <View style={leftLine} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={styles.textsm}>Appointment Date</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <ClockImg />
            <Text style={styles.h1}>{detailData?.AppointmentDate}</Text>
            <Text style={styles.h1}>{formattedDate} </Text>  
            <View
              style={{
                borderLeftColor: '#172331',
                borderLeftWidth: 2,
                paddingHorizontal: 10,
              }}
            >
              <Text style={styles.h1}>{detailData?.from}- {detailData?.to}</Text>
            </View>
          </View>
        </View>
        {!item.statusCode && 
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone_no}`)}>
        <PhoneIcon />
        </TouchableOpacity>
        }
      </View>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'flex-start',
          marginVertical: 20,
        }}
      >
        <Avatar.Image
          size={48}
          source={require('../../assets/assets/doctorimg.png')}
        />
        <View style={{ gap: 5 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
          >
            <Text style={{ color: '#172331', fontFamily: 'Raleway-Bold' }}>
             Dr {item.f_name} {item.l_name}
            </Text>
            <Image source={require('../../assets/assets/verified.png')} />
          </View>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Text
              style={{
                color: '#172331',
                fontSize: 12,
                fontFamily: 'Raleway-SemiBold',
              }}
            >
              {item.profession}
            </Text>
            <View style={styles.dotCircle} />
            <Text
              style={{
                color: '#172331',
                fontSize: 12,
                fontFamily: 'Raleway-SemiBold',
              }}
            >
              {item.experience}
            </Text>
          </View>
        </View>
      </View>
      {item.is_done === 1 && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Tag label="Completed" color="success" />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Review',{item});
            }}
          >
            <View style={styles.button}>
              <PencilIcon />
              <Text
                style={{
                  fontFamily: 'Raleway-Medium',
                  fontSize: 12,
                  color: '#fff',
                }}
              >
                Write a Review
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      { item.is_rejected === 1 && (
        // <Tag label="Cancelled" color="danger" />
        <View style={{width:95}}>
        <Tag label="cancelled" color="danger" />
        </View>
      )}
      
    </View>
  );
};
useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get(
        `https://customdemowebsites.com/dbapi/visits/pa/${user.id}`
      );
      const data = response.data;
      
      // Get the current date
      const currentDate = new Date();

      // Filter data for upcoming and past based on date conditions
      const upcomingData = data.filter((item) => {
        console.log(item.start_date_time)
        const visitDate = new Date(item.start_date_time);
        return item.is_accepted === 1  && visitDate > currentDate;
      });
      console.log(upcomingData)
      
      const pastData = data.filter((item) => {
        const visitDate = new Date(item.start_date_time);
        return item.is_rejected === 1 || item.is_done === 1  || item.is_accepted === 1  && visitDate < currentDate;
      });

      setDataList(upcomingData);
      setUpcomingData(upcomingData);
      setPastData(pastData);
    } catch (err) {
      console.log(err);
    }
  }

  fetchData();
}, [user.id,]);
  return (
    <ScrollView style={styles.container}>
      <MyStatusBar backgroundColor="transparent"/>
      <View style={styles.my2}>
        <Text style={styles.head}>Schedule</Text>
      </View>
      <View style={styles.tabcontainer}>
        {ListTab.map(e => (
          <TouchableOpacity
            onPress={() => setStatusFilter(e.status)}
            style={[styles.btnTab, status === e.status && styles.btnActiveTab]}>
            <Text
              style={[
                styles.tabText,
                status === e.status && styles.tabActiveText,
              ]}>
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    <View style={styles.flatListContainer}>
        {status === 'Upcoming' && (
          <View>
            {upcomingData.length > 0 ? (
              <FlatList
                data={upcomingData}
                keyExtractor={(item, index) => `upcoming_${index}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false} // Hide the scrollbar for FlatList
              />
            ) : (
              <Text style={styles.noDataText}>No data found</Text>
            )}
          </View>
        )}
        {status === 'Past' && (
          <View >
            {pastData.length > 0 ? (
              <FlatList
                data={pastData}
                keyExtractor={(item, index) => `past_${index}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false} // Hide the scrollbar for FlatList
              />
            ) : (
              <Text style={styles.noDataText}>No data found</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: responsiveScreenHeight(4)
  },
  flatListContainer: {
    maxHeight: responsiveScreenHeight(70), // Set the desired height for the FlatList
  },
  upcomingDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: responsiveScreenHeight(70), // Set the desired minimum height for the container
  },
  pastDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: responsiveScreenHeight(70), // Set the desired minimum height for the container
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#666E7D',
    marginTop: responsiveScreenHeight(30),
    textAlign: "center"
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
  head:{
    color: '#172331',
    fontSize: 24,
    fontFamily: 'Raleway-SemiBold',
  },
  h1: {
    color: '#172331',
    fontSize: 14,
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
  }
});
export default Schedule;
const Tag = ({ label, color }) => {
    const tagStyles = [styles.tag, color === 'danger' && styles.danger, color === 'warning' && styles.warning, color === 'success' && styles.success];
    const labelStyles = [styles.label, label === 'cancelled' && styles.labeldanger,  label === 'Completed' && styles.labelsuccess];
  
    return (
      <View style={tagStyles}>
        <Text style={labelStyles}>{label}</Text>
      </View>
    );
};