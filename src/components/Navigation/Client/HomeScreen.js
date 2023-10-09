// import 'react-native-gesture-handler';
// import * as React from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   Text,
//   Platform, NativeModules
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomePage from '../../../screens/HomePage';
// import DoctorBooking from '../../../screens/DoctorBooking';
// import DoctorDetail from '../../../screens/DoctorDetail';
// import AmountPay from '../../../screens/AmountPay';
// import BookingDone from '../../../screens/BookingDone';



// function HomeNavigation(){
//   const Home = createStackNavigator();
//   return (
//     <NavigationContainer independent={true}>
//       <Home.Navigator screenOptions={{
//     headerShown: false
//   }} initialRouteName="HomePage">
//     <Home.Screen  name="HomePage" component={HomePage} />
//     <Home.Screen options={() => ({
//       tabBarStyle: {
//         display: "none",
//       },
//       tabBarButton: () => null,
//     })}  name="DoctorBooking" component={DoctorBooking} />
//     <Home.Screen  name="DoctorDetail" component={DoctorDetail} />
//     <Home.Screen  name="AmountPay" component={AmountPay} />
//     {/* <Home.Screen  name="BookingDone" component={BookingDone} /> */}
//     </Home.Navigator>
//     </NavigationContainer>
   
//   );
// }


// export default HomeNavigation;
