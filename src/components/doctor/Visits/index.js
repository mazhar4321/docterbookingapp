import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import ClockImg from '../../../assets/assets/pace.svg';
import PhoneIcon from '../../../assets/assets/phoneicon.svg';
import Location from '../../../assets/assets/location.svg';
import PencilIcon from '../../../assets/assets/border_color.svg';
import { Avatar, Divider } from 'react-native-paper';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const Visits = ({formattedDate, detailData, item}) => {
  console.log(formattedDate, detailData, item)
  
  // const {detail} = item
  const Navigation = useNavigation()
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
              <Text style={styles.h2}>{item.address}</Text>
              
            </View>
          </View>
           <PhoneIcon />
          
        </View>
        <Divider />
        <View style={{marginTop: responsiveScreenHeight(1), flexDirection:"row", gap: 10, alignItems:"center"}}>
        <Avatar.Image
            size={responsiveScreenWidth(6)}
            source={require('../../../assets/assets/doctorimg.png')}
          />
          <TouchableOpacity onPress={()=> Navigation.navigate("VisitDetails")}>
            <Text style={styles.name}>{item.f_name} {item.l_name}</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Visits

const styles = StyleSheet.create({
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
})