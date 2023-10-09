/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import Intro from './src/screens/Intro';
import MobileAuthentication from './src/screens/MobileAuthentication';
import OTPScreen from './src/screens/OTPVerify';
import AccountScreen from './src/screens/CreateAccount';
import HomePage from './src/screens/HomePage';
import CustomTabNavigator from './src/components/NavigationTab';
import Specialist from './src/screens/SpecialistList';
import DoctorBooking from './src/screens/DoctorBooking';
import DoctorDetail from './src/screens/DoctorDetail';
import AmountPay from './src/screens/AmountPay';
import BookingDone from './src/screens/BookingDone';
import MyProfile from './src/screens/MyProfile';
import Schedule from './src/screens/Appointment/Appointment';
import ReviewScreen from './src/screens/Appointment/Review/ReviewScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import store from './src/screens/Redux/store';
import DoctorHomePage from './src/screens/Doctor/HomePage';
import Availibility from './src/screens/Doctor/Availibility';
import MyAvailability from './src/screens/Doctor/Availibility/MyAvailability';
import TotalVisits from './src/screens/Doctor/Visits';
import VisitDetails from './src/screens/Doctor/Visits/VisitDetails';
import MyReviews from './src/screens/Doctor/Reviews';
import DoctorAccount from './src/screens/Auth/DoctorLogin';
import DoctorLogin from './src/screens/Auth/DoctorLogin/MobileLogin';
import DoctorOtpVerification from './src/screens/Auth/DoctorLogin/DoctorOtPVerification';
import DoctorTabNavigator from './src/components/Doctortab/navigation';
import Detail from './src/screens/Details';
import AddAvailability from './src/screens/Doctor/Availibility/AddAvailibility';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-paper-toast';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DoctorNotifications from './src/screens/Notification/DoctorNotification';
import messaging from '@react-native-firebase/messaging';
import MapViewScreen from './src/screens/MapViewScreen';


function App() {

//   useEffect(() => {
//     messaging()
//   .requestPermission()
//   .then(() => {
//     console.log('Permission granted');
//   })
//   .catch((error) => {
//     console.log('Permission denied', error);
//   });

//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     // Handle background notifications here
//     console.log('Background Message:', remoteMessage);
//   });
//  messaging().onMessage(async (remoteMessage) => {
//       // Handle the received notification here
//       console.log('Notification received in the foreground:', remoteMessage);
//     });
//     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//       // Handle the received notification here
//       console.log('Notification received in the foreground:', remoteMessage);
      
//     });
  
//     return unsubscribe;
//   }, []);
 

  
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
       <ToastProvider>
  <Provider store={store}>
    <View style={{flex: 1}}>
      <NavigationContainer style={styles.sectionContainer}>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
            headerShown: false,
          }}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="DoctorHomePage" component={DoctorHomePage} />
          <Stack.Screen name="Availibility" component={Availibility} />
          <Stack.Screen name="MyAvailability" component={MyAvailability} />
          <Stack.Screen name="AddAvailability" component={AddAvailability} />
          <Stack.Screen name="TotalVisits" component={TotalVisits} />
          <Stack.Screen name="VisitDetails" component={VisitDetails} />
          <Stack.Screen name="MyReviews" component={MyReviews} />
          <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
          <Stack.Screen name="DoctorAccount" component={DoctorAccount} />
          <Stack.Screen name="DoctorOtp" component={DoctorOtpVerification} />
          <Stack.Screen name="Details" component={Detail} />
          <Stack.Screen name="DoctorNotification" component={DoctorNotifications} />
          <Stack.Screen name="MapView" component={MapViewScreen} />
          <Stack.Screen
            name="Authentication"
            component={MobileAuthentication}
          />
          <Stack.Screen name="OTPVerify" component={OTPScreen} />
          <Stack.Screen name="CreateAccount" component={AccountScreen} />
          <Stack.Screen name="HomePage" component={CustomTabNavigator} />
          <Stack.Screen name="DoctorHome" component={DoctorTabNavigator} />
          <Stack.Screen name="BookingDone" component={BookingDone} />
          <Stack.Screen name="Profile" component={MyProfile} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Review" component={ReviewScreen} />
          <Stack.Screen name="Specialist" component={Specialist} />
          <Stack.Screen name="DoctorBooking" component={DoctorBooking} />
          <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
          <Stack.Screen name="AmountPayment" component={AmountPay} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    </Provider>
    </ToastProvider>
    </PaperProvider>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 82,
    padding: 50,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
