import React from "react";
import { theme } from "../colors";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as TokenService from '../services/tokenService';

const OfficerMiniRequestComponent = ({ requestID, requestData, usertype, navigation }) => {
  const [requestDetails, setRequestDetails] = useState(requestData);

  // Optional: If you need to refetch data by requestID
  const fetchRequestData = async () => {
    try {
      const tokenRefreshed = await TokenService.refreshAccessToken();

      if (!tokenRefreshed) {
        console.log('Token refresh failed, not retrying fetch.');
        
        return;
      }

      const token = await TokenService.getAccessToken();

      const response = await fetch(
        `http://ec2-3-16-22-238.us-east-2.compute.amazonaws.com:8085/request/${requestID}`,
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
        setRequestDetails(data);
      } else {
        Alert.alert("Error", "Failed to fetch the request data.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while fetching the request data."
      );
    }
  };

  useEffect(() => {
    if (!requestDetails) {
      fetchRequestData();
    }
  }, [requestID]);

  const borderColor =
    requestDetails?.requestStatus === "accepted" ? "#7FA1C3" : "#F7B5CA";


  return (
    <TouchableOpacity
      style={{ backgroundColor: "white", borderRadius: 15, marginBottom: 17, paddingBottom: 7, borderWidth: 6, borderColor: borderColor,}}
      onPress={() =>
        //works the same for officer and driver. So we'll leave it like this for now.
        navigation.navigate("RequestView", { usertype, requestID })
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 13,
          marginBottom: 10,
          paddingLeft: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 3
            }}
          >
            {requestDetails?.requestType === "ride" ? "Ride Request" : "Safety Request"}
          </Text>
          <Text
            style={{
              fontSize: 14, fontWeight: "400", color: theme.grey
            }}
          >
            {new Date(requestDetails?.requestDate).toLocaleDateString([], {
              month: "numeric",
              day: "numeric",
            })}{" "}
            {new Date(requestDetails?.requestDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        {requestDetails?.requestType === "ride" ? (
          <FontAwesome5 name="car" size={34} color="black" style={{ marginRight: 20 }} />
        ) : (
          <MaterialCommunityIcons
            name="shield-check"
            size={34}
            color="black"
            style={{ paddingRight: 20 }}
          />
        )}
      </View>

      <View style={{flexDirection:"row", marginLeft: 20, alignItems:"center"}}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginBottom: 7,
          }}
        >
          Subject:{" "}
        </Text>
        <Text
          style={{
            fontSize: 15,
              fontWeight: "400",
            marginBottom: 7,
          }}
        >
          {requestDetails?.requestSubject}
        </Text>
      </View>
      
      {requestDetails?.requestType === "ride" ? (
        <View style={{marginLeft: 20}}>
          <Text style={{
            fontSize: 15,
            fontWeight: "600",
            marginVertical: 4,
            }}>Destination:
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginBottom: 7,
            }}
          >
            {requestDetails.destination}
          </Text>
        </View>
      ):(
        null
      )}

      <View style={{marginLeft: 20}}>
        <Text style={{
          fontSize: 15,
          fontWeight: "600",
          }}>Location:
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            marginBottom: 7,
          }}
        >
          {requestDetails.location}
        </Text>
      </View>
      
    </TouchableOpacity>
  );
};

export default OfficerMiniRequestComponent;
