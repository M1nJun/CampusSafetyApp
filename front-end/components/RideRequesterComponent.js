//rnf
import React from "react";
import { theme } from "../colors";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from '@expo/vector-icons/Entypo';
import styles from "../styles";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce"; 
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

const RideRequesterComponent = ({ token }) => {
  const navigation = useNavigation();

  // this is for the dropdown list of locations feature
  const [locationList, setLocationList] = useState([]); // Store location options
  const [destinationList, setDestinationList] = useState([]); 
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false); // State to toggle dropdown for destination
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // this is for the map share current location feature
  const [showLocAutoCompleteList, setShowLocAutoCompleteList] = useState(false);
  const [locAutoCompleteList, setLocAutoCompleteList] = useState([]);
  const [showLocMap, setShowLocMap] = useState(false); // going to be also used as a flag to tell if the user is using the map or not.
  const [locMapRegion, setLocMapRegion] = useState({
    latitude:44.260445,
    longitude:-88.397713,
    latitudeDelta:0.0015,
    longitudeDelta:0.0015,
  });


  const [showDestAutoCompleteList, setShowDestAutoCompleteList] = useState(false);
  const [destAutoCompleteList, setDestAutoCompleteList] = useState([]);
  const [showDestMap, setShowDestMap] = useState(false); // going to be also used as a flag to tell if the user is using the map or not.
  const [destMapRegion, setDestMapRegion] = useState({
    latitude:44.260445,
    longitude:-88.397713,
    latitudeDelta:0.0015,
    longitudeDelta:0.0015,
  });

  const userCurrentLocation = async (isDestination) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Permission to access location was denied.");
        return;
      }
      
      let currentLocation = await Location.getCurrentPositionAsync({ accuracy: 5});
      
      const region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
      };
  
      isDestination ? setDestMapRegion(region) : setLocMapRegion(region);
      
    } catch (error) {
      Alert.alert("Error", "Failed to fetch current location. Ensure location services are enabled.");
      console.log("Location error:", error);
    }
  };

  // this is to reverseGeocode the long, lang coords to address
  const [locAddress, setLocAddress] = useState("");

  const handleRegionChangeComplete = async (region, isDestination) => {
    // could put in the option name, which mostly says lawrence university.
    try {
      const geocodedAddress = await Location.reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      });
      if (geocodedAddress.length > 0) {
        const { streetNumber, street, city,} = geocodedAddress[0];
        const address = `${streetNumber}, ${street}, ${city}`;
        if (isDestination) {
          setDestination(address); // Directly update the destination input
          console.log("Destination Address:", address);
        } else {
          setLocAddress(address);
          console.log("Location Address:", address);
        }
      }
    } catch (error) {
      console.log("Reverse geocoding error:", error);
      Alert.alert("Error", "Failed to fetch address for the selected location.");
    }
  };

  


  // this is for the date picker for a reservation feature
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isReserve, setIsReserve] = useState(false);

  // this is the actual request data that is going to be sent to the backend.
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");


  const fetchLocationList = async () => {
    try {
      const response = await fetch("http://localhost:8085/option/location/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLocationList(data); // Set the locations state
      } else {
        Alert.alert("Error", "Failed to fetch locations list.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching locations list.");
    }
  };

  const fetchDestinationList = async () => {
    try {
      const response = await fetch(`http://localhost:8085/option/location/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDestinationList(data); // Set the destination state
      } else {
        Alert.alert("Error", "Failed to fetch filtered locations.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching filtered locations.");
    }
  };

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocationList();
    fetchDestinationList();
  }, [token]);



  const API_KEY = "AIzaSyBP26jrlVQ062A5TJsu1rD3TQ49n7cto54";
  // This function has 2 cases
  // case 1: user chose to searchAddress on their own. In that case, we fetch autocompleted suggestions of the keyword on a list and show it to the user.
  // case 2: user chose to select a location from the static lawrence building list. Then as the user types, the user will be given a list that consists of locations that contain that keyword.
  const handleKeywordChange = debounce(async (keyword, isDestination) => {
    const fetchAutocomplete = async (url, setList) => {
      try {
        const response = await fetch(url, { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          const suggestions = data.predictions.map(prediction => prediction.description);
          setList(suggestions);
          console.log(suggestions);
        } else {
          Alert.alert("Error", "Failed to fetch location suggestions.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching location suggestions.");
      }
    };
  
    const fetchFilteredLocations = async (url, setList) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setList(data);
        } else {
          Alert.alert("Error", "Failed to fetch filtered locations.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching filtered locations.");
      }
    };
  
    const baseUrl = 'http://localhost:8085/option/location';
    const autocompleteUrl = (input) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${API_KEY}`;
    
    if (isDestination) {
      if (showDestAutoCompleteList) {
        await fetchAutocomplete(autocompleteUrl(keyword), setDestAutoCompleteList);
      } else {
        await fetchFilteredLocations(`${baseUrl}/${keyword}`, setDestinationList);
      }
    } else {
      if (showLocAutoCompleteList) {
        await fetchAutocomplete(autocompleteUrl(keyword), setLocAutoCompleteList);
      } else {
        await fetchFilteredLocations(`${baseUrl}/${keyword}`, setLocationList);
      }
    }
  }, 300); // 300ms debounce delay
  


  const handleGeocode = async (address) => {
    try {
      const geocodeResult = await Location.geocodeAsync(address);
      if (geocodeResult.length > 0) {
        const { latitude, longitude } = geocodeResult[0];
        
        // Update the destination map region with the geocoded coordinates
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0015,
        };
        
        setDestMapRegion(newRegion);
        
      } else {
        Alert.alert("Error", "Unable to geocode the selected address.");
      }
    } catch (error) {
      console.log("Geocoding error:", error);
      Alert.alert("Error", "Failed to geocode the selected address.");
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const reserve = () => setIsReserve(true);
  const instant = () => setIsReserve(false);

  const handleSubmit = async () => {
    // adjusting date object to include user's local time zone offset.
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );

    const requestData = {
      requestType: "ride",
      requestSubject: "Need a ride",
      location: location.trim(),
      destination: destination.trim(),
      message: message.trim(),
      reserved: isReserve,
      reservationDue: isReserve ? localDate : null,
    };

    try {
      const response = await fetch("http://localhost:8085/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const requestID = await response.text();
        // upon submittion, you get the string form of the key not a JSON object.
        // needs to be mirrored on the SafetyRequesterComponent.
        Alert.alert("Success", "Your ride request has been submitted.");
        navigation.navigate("StudentRequestLock", { token, requestID });
      } else {
        Alert.alert("Error", "Failed to submit the request. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while submitting the request.");
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          ...styles.widthControll,
          marginTop: 10,
          justifyContent: "center",
        }}
      >

        <TextInput
          placeholder="Where to?"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={{...styles.input, marginBottom:5}}
          // value={showDestMap? destAddress: destination}
          value={destination}
          onFocus={() => setShowDestinationDropdown(true)}
          onChangeText={(text) => {
            setDestination(text);
            text === "" ? fetchDestinationList() : handleKeywordChange(text, true);
          }}
        ></TextInput>
        
      </View>
      
      {showDestinationDropdown && (<View style={{...styles.widthControll, justifyContent:'center'}}><View style={{flex:0.9}}><ScrollView style={{backgroundColor: "white", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 5}}>
      <TouchableOpacity 
          style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} 
          onPress={() => {
            setShowDestinationDropdown(false);
            setShowDestMap(true);
            setShowDestAutoCompleteList(true);
          }}
        >
          <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
          <Text style={{color:theme.lightBlue, fontSize: 16, fontWeight:"500"}}>Search Address</Text>
        </TouchableOpacity>
          {destinationList.map((dest) => (
            
            <TouchableOpacity style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} key={dest.locationOptionID} onPress={() => {
              setDestination(dest.locationName);
              setShowDestinationDropdown(false);
            }}>
              <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
              <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>{dest.locationName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView></View></View>)}



        {showDestAutoCompleteList && (<View style={{...styles.widthControll, justifyContent:'center', marginBottom: 15}}><View style={{flex:0.9}}><ScrollView style={{backgroundColor: "white", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 5}}>
        <TouchableOpacity 
          style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} 
          onPress={() => {
            setShowDestAutoCompleteList(false);
            setShowDestMap(false);
            setShowDestinationDropdown(true);
          }}
        >
          <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
          <Text style={{color:theme.lightBlue, fontSize: 16, fontWeight:"500"}}>Go back to Lawrence Building List</Text>
        </TouchableOpacity>
          {destAutoCompleteList.map((address, index) => (
            
            <TouchableOpacity key={index} style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} onPress={() => {
              setDestination(address);
              setShowDestAutoCompleteList(false);
              //geocode this address then, update it to be the destMapRegion.
              handleGeocode(address);
            }}>
              <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
              <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>{address}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView></View></View>)}



        {showDestMap && (
        <View style={{marginBottom: 25}}>
          <MapView
            region={destMapRegion}
            style={{ width: "100%", height: 400, borderRadius: 10 }}
            // I'm commenting this so that when the day comes for me to update the location when the user moves the map.
            onRegionChangeComplete={(region) => handleRegionChangeComplete(region, true)}
          />
          <View style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: -24, // Half of the icon width
            marginTop: -48, // Half of the icon height
          }}>
            <Entypo name="location-pin" size={48} color="black" />
          </View>
          <TouchableOpacity style={{backgroundColor:"black", borderRadius: 13, width: "40%", alignSelf:"center", marginTop: -50}} onPress={()=>{
            setShowDestMap(false);
            setShowDestAutoCompleteList(false);
          }}><Text style={{color: "white", fontSize:20, fontWeight: "600", textAlign:"center", paddingVertical: 5}}>Confirm</Text></TouchableOpacity>
        </View>
      )}

{/* location handling */}
      
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TextInput
          placeholder="Where are you?"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={{...styles.input, marginBottom:5}}
          value={showLocMap ? locAddress : location} // Show address if using map, otherwise show location
          onChangeText={(text) => {
            setLocation(text);
            (text === "") ? fetchLocationList() : handleKeywordChange(text, false);
          }}
          onFocus={() => {setShowLocationDropdown(true);
            }}
        ></TextInput>
      </View>


      {showLocationDropdown && (<View style={{...styles.widthControll, justifyContent:'center'}}><View style={{flex:0.9}}><ScrollView style={{backgroundColor: "white", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 5}}>
      <TouchableOpacity 
          style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} 
          onPress={() => {
            setShowLocationDropdown(false);
            setShowLocMap(true);
            userCurrentLocation(false); //sending that isDestination is false
            console.log("Loc Map region updated:", locMapRegion);
            handleRegionChangeComplete(locMapRegion, false); //sending that isDestination is false
            console.log("Loc Address updated", locAddress);
          }}
        >
          <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
          <Text style={{color:theme.lightBlue, fontSize: 16, fontWeight:"500"}}>Current Location</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity 
          style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} 
          onPress={() => {
            setShowDestinationDropdown(false);
            setShowDestMap(true);
            setShowAutoCompleteList(true);
          }}
        >
          <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
          <Text style={{color:theme.lightBlue, fontSize: 16, fontWeight:"500"}}>Search Address</Text>
        </TouchableOpacity> */}
          {locationList.map((loc) => (
            
            <TouchableOpacity style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} key={loc.locationOptionID} onPress={() => {
              setLocation(loc.locationName);
              setShowLocationDropdown(false);
              // setUsingMap(false); // If the user chose one of the options, that means the user is not going to use the map address.
            }}>
              <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
              <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>{loc.locationName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView></View></View>)}


        {showLocMap && (
        <View style={{marginBottom: 25}}>
          <MapView
            region={locMapRegion}
            style={{ width: "100%", height: 400, borderRadius: 10 }}
            // learned that onRegionChangeComplete is not a function. I'm was not using this.props but instead directly passing a function reference to onRegionChangeComplete.
            onRegionChangeComplete={(region) => handleRegionChangeComplete(region, false)}
          />
          {/* Fixed location pin icon at the center of the map */}
          <View style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: -24, // Half of the icon width
            marginTop: -48, // Half of the icon height
          }}>
            <Entypo name="location-pin" size={48} color="black" />
          </View>
          <TouchableOpacity style={{backgroundColor:"black", borderRadius: 13, width: "40%", alignSelf:"center", marginTop: -50}} onPress={()=>{
            setShowLocMap(false);
            setLocation(locAddress);
          }}><Text style={{color: "white", fontSize:20, fontWeight: "600", textAlign:"center", paddingVertical: 5}}>Confirm</Text></TouchableOpacity>
        </View>
      )}


      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          When do you want this ride to happen?
        </Text>
      </View>
      <View
        style={{
          ...styles.widthControll,
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.reserveBtn,
            backgroundColor: !isReserve ? "white" : theme.lightGrey,
          }}
          onPress={() => {
            instant();
            setShow(false);
          }}
        >
          {!isReserve && (
            <FontAwesome6
              name="check-circle"
              size={24}
              color="black"
              style={{ paddingLeft: 7, paddingTop: 6 }}
            />
          )}
          <Text
            style={{
              ...styles.reserveBtnText,
              color: !isReserve ? "black" : theme.grey,
            }}
          >
            Right now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.reserveBtn,
            backgroundColor: isReserve ? "white" : theme.lightGrey,
          }}
          onPress={() => {
            reserve();
            showDatepicker();
          }}
        >
          {isReserve && (
            <FontAwesome6
              name="check-circle"
              size={24}
              color="black"
              style={{ paddingLeft: 7, paddingTop: 6 }}
            />
          )}
          <Text
            style={{
              ...styles.reserveBtnText,
              color: isReserve ? "black" : theme.grey,
            }}
          >
            By this date
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...styles.widthControll,
          marginVertical: 20,
          justifyContent: "center",
        }}
      >
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
            themeVariant="dark"
          />
        )}
        {show && (
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            onChange={onChange}
            themeVariant="dark"
            style={{ marginLeft: 0 }}
          />
        )}
      </View>
      {console.log("selected:", date.toLocaleString())}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Do you have any message for the driver?
        </Text>
      </View>
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TextInput
          placeholder="Write here..."
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={{
            ...styles.input,
            paddingBottom: 60,
          }}
          value={message}
          onChangeText={setMessage}
        ></TextInput>
      </View>
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TouchableOpacity style={styles.blueBtn} onPress={handleSubmit}>
          <Text style={styles.blueBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RideRequesterComponent;
