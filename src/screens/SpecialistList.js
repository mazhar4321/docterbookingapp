// import {  StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
// import ExpandMore from "../assets/assets/expand_more.svg"
// import { ActivityIndicator, Avatar } from 'react-native-paper'
// import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
// import MyStatusBar from '../components/Statusbar'
// import { useNavigation } from '@react-navigation/native'
// import { useEffect, useState } from 'react'
// import axios from 'axios'



// const Specialist = ({route}) => {
//     const [data, setData] = useState([])
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     console.log(route)
//     const {search} = route.params
//     console.log(search)
//     useEffect(() => {
//         fetchData();
//       }, [search]);

//     const fetchData = async () => {
//         try {
//           const response = await axios.post(
//             'https://customdemowebsites.com/dbapi/drUsers/list',
//             {
//               search: search,
//             }
//           ).then(res => setData(res.data))
    
//           if (response.data) {
//             // console.log(response.data)
//             setData(response.data);
//           } else {
//             setError('Invalid response format');
//           }
//           setLoading(false);
//         } catch (err) {
//           setError('Error fetching data');
//           setLoading(false);
//         }
//       };
//       if (loading) {
//         return (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#4464D9" />
//           </View>
//         );
//       }
    
//     //   if (error) {
//     //     return (
//     //       <View style={styles.errorContainer}>
//     //         <Text style={styles.errorText}>{error}</Text>
//     //       </View>
//     //     );
//     //   }
//   const navigation = useNavigation()
//   console.log(data)
//   return (
//     <ScrollView style={styles.container}>
//         <MyStatusBar />
//     <View >
//         <View style={{flexDirection:"row", gap: 10, alignItems:"center"}}>
//             <TouchableOpacity onPress={()=> navigation.goBack()}>
//         <Image source={require("../assets/assets/icon-button.png")}/>
//         </TouchableOpacity>
//         <Text style={{color:"#172331",fontFamily:"Raleway-SemiBold", fontSize: 14}}>{search}</Text>
//         </View>
//         {data ? data.map((item)=>{
//             console.log(item)
//         }) : <Text>No result Found</Text>}
//         <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginVertical: 20}}>
//             <Text style={{color:"#172331",fontFamily:"Raleway-Medium", fontSize:12 }}>76 doctors found</Text>
//             <View style={{flexDirection:"row", alignItems:"center", gap: 5}}>
//                 <Text>Nearest</Text>
//                 <ExpandMore/>
//             </View>
//         </View>
//         {/* {data.map((item) => (
//         <View key={item.id} style={{ flexDirection: "row", gap: 20, alignItems: "flex-start" }}>
//           <Avatar.Image size={64} source={require('../assets/assets/doctorimg.png')} />
//           <View style={{ gap: 5 }}>
//             <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
//               <Text style={{ color: "#172331", fontFamily: "Raleway-Bold" }}>{item.name}</Text>
//               <Image source={require("../assets/assets/verified.png")} />
//             </View>
//             <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
//               <Text style={{ color: "#172331", fontSize: 12, fontFamily: "Raleway-SemiBold" }}>{item.specialization}</Text>
//               <View style={styles.dotCircle} />
//               <Text style={{ color: "#172331", fontSize: 12, fontFamily: "Raleway-SemiBold" }}>{item.experience} yrs exp</Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//               <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
//                 <Image source={require("../assets/assets/star.png")} />
//                 <Text style={{ color: "#172331", fontFamily: "Raleway-SemiBold", fontSize: 12 }}>{item.rating}</Text>
//               </View>
//               <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
//                 <Image source={require("../assets/assets/location.png")} />
//                 <Text style={{ color: "#172331", fontFamily: "Raleway-SemiBold", fontSize: 12 }}>{item.location}</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       ))} */}
//         <View style={{gap: 20, paddingBottom: 20, marginTop: 10,  borderBottomColor:"#E7E7E7", borderWidth: 2 , alignself: 'self', borderColor: "transparent"}}>
//         <View style={{flexDirection:"row", gap: 20, alignItems:"flex-start"}}>
//         <Avatar.Image size={64} source={require('../assets/assets/doctorimg.png')} />
//         <View style={{gap: 5}}>
//            <View style={{flexDirection:"row", alignItems:"center", gap:2, }}>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-Bold", }}>Dr Rahul</Text>
//                     <Image source={require("../assets/assets/verified.png")}/>
//                 </View>
//                 <View style={{flexDirection:"row", gap: 5, alignItems:"center"}}>
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>Physiotherapist</Text>
//                     <View style={styles.dotCircle} />
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>24 yrs exp</Text>
//                 </View>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 10}}>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 2, }}>
//                     <Image source={require("../assets/assets/star.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold", fontSize: 12}}>4.1</Text>
//                     </View>
//                     <View style={{flexDirection:"row", alignItems:"center", gap: 5}}>
//                     <Image source={require("../assets/assets/location.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold",  fontSize: 12}}>Patparganj</Text>
//                     </View>
                    
//                 </View>
//         </View>
//         </View>
//         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
//             <View style={{}}>
//                 <Text style={{fontFamily:"Raleway-Bold", fontSize: 14, color:"#172331" }}>₹1000</Text>
//                 <Text style={{fontFamily:"Raleway-Medium", fontSize: 12, color:"#172331"}}>Consultation Fees</Text>
//             </View>
//             <TouchableOpacity onPress={()=> navigation.navigate("DoctorBooking")} style={{backgroundColor:"#4464D9",  borderRadius: 38, width:155, height: 40, alignItems: 'center', justifyContent: 'center'}}>
//                 <Text style={{fontFamily:"Raleway-SemiBold", color:"#fff"}}>Book</Text>
//             </TouchableOpacity>
//         </View>
//         </View>
//         <View style={{gap: 20, paddingBottom: 20, marginTop: 10,  borderBottomColor:"#E7E7E7", borderWidth: 2 , alignself: 'self', borderColor: "transparent"}}>
//         <View style={{flexDirection:"row", gap: 20, alignItems:"flex-start"}}>
//         <Avatar.Image size={64} source={require('../assets/assets/doctorimg.png')} />
//         <View style={{gap: 5}}>
//            <View style={{flexDirection:"row", alignItems:"center", gap:2, }}>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-Bold", }}>Dr Rahul</Text>
//                     <Image source={require("../assets/assets/verified.png")}/>
//                 </View>
//                 <View style={{flexDirection:"row", gap: 5, alignItems:"center"}}>
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>Physiotherapist</Text>
//                     <View style={styles.dotCircle} />
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>24 yrs exp</Text>
//                 </View>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 10}}>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 2, }}>
//                     <Image source={require("../assets/assets/star.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold", fontSize: 12}}>4.1</Text>
//                     </View>
//                     <View style={{flexDirection:"row", alignItems:"center", gap: 5}}>
//                     <Image source={require("../assets/assets/location.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold",  fontSize: 12}}>Patparganj</Text>
//                     </View>
                    
//                 </View>
//         </View>
//         </View>
//         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
//             <View style={{}}>
//                 <Text style={{fontFamily:"Raleway-Bold", fontSize: 14, color:"#172331" }}>₹1000</Text>
//                 <Text style={{fontFamily:"Raleway-Medium", fontSize: 12, color:"#172331"}}>Consultation Fees</Text>
//             </View>
//             <View style={{backgroundColor:"#4464D9",  borderRadius: 38, width:155, height: 40, alignItems: 'center', justifyContent: 'center'}}>
//                 <Text style={{fontFamily:"Raleway-SemiBold", color:"#fff"}}>Book</Text>
//             </View>
//         </View>
//         </View>
//         <View style={{gap: 20, paddingBottom: 20, marginTop: 10,  borderBottomColor:"#E7E7E7", borderWidth: 2 , alignself: 'self', borderColor: "transparent"}}>
//         <View style={{flexDirection:"row", gap: 20, alignItems:"flex-start"}}>
//         <Avatar.Image size={64} source={require('../assets/assets/doctorimg.png')} />
//         <View style={{gap: 5}}>
//            <View style={{flexDirection:"row", alignItems:"center", gap:2, }}>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-Bold", }}>Dr Rahul</Text>
//                     <Image source={require("../assets/assets/verified.png")}/>
//                 </View>
//                 <View style={{flexDirection:"row", gap: 5 , alignItems:"center"}}>
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>Physiotherapist</Text>
//                     <View style={styles.dotCircle} />
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>24 yrs exp</Text>
//                 </View>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 10}}>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 2, }}>
//                     <Image source={require("../assets/assets/star.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold", fontSize: 12}}>4.1</Text>
//                     </View>
//                     <View style={{flexDirection:"row", alignItems:"center", gap: 5}}>
//                     <Image source={require("../assets/assets/location.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold",  fontSize: 12}}>Patparganj</Text>
//                     </View>
                    
//                 </View>
//         </View>
//         </View>
//         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
//             <View style={{}}>
//                 <Text style={{fontFamily:"Raleway-Bold", fontSize: 14, color:"#172331" }}>₹1000</Text>
//                 <Text style={{fontFamily:"Raleway-Medium", fontSize: 12, color:"#172331"}}>Consultation Fees</Text>
//             </View>
//             <View style={{backgroundColor:"#4464D9",  borderRadius: 38, width:155, height: 40, alignItems: 'center', justifyContent: 'center'}}>
//                 <Text style={{fontFamily:"Raleway-SemiBold", color:"#fff"}}>Book</Text>
//             </View>
//         </View>
//         </View>
//         <View style={{gap: 20, paddingBottom: 20, marginTop: 10,  borderBottomColor:"#E7E7E7", borderWidth: 2 , alignself: 'self', borderColor: "transparent"}}>
//         <View style={{flexDirection:"row", gap: 20, alignItems:"flex-start"}}>
//         <Avatar.Image size={64} source={require('../assets/assets/doctorimg.png')} />
//         <View style={{gap: 5}}>
//            <View style={{flexDirection:"row", alignItems:"center", gap:2, }}>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-Bold", }}>Dr Rahul</Text>
//                     <Image source={require("../assets/assets/verified.png")}/>
//                 </View>
//                 <View style={{flexDirection:"row", gap: 5, alignItems:"center"}}>
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>Physiotherapist</Text>
//                     <View style={styles.dotCircle} />
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>24 yrs exp</Text>
//                 </View>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 10}}>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 2, }}>
//                     <Image source={require("../assets/assets/star.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold", fontSize: 12}}>4.1</Text>
//                     </View>
//                     <View style={{flexDirection:"row", alignItems:"center", gap: 5}}>
//                     <Image source={require("../assets/assets/location.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold",  fontSize: 12}}>Patparganj</Text>
//                     </View>
                    
//                 </View>
//         </View>
//         </View>
//         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
//             <View style={{}}>
//                 <Text style={{fontFamily:"Raleway-Bold", fontSize: 14, color:"#172331" }}>₹1000</Text>
//                 <Text style={{fontFamily:"Raleway-Medium", fontSize: 12, color:"#172331"}}>Consultation Fees</Text>
//             </View>
//             <View style={{backgroundColor:"#4464D9",  borderRadius: 38, width:155, height: 40, alignItems: 'center', justifyContent: 'center'}}>
//                 <Text style={{fontFamily:"Raleway-SemiBold", color:"#fff"}}>Book</Text>
//             </View>
//         </View>
//         </View>
//         <View style={{gap: 20, paddingBottom: 20, marginTop: 10,  borderBottomColor:"#E7E7E7", borderWidth: 2 , alignself: 'self', borderColor: "transparent"}}>
//         <View style={{flexDirection:"row", gap: 20, alignItems:"flex-start"}}>
//         <Avatar.Image size={64} source={require('../assets/assets/doctorimg.png')} />
//         <View style={{gap: 5}}>
//            <View style={{flexDirection:"row", alignItems:"center", gap:2, }}>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-Bold", }}>Dr Rahul</Text>
//                     <Image source={require("../assets/assets/verified.png")}/>
//                 </View>
//                 <View style={{flexDirection:"row", gap: 5, alignItems:"center"}}>
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>Physiotherapist</Text>
//                     <View style={styles.dotCircle} />
//                     <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>24 yrs exp</Text>
//                 </View>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 10}}>
//                 <View style={{flexDirection:"row", alignItems:"center", gap: 2, }}>
//                     <Image source={require("../assets/assets/star.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold", fontSize: 12}}>4.1</Text>
//                     </View>
//                     <View style={{flexDirection:"row", alignItems:"center", gap: 5}}>
//                     <Image source={require("../assets/assets/location.png")}/>
//                     <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold",  fontSize: 12}}>Patparganj</Text>
//                     </View>
                    
//                 </View>
//         </View>
//         </View>
//         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
//             <View style={{}}>
//                 <Text style={{fontFamily:"Raleway-Bold", fontSize: 14, color:"#172331" }}>₹1000</Text>
//                 <Text style={{fontFamily:"Raleway-Medium", fontSize: 12, color:"#172331"}}>Consultation Fees</Text>
//             </View>
//             <View style={{backgroundColor:"#4464D9",  borderRadius: 38, width:155, height: 40, alignItems: 'center', justifyContent: 'center'}}>
//                 <Text style={{fontFamily:"Raleway-SemiBold", color:"#fff"}}>Book</Text>
//             </View>
//         </View>
//         </View>
//           </View>
//           </ScrollView>
//  )
// }

// export default Specialist

import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import ExpandMore from "../assets/assets/expand_more.svg";
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import MyStatusBar from '../components/Statusbar';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import BackBtn from '../assets/assets/icon-button.svg'
import axios from 'axios';

const Specialist = ({ route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search } = route.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        'https://customdemowebsites.com/dbapi/drUsers/list',
        {
          search: search,
        }
      );
      console.log(response.data.data)

      if (response.data.data) {
        setData(response.data.data);
      } else {
        setError('No results found');
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const navigation = useNavigation();
  console.log(data)

  return (
    <ScrollView style={styles.container}>
      <MyStatusBar />
      <View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackBtn/>
          </TouchableOpacity>
          <Text style={{ color: "#172331", fontFamily: "Raleway-SemiBold", fontSize: 14 }}>{search}</Text>
        </View>
        {loading && <ActivityIndicator size="large" color="#4464D9" />}
        {!loading && error && <Text style={styles.errorText}>{error}</Text>}
        {!loading && !error && data && data.length === 0 && <Text style={{marginTop: 20}}>No results Found</Text>}
        {!loading && !error && data && data.map((item, value) => (
          <View key={value} style={{gap: 20, paddingBottom: 20, marginTop: 10,  borderBottomColor:"#E7E7E7", borderWidth: 2 , alignself: 'self', borderColor: "transparent"}}>
                   <View style={{flexDirection:"row", gap: 20, alignItems:"flex-start"}}>
                   <Avatar.Image size={64} source={{uri:`https://customdemowebsites.com/dbapi/${item.img}`}} />
                   <View style={{gap: 5}}>
                      <View style={{flexDirection:"row", alignItems:"center", gap:2, }}>
                               <Text style={{color:"#172331", fontFamily:"Raleway-Bold", }}>Dr {item.f_name}</Text>
                               <Image source={require("../assets/assets/verified.png")}/>
                           </View>
                           <View style={{flexDirection:"row", gap: 5, alignItems:"center"}}>
                               <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>{item.profession}</Text>
                               <View style={styles.dotCircle} />
                               <Text style={{color:"#172331", fontSize:12, fontFamily:"Raleway-SemiBold"}}>{item.experience}</Text>
                           </View>
                           <View style={{flexDirection:"row", alignItems:"center", gap: 10}}>
                           <View style={{flexDirection:"row", alignItems:"center", gap: 2, }}>
                               <Image source={require("../assets/assets/star.png")}/>
                               <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold", fontSize: 12}}>0</Text>
                               </View>
                               <View style={{flexDirection:"row", alignItems:"center", gap: 5}}>
                               <Image source={require("../assets/assets/location.png")}/>
                               <Text style={{color:"#172331", fontFamily:"Raleway-SemiBold",  fontSize: 12}}>{item.hospital}</Text>
                               </View>
                              
                           </View>
                   </View>
                   </View>
                   <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                       <View style={{}}>
                           <Text style={{fontFamily:"Raleway-Bold", fontSize: 14, color:"#172331" }}>{item.fee}</Text>
                           <Text style={{fontFamily:"Raleway-Medium", fontSize: 12, color:"#172331"}}>Consultation Fees</Text>
                       </View>
                       <TouchableOpacity onPress={()=>{navigation.navigate("DoctorBooking", {item})}} style={{backgroundColor:"#4464D9",  borderRadius: 38, width:155, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                           <Text style={{fontFamily:"Raleway-SemiBold", color:"#fff"}}>Book</Text>
                       </TouchableOpacity>
                   </View>
                   </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Specialist;


const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 20,
    paddingTop:responsiveScreenHeight(6),
    paddingBottom: 40

    },
    dotCircle: {
        width: 4,
        height: 4,
        borderRadius: 5,
        backgroundColor: '#172331', // Customize the dot color
      },
})