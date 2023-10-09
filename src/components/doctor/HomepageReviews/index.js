import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Quotation from '../../../assets/assets/qotation.svg';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import Swiper from 'react-native-swiper';
import { useState } from 'react';
import { Avatar } from 'react-native-paper';

const reviews = [
    {
      review: 'Heal Slot help my team wellness productivity.',
      reviewerName: 'Daniel Brown',
      reviewOccupation: 'CEO, Barone INC',
    },
    {
      review: 'Heal Slot help my team wellness productivity.',
      reviewerName: 'Daniel Brown',
      reviewOccupation: 'CEO, Barone INCssss',
    },
    {
      review: 'Heal Slot help my team wellness productivity.',
      reviewerName: 'Daniel Brown',
      reviewOccupation: 'CEO, Barone INC',
    },
  ];
const CustomDot = ({ active }) => (
    <View style={[styles.dot, active && styles.activeDot]} />
  );
const DoctorReviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  const handleIndexChanged = index => {
    setCurrentIndex(currentIndex);
  };
  return (
    <View style={styles.container}>
        <Swiper
        style={styles.wrapper}
        loop={false}
        // onIndexChanged={handleIndexChanged}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
        showsPagination={false}
      >
        {reviews.map((item, i)=>(
            <View key={i} 
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 30,
                  width: '100%',
                }}>
                <View style={{gap: 3, width: responsiveScreenWidth(50)}}>
                  <Quotation />
                  <Text style={styles.reviewer}>
                    Heal Slot help my team wellness productivity.
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Raleway-SemiBold',
                      fontSize: 12,
                      color: '#172331',
                    }}>
                    Daniel Brown
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Raleway-Medium',
                      fontSize: 10,
                      color: '#172331',
                    }}>
                    CEO, Barone INC
                  </Text>
                </View>
                <Avatar.Image/>
                {/* <View>
                  <Reviewer />
                </View> */}
              </View>
        ))}
        
        
      </Swiper>
      <View style={styles.dotsContainer}>
              <View
                style={[styles.dot, currentIndex === 0 && styles.activeDot]}
              />
              <View
                style={[styles.dot, currentIndex === 1 && styles.activeDot]}
              />
              <View
                style={[styles.dot, currentIndex === 2 && styles.activeDot]}
              />
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150 ,
    position: "relative",
    flex: 1
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatar: {
    fontSize: 20,
    color: 'white',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  author: {
    fontSize: 16,
    fontFamily:"Raleway-SemiBold",
    marginBottom: 5,
    color:"#172331"
  },
  content: {
    fontSize: 16,
    textAlign: 'left',
    color: "#172331",
    fontFamily:"Raleway-Medium"
  },
  dotsContainer: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#BDBDBD',
    marginHorizontal: 5,
    opacity: 0.4,
  },
  activeDot: {
    backgroundColor: '#4464D9',
    opacity: 1,
  },
  reviewer: {
    fontFamily: 'Raleway-Medium',
    color: '#172331',
    fontSize: 16,
  },

});

export default DoctorReviews;