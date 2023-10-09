import React,{useRef, useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapViewScreen = ({ route }) => {
  const mapRef = useRef(null)
  const { setLocation, location } = route.params;
  const [selectedLocation, setSelectedLocation, updateLocation ] = useState(location);
  console.log(selectedLocation, location)

  async function moveToLocation(latitude, longitude){
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      2000,
    )
  }
  useEffect(() => {
    setSelectedLocation(location);
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40, width:"93%", flex:0.5, position:"absolute", top:10,zIndex:1, shadowColor:"black", shadowOffset:{width: 2, height:2},
      shadowOpacity: 0.5,
      shadowRadius:4,
      elevation:4,
      borderRadius:8,
      marginHorizontal: 10}}>
        <GooglePlacesAutocomplete
        styles={{
          textInput:{
            fontFamily: 'PlusJakartaSans-ExtraBold',
            fontSize: 16,
            color:"#000"
          },
        textInputContainer:{
          fontFamily: 'PlusJakartaSans-ExtraBold',
            fontSize: 16,
        },
        
        }}
         GooglePlacesDetailsQuery={{ fields: "geometry" }}
         fetchDetails={true}
        placeholder='Search Location....'
        onPress={(data, details) => {
          console.log('Details:', details);
          const { lat, lng } = details.geometry.location; // Update the location state
          moveToLocation(lat, lng); // Move the map to the selected location
          setSelectedLocation({ latitude: lat, longitude: lng });
          setLocation({ latitude: lat, longitude: lng });
        }}
        query={{
          key:"AIzaSyB4kdLXqVay4JN-vuRNkLU_8Cu5D0saFMY",
          language: 'en'
        }}
        onFail={error => console.log(error)}
        />
      </View>
      <MapView
      // showsUserLocation={true}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: selectedLocation?.latitude || 0, // Provide default values
          longitude: selectedLocation?.longitude || 0,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {selectedLocation && (
          <Marker
            draggable
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            onDragEnd={e => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setSelectedLocation({ latitude, longitude });
              setLocation({ latitude, longitude });
            }}
          />
        )}
      </MapView>
   </View>
  );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
});

export default MapViewScreen;