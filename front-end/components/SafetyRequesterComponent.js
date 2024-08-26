//rnf
import React from "react";
import { theme } from "../colors";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from '@expo/vector-icons/Entypo';
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce"; 
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

const SafetyRequesterComponent = ({ token }) => {
  const navigation = useNavigation();

  // this is for the dropdown list of locations, requests feature
  const [locationList, setLocationList] = useState([]); // Store location options
  const [showLocationList, setShowLocationList] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [showRequestList, setShowRequestList] = useState(false);

  // this is for the map share current location feature
  const [showMap, setShowMap] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude:44.260445,
    longitude:-88.397713,
    latitudeDelta:0.0015,
    longitudeDelta:0.0015,
  });

  const userCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Permission to access location was denied.");
        return;
      }
      
      let currentLocation = await Location.getCurrentPositionAsync({ accuracy: 5});
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
      });
      
    } catch (error) {
      Alert.alert("Error", "Failed to fetch current location. Ensure location services are enabled.");
      console.log("Location error:", error);
    }
  };

  useEffect(() => {
    userCurrentLocation();
    console.log("Map region updated:", mapRegion);
  }, []);

    // this is to reverseGeocode the long, lang coords to address
    const [address, setAddress] = useState("");

    const handleRegionChangeComplete = async (region) => {
      // could put in the option name, which mostly says lawrence university.
      try {
        const geocodedAddress = await Location.reverseGeocodeAsync({
          latitude: region.latitude,
          longitude: region.longitude,
        });
        if (geocodedAddress.length > 0) {
          const { streetNumber, street, city,} = geocodedAddress[0];
          setAddress(`${streetNumber}, ${street}, ${city}`);
          console.log(address);
        }
      } catch (error) {
        console.log("Reverse geocoding error:", error);
        Alert.alert("Error", "Failed to fetch address for the selected location.");
      }
    };

  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [isReserve, setIsReserve] = useState(false);
  const [location, setLocation] = useState("");
  // const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const [requestSubject, setRequestSubject] = useState("");

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

  useEffect(() => {
    const fetchRequestList = async () => {
      try {
        const response = await fetch("http://localhost:8085/option/request/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRequestList(data);
        } else {
          Alert.alert("Error", "Failed to fetch locations list");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching locations list.");
      }
    };

    fetchLocationList();
    fetchRequestList();
  }, [token]);

   // Function to handle location input change with debounce
   const handleLocationKeywordChange = debounce(async (keyword) => {
    try {
      const response = await fetch(`http://localhost:8085/option/location/${keyword}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLocationList(data);
      } else {
        Alert.alert("Error", "Failed to fetch filtered locations.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching filtered locations.");
    }
  }, 300); // 300ms debounce delay

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
      requestType: "safety",
      requestSubject: requestSubject.trim(),
      location: location.trim(),
      destination: null,
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
        Alert.alert("Success", "Your safety request has been submitted.");
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
          placeholder="What do you need help with?"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={{...styles.input, marginBottom:5}}
          value={requestSubject}
          onChangeText={setRequestSubject}
          onFocus={() => setShowRequestList(true)}
        ></TextInput>
      </View>
      {showRequestList && (<View style={{...styles.widthControll, justifyContent:'center'}}><View style={{flex:0.9}}><ScrollView style={{backgroundColor: "white", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 5}}>
          {requestList.map((req) => (
            
            <TouchableOpacity style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} key={req.requestOptionID} onPress={() => {
              setRequestSubject(req.requestTitle);
              setShowRequestList(false);
            }}>
              <MaterialCommunityIcons
            name="shield-check"
            size={20}
            color="black"
            style={{ paddingRight: 9, paddingBottom: 2 }}
          />
              <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>{req.requestTitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView></View></View>)}
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TextInput
          placeholder="Where are you?"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={{...styles.input, marginBottom:5}}
          value={showMap ? address : location}
          onChangeText={(text) => {
            setLocation(text);
            text === "" ? fetchLocationList() :
            handleLocationKeywordChange(text);
          }}
          onFocus={() => setShowLocationList(true)}
        ></TextInput>
      </View>
      {/* showing dropdown list on focus */}
      {showLocationList && (<View style={{...styles.widthControll, justifyContent:'center'}}><View style={{flex:0.9}}><ScrollView style={{backgroundColor: "white", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 5}}>
      <TouchableOpacity 
          style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} 
          onPress={() => {
            setShowLocationList(false);
            setShowMap(true);
            userCurrentLocation();
            console.log("Map region updated:", mapRegion);
            handleRegionChangeComplete(mapRegion);
            console.log("Address updated", address);
          }}
        >
          <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
          <Text style={{color:theme.lightBlue, fontSize: 16, fontWeight:"500"}}>Current Location</Text>
        </TouchableOpacity>
          {locationList.map((loc) => (
            <TouchableOpacity style={{flexDirection:"row",borderColor:"lightgray", borderBottomWidth: 0.8, marginVertical:7}} key={loc.locationOptionID} onPress={() => {
              setLocation(loc.locationName);
              setShowLocationList(false);
            }}>
              <Entypo name="location-pin" size={24} color="black" style={{paddingRight:5}} />
              <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>{loc.locationName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView></View></View>)}

        {showMap && (
        <View style={{marginBottom: 25}}>
          <MapView
            region={mapRegion}
            style={{ width: "100%", height: 400, borderRadius: 10 }}
            onRegionChangeComplete={handleRegionChangeComplete}
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
            setShowMap(false);
            setLocation(address);
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
          justifyContent: "flex-end",
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
      <Text style={{ color: "white" }}>selected: {date.toLocaleString()}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Do you have any message for the officer?
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

export default SafetyRequesterComponent;
