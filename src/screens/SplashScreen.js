import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Logo from '../assets/assets/log.svg'
import { useNavigation } from '@react-navigation/native';
import MyStatusBar from '../components/Statusbar';
function SplashScreen () {
  const navigation = useNavigation()
  useEffect(()=>{
    const interval =  setInterval(()=>{
    navigation.replace("Home")
     },3000)
     return ()=>{
      clearInterval(interval)
     }
  },[])
  
  return (
    <View style={styles.container}>
          <TouchableOpacity >
        <View >
          <Logo/>
     </View>
     </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4464D9',
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  image: {
    width: 80,
    height: 70,
    resizeMode: 'contain',
    zIndex: 1
},
  image2: {
    position: "absolute",
    width: 100,
    height: 70,
    resizeMode: 'contain',
    left: 2,
    top: 8,
}
});

export default SplashScreen;
