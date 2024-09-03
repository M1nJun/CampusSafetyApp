import { theme } from "../colors";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RequestMatchProfileComponent = ({ token, usertype, nameToShow, profileToShow }) => {

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8085/user/profile/${profileToShow}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        Alert.alert("Error", "Fail to fetch the profile data.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while fetching the profile data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(profileToShow);
    fetchProfileData();
  }, []);
  

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No data found.</Text>
      </View>
    );
  }

    return(
      <View style={{marginLeft:20, marginBottom:20}}>
        {/* <Text style={{
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        }}>Officer assigned:
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate('ProfileView', { token, profileToShow, mode: "View" })}
        >
          <FontAwesome name="user-circle" size={50} color="gray" />
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {usertype === "Student" || usertype === "Faculty" ? nameToShow : `${profileData.firstname} ${profileData.lastname}`}
            </Text>
            <Text style={{ color: "gray" }}>Profile</Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection:"row", marginRight:20, alignItems:"center"}}>
          <TouchableOpacity style={{marginRight:15, backgroundColor:"#e2eafc", borderRadius:20, paddingHorizontal:8, paddingVertical:8}}>
            <MaterialIcons name="message" size={25} color="#00a6fb" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:10, backgroundColor:"#e2eafc", borderRadius:20, paddingHorizontal:8, paddingVertical:8}}>
            <MaterialIcons name="call" size={25} color="#00a6fb" />
          </TouchableOpacity>
        </View>
      </View>
      </View>
      
        

    )
}

export default RequestMatchProfileComponent;