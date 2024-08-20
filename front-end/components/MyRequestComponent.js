import { theme } from "../colors";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import UserMiniRequestComponent from "./UserMiniRequestComponent";

const MyRequestComponent = ({ navigation }) => {
  const route = useRoute();
  const { token } = route.params;

  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:8085/request/self/pending/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data[0].requestType);
          setPendingRequests(data);
        } else {
          console.error("Failed to fetch pending requests");
        }
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, [token]);

  useEffect(() => {
    console.log("Fetched Data:", pendingRequests);
  }, [pendingRequests]);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* will add loading animation */}
        <Text>Loading...</Text>
      </View>
    );
  }

  if (pendingRequests.length === 0) {
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

  return (
    <ScrollView>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 10,
        }}
      >
        Pending Requests
      </Text>
      {pendingRequests.map((request) => (
        <UserMiniRequestComponent
          key={request.requestID}
          navigation={navigation}
          date={request.requestDate}
          requestType={request.requestType}
          requestID={request.requestID}
          token={token}
        />
      ))}
      {console.log(pendingRequests[0])}

      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 30,
        }}
      >
        Past Requests
      </Text>
      {/* <UserMiniRequestComponent
        navigation={navigation}
        requestType={"Ride"}
        date={"08/13/2024"}
      />
      <UserMiniRequestComponent
        navigation={navigation}
        requestType={"Safety"}
        date={"08/13/2024"}
      /> */}
    </ScrollView>
  );
};

export default MyRequestComponent;
