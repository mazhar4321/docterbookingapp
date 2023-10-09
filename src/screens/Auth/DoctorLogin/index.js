import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Picker,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Alert,
  SectionList,
} from 'react-native';
import {Avatar, RadioButton} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import InputField from '../../../components/InputFiels';
import CustomButtom from '../../../components/Button';
import Header from '../../../components/Header';
import BackBtn from '../../../assets/assets/icon-button.svg';
import DropdownIcon from '../../../assets/assets/arrow_drop_down.svg';
import Location from '../../../assets/assets/my_location.svg';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import MyStatusBar from '../../../components/Statusbar';
import axios from 'axios';
import {Dropdown} from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import {  
  setId as Id,
  setFirstName as fname,
  setAddress as add,
  setExperience as exp,
  setFee as fees,
  setHospital as hosp,
  setProfession as prof,
  setLastName as lname, 
  setEmail as Email, 
  setgender as gen } from '../../Redux/Reducer/CreateAccount/DoctorAccount'
import { Spinner } from '../../../components/Spinner';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const ProgressBarWithGap = ({totalSteps, currentStep}) => {
  return (
    <View style={styles.progressBarContainer}>
      {Array.from({length: totalSteps}, (_, index) => (
        <View
          key={index}
          style={[
            styles.progressBarSegment,
            index < currentStep ? styles.progressBarSegmentActive : null,
            index === currentStep ? styles.progressBarSegmentCurrent : null,
          ]}
        />
      ))}
    </View>
  );
};

const DoctorAccount = () => {
  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [fee, setFee] = useState('');
  const [hospital, setHospital] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hospitalBranches, setHospitalBranches] = useState([]);
  const navigation = useNavigation();
  const phone = useSelector((State) => State.phone)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const user = useSelector((state)=> state.doctorAccount)
  
  console.log(phone)
  console.log(selectedLocation)

  const handleImageUpload = () => {
    let options = {
      storageOptions:{
        path: 'image'
      }
    }
    launchImageLibrary({ mediaType: 'photo' }, response => {
      console.log(response.assets[0].uri)
        setAvatar(response.assets[0].uri);   
    });
  };
  // useEffect(()=>{
  //   async function fetchData() {
      
  //   const data = await axios.post("https://customdemowebsites.com/dbapi/drUsers/detail",{
  //       phone_no: phone,
  //     }).then((response)=>{
  //         console.log(response.data)
  //         dispatch(Id(response.data.id))
  //         dispatch(fname(response.data.f_name))
  //         dispatch(lname(response.data.l_name))
  //         dispatch(Email(response.data.email))
  //         dispatch(prof(response.data.profession))
  //         dispatch(gen(response.data.gender))
  //         dispatch(hosp(response.data.hospital))
  //         dispatch(exp(response.data.experience))
  //         dispatch(fees(response.data.fee))
  //         dispatch(add(response.data.address))
  //       navigation.navigate("DoctorHome")
        
        
  //     }).catch(err => console.log(err))
  //   }
  //   fetchData()
  // }, [])
  useEffect(() => {
    async function fetchData() {
      if (!user.id) {
        try {
          const response = await axios.post("https://customdemowebsites.com/dbapi/drUsers/auth", {
            phone_no: phone,
          });

          if (response.data) {
            console.log(response.data);
            dispatch(Id(response.data.id));
            dispatch(fname(response.data.f_name));
            dispatch(lname(response.data.l_name));
            dispatch(Email(response.data.email));
            dispatch(prof(response.data.profession));
            dispatch(gen(response.data.gender));
            dispatch(hosp(response.data.hospital));
            dispatch(exp(response.data.experience));
            dispatch(fees(response.data.fee));
            dispatch(add(response.data.address));
          }
        } catch (err) {
          console.log(err, "err");
          
        }
      }
      setLoading(false);
    }

    fetchData();
  }, []);
 

  const handleCameraUpload = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode) {
        setAvatar(response.uri);
      }
    });
  };
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  
  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Create a new FormData object
      const formData = new FormData();
  
      // Append your other data fields to the formData
      formData.append('f_name', firstName);
      formData.append('l_name', lastName);
      formData.append('phone_no', phone);
      formData.append('email', email);
      formData.append('gender', gender);
      formData.append('profession', value);
      formData.append('hospital', hospital);
      formData.append('experience', experience);
      formData.append('fee', fee);
  
      // Append the image file to formData
      if (avatar) {
        const imageFile = {
          uri: avatar,
          name: 'avatar.jpg', // You can choose any file name here
          type: 'image/jpeg', // Adjust the MIME type if needed
        };
        formData.append('image', imageFile);
      }
  
      // Append the branches data
      const branchData = {
        name: hospital,
        address: selectedLocation.address,
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      };
      formData.append('branches', JSON.stringify([branchData]));
  
      try {
        const response = await axios.post(
          'https://customdemowebsites.com/dbapi/drUsers/add',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            },
          }
        );
  
        console.log(response.data);
        dispatch(Id(response.data.id));
        dispatch(fname(response.data.f_name));
        dispatch(lname(response.data.l_name));
        dispatch(Email(response.data.email));
        dispatch(fees(response.data.fee));
        dispatch(hosp(response.data.hospital));
        dispatch(exp(response.data.experience));
        dispatch(setProfession(response.data.profession));
        dispatch(gen(response.data.gender));
        dispatch(setImage(response.data.img));
  
        navigation.replace('DoctorHome');
      } catch (err) {
        console.log(err, "Erer");
        // Alert.alert("PhoneNumber Already Exist")
        //   return navigation.navigate("Intro")
      }
    }
  };
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = option => {
    setSelectedValue(option);
    setDropdownVisible(false);
  };
  const [isLiked, setIsLiked] = useState([
    {id: 1, value: true, name: 'Male', selected: false},
    {id: 2, value: false, name: 'Female', selected: false},
    {id: 3, value: false, name: 'Other', selected: false},
  ]);
  const onRadioBtnClick = item => {
    let updatedState = isLiked.map(isLikedItem =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
    let data = updatedState.map((res)=>{
      if(res.selected == true){
        setGender(res.name)
        console.log(res.id)
      }
    })
    setIsLiked(updatedState);
  };

  const [enabledShift, setEnabledShift] = useState(false)

  const dropdown = [
    {label: 'Urologist', value: 'Urologist'},
    {label: 'Physiotherapy', value: 'Physiotherapy'},
    {label: 'Mental Wellness', value: 'Mental Wellness'},
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  console.log(value)
  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[styles.label, isFocus && {color: 'blue'}]} />;
    }
    return null;
  };

  const handlePress = async() => {
   
    navigation.goBack('DoctorHomePage');
  };
  const addHospitalBranch = (name, address, latitude, longitude) => {
    setHospitalBranches(prevBranches => [
      ...prevBranches,
      { name, address, latitude, longitude },
    ]);
  };

  const handlePlaceSelect = (data, details) => {
    if (details) {
      setSelectedLocation({
        address: data.description,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
    }
  };
  return (
    <>
    {user.id ? ( // Check if the user.id exists, if yes, navigate to the desired page
        <>{navigation.reset({ index: 0, routes: [{ name: 'DoctorHome' }] })}</>
      ) : loading ? ( // Render a loading spinner or some placeholder content until loading is complete
        <Spinner />
      ) : (
    <View  style={styles.container} >
      {/* <ScrollView bounces={false} style={{ flex:1 }}> */}
      <MyStatusBar backgroundColor="transparent" barStyle= "dark-content" />
      <View style={{height: responsiveScreenHeight(70), marginVertical: responsiveScreenHeight(-1)}}>
        <View style={{flexDirection: 'row'}}>
          <Header image={<BackBtn />} handlePress={handlePress} />
          <View
            style={{textAlign: 'center', alignSelf: 'center', margin: 'auto'}}>
            <Text style={styles.h1}>CreateAccount</Text>
          </View>
        </View>
        <ProgressBarWithGap totalSteps={totalSteps} currentStep={step - 1} />
        <Text style={styles.inputLabel}>
          {step === 1 ? 'Personal Detals' : 'Professional Details'}
        </Text>
        {/* Render form inputs based on the current step */}
        {/* ... */}
        {step === 1 && (
          
          <View
          //  style={{marginVertical: responsiveScreenHeight()}}
           >
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={handleImageUpload}>
              <View onPress={handleCameraUpload}>
              <Avatar.Image size={72} source={avatar ? {uri:avatar} : require("../../../assets/assets/avatar.png")}/>
                <Image
                  style={{position: 'absolute', bottom: 2, right: 0}}
                  source={require('../../../assets/assets/cameraIcon.png')}
                />
              </View>
            </TouchableOpacity>
            <View style={{ position: 'relative', height: 70 }}>
              <Text style={styles.inputLabel}>My Address</Text>
              {/* <View style={{position: 'relative', height:50}}> */}
                    <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    fetchDetails={true}
                    styles={{
                      container: {
                        borderColor: '#EBEBEB',
    borderWidth: 1,
                        borderRadius:8
                      }, // Style for the entire component
                      textInputContainer: {
                        color: "grey"
                      }, // Style for the text input container
                      textInput: {
                        color: "grey"
                      }, // Style for the text input
                      listView: {
                        position: 'absolute',
                        top: 40,
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        zIndex: 999, // Increase the zIndex value
                        elevation: 999, // For Android, use elevation as well
                      },
                    }}
                    debounce={800}
                        placeholder='Search destination'
                        onPress={(data, details = null) => {
                          console.log(data)
                          // 'data' contains information about the selected place
                          // 'details' contains detailed information about the selected place
                          handlePlaceSelect(data, details);
                          // console.log('Autocomplete Data:', data);
                          // console.log('Place Details:', details);
                          // console.log(JSON.stringify(details?.geometry?.location));
                        }}
                        query={{
                            key: "AIzaSyB4kdLXqVay4JN-vuRNkLU_8Cu5D0saFMY",
                            language: 'en',
                            types: 'hospital',
                            components: 'country:pk',
                        }}
                        ListView={SectionList}


                    />
                    {/* </View> */}
                    {/* <View style={{ padding: 20 }}>
        <Text>Doctor Account</Text>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: 'geometry,formatted_address' }}
          fetchDetails={true}
          placeholder='Search for a hospital branch'
          onPress={(data, details = null) => {
            if (details) {
              addHospitalBranch(data.structured_formatting.main_text, details.formatted_address, details.geometry.location.lat, details.geometry.location.lng);
              setSelectedLocation(null); // Reset selected location when adding a new branch
            }
            console.log('Autocomplete Data:', data);
                          console.log('Place Details:', details);
                          console.log(JSON.stringify(details?.geometry?.location));
          }}
          query={{
            key: 'AIzaSyB4kdLXqVay4JN-vuRNkLU_8Cu5D0saFMY',
            language: 'en',
          }}
        />
        
      </View> */}
                {/* </ScrollView> */}
            </View>
     {/* <ScrollView> */}
            <View style={{zIndex: -1}}>
              <Text style={styles.inputLabel}>First Name</Text>
              <InputField
                placeholder="First Name"
                value={firstName}
                handleChange={text => setFirstName(text)}
                keyboardType="default"
                onChangeFocus={()=> setEnabledShift(true)}
              />
            </View>
            <View style={{zIndex: -1}}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <InputField
                placeholder="Last Name"
                value={lastName}
                handleChange={text => setLastName(text)}
                keyboardType="default"
                
              />
            </View>
            <View style={{zIndex: -1}}>
              <Text style={styles.inputLabel}>Email</Text>
              <InputField
                placeholder="Email"
                value={email}
                handleChange={text => setEmail(text)}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.genderContainer}>
              <Text style={styles.inputLabel}>Gender:</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveScreenHeight(2)}}>
                {isLiked.map((item, e) => (
                  <View key={e} style={styles.radioButtonContainer}>
                    <TouchableOpacity
                      onPress={() => onRadioBtnClick(item)}
                      style={styles.radioButton}>
                      {item.selected ? (
                        <View style={styles.radioButtonIcon} />
                      ) : (
                        <View style={styles.radioButtonIcon2} />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onRadioBtnClick(item)}>
                      <Text
                        style={
                          !item.selected
                            ? styles.radioButtonText
                            : styles.radioButtonText2
                        }>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            {/* </ScrollView> */}
          </View>
        )}
        {step === 2 && (
          <View style={{ marginVertical: responsiveScreenHeight(2)}}>
            <Text style={styles.inputLabel}>Profession Type</Text>
            <View style={styles.inputSelect}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropdown}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
              {/* <TouchableOpacity onPress={toggleDropdown}>
                <Text style={{fontFamily: 'Raleway-Medium', color: '#172331', paddingHorizontal: 10}}>
                  {selectedValue || 'Select'}
                </Text>
                <DropdownIcon
                  style={{position: 'absolute', right: 5, top: '30%'}}
                />
              </TouchableOpacity> */}
              {/* {dropdownVisible && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    borderColor: '#EBEBEB',
                  }}>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => selectOption(option)}>
                      <Text
                        style={{
                          fontFamily: 'Raleway-Medium',
                          fontSize: responsiveScreenFontSize(1.5),
                          color: '#172331',
                        }}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )} */}
            </View>
            <View>
              <Text style={styles.inputLabel}>
                Where you work (Hospital/ Clinic)
              </Text>
              <InputField
                placeholder="Name"
                value={hospital}
                handleChange={text => setHospital(text)}
                keyboardType="default"
              />
            </View>
            
            <View>
              <Text style={styles.inputLabel}>Experience (yrs)</Text>
              <InputField
                placeholder="0"
                value={experience}
                handleChange={text => setExperience(text)}
                keyboardType="default"
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Fee (in INR)</Text>
              <InputField
                placeholder="0"
                value={fee}
                handleChange={text => setFee(text)}
                keyboardType="default"
              />
            </View>
           
            
          </View>
        )}
      </View>
      {/* </ScrollView> */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {step < totalSteps ? 'Next' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
      )}
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: responsiveScreenHeight(6),
    justifyContent:"space-between"
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  progressBarSegment: {
    flex: 1,
    height: 5,
    backgroundColor: '#ccc',
    marginRight: 10,
    marginTop: 20,
  },
  progressBarSegmentActive: {
    backgroundColor: '#4464D9',
  },
  progressBarSegmentCurrent: {
    backgroundColor: '#4464D9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // button: {
  //   backgroundColor: '#4464D9',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 5,
  //   marginTop: responsiveScreenHeight(12),
  // },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  h1: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
    color: '#172331',
    marginHorizontal: responsiveScreenWidth(15),
  },
  avatarContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 16,
    marginTop: 10,
  },
  cameraButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputLabel: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
    color: '#172331',
    marginBottom: responsiveScreenHeight(0.5),
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  genderContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  genderLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioLabel: {
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
    color: '#172331',
  },
  button: {
    backgroundColor: '#4464D9',
    width: '100%',
    height: responsiveScreenHeight(6),
    color: '#fff',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  colorWhite: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: '#fff',
    textAlign: 'center',
  },
  inputSelect: {
    fontFamily: 'Raleway-Medium',
    backgroundColor: '#fff',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    paddingHorizontal: 4,
    marginBottom: responsiveScreenHeight(1.5),
    borderRadius: 8,
    height: responsiveScreenHeight(5.5),
    color: '#172331',
    alignContent: 'center',
    justifyContent: 'center',
  },
  radioButton: {
    height: 25,
    width: 25,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4464D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon2: {
    height: 25,
    width: 25,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 12,
    width: 12,
    borderRadius: 7,
    backgroundColor: '#4464D9',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
    fontFamily: 'Raleway-SemiBold',
    color: '#D9D9D9',
  },
  radioButtonText2: {
    fontSize: 16,
    marginLeft: 16,
    fontFamily: 'Raleway-SemiBold',
    color: '#172331',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
});

export default DoctorAccount;
