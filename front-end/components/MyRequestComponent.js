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
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import UserMiniRequestComponent from "./UserMiniRequestComponent";
import LottieView from "lottie-react-native";

const MyRequestComponent = ({ navigation }) => {
  const route = useRoute();
  const { token } = route.params;

  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useFocusEffect(
    useCallback(() => {
      fetchPendingRequests();
    }, [token])
  );

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LottieView
            style={{
              width: 500,
              height: 200,
              marginTop: -30,
              marginBottom: -60,
            }}
            source={require("../assets/LoadingData.json")}
            autoPlay
            loop
          />
        </View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (pendingRequests.length === 0) {
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
      </ScrollView>
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
