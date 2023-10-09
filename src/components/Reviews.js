import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import Swiper from 'react-native-swiper';
import Review from '../assets/assets/Image.svg'

const reviews = [
  { id: 1, author: 'Samantha Payne', content: '“Lorem ipsum dolor sit amet, consectetur adipiscing venenatis.”' },
  { id: 2, author: 'Jane Smith', content: 'Excellent service!' },
  { id: 3, author: 'Mike Johnson', content: 'Highly recommended!' },
];
const CustomDot = ({ active }) => (
    <View style={[styles.dot, active && styles.activeDot]} />
  );
const ReviewComponent = () => {
  return (
    <View style={styles.container}>
        <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold", fontSize: 16, marginBottom: responsiveScreenHeight(1)}}>Review</Text>
        <Swiper
        style={styles.wrapper}
        loop={false}
        dot={<CustomDot />}
        activeDot={<CustomDot active />}
        paginationStyle={styles.pagination}
      >
        {reviews.map((review) => (
          <View key={review.id} style={styles.slide}>
            <View style={styles.avatarContainer}>
              {/* <Text style={styles.avatar}>{review.author.charAt(0)}</Text> */}
              <Review/>
            </View>
            <View style={styles.textContainer}>
                <View style={{flexDirection:"row", gap: 20}}>
              <Text style={styles.author}>{review.author}</Text>
                <View style={{flexDirection:"row", alignItems:"center", gap: 4, }}>
                    <Image source={require("../assets/assets/star.png")}/>
                    <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold", fontSize: 12}}>4.1</Text>
                    </View>
                </View>
              <Text style={styles.content}>{review.content}</Text>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveScreenHeight(1),
    height: responsiveScreenHeight(20) ,
    position: "relative"
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
   
    borderRadius: 100,
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
    fontSize: responsiveFontSize(2),
    textAlign: 'left',
    color: "#172331",
    fontFamily:"Raleway-Medium"
  },
  dot: {
    backgroundColor: "#D9D9D9",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
  },
  activeDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: 8,
    height: 8,
    borderRadius: 6,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
  },

});

export default ReviewComponent;