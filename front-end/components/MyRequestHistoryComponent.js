import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import UserMiniRequestComponent from "./UserMiniRequestComponent";
import LottieView from "lottie-react-native";
import * as TokenService from '../services/tokenService';

const MyRequestHistoryComponent = ({ navigation }) => {
  const route = useRoute();
  const { usertype} = route.params;

  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch request data by status
  const fetchRequests = async (status, setStateFunction, url) => {
    try {
      const tokenRefreshed = await TokenService.refreshAccessToken();

      if (!tokenRefreshed) {
        console.log('Token refresh failed, not retrying fetch.');
        
        return;
      }

      const token = await TokenService.getAccessToken();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStateFunction(data);
      } else {
        console.error(`Failed to fetch ${status} requests`);
      }
    } catch (error) {
      console.error(`Error fetching ${status} requests:`, error);
    }
  };

  // Fetch data on component focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchRequests(
        "completed",
        setCompletedRequests,
        "http://localhost:8085/request/officer/self/completed/canceled/all"
      );
      setLoading(false);

      const intervalId = setInterval(() => {
        fetchRequests(
          "completed",
          setCompletedRequests,
          "http://localhost:8085/request/officer/self/completed/canceled/all"
        );
      }, 10000);

      return () => clearInterval(intervalId);
    }, [])
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
        <LottieView
          style={{ width: 500, height: 200, marginTop: -30, marginBottom: -60 }}
          source={require("../assets/LoadingData.json")}
          autoPlay
          loop
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {/* <Section
        title="Accepted Requests"
        data={acceptedRequests}
        navigation={navigation}
      /> */}
      {console.log(usertype)}
      <Section
        title="Past Requests"
        data={completedRequests}
        usertype={usertype}
        navigation={navigation}
      />
    </ScrollView>
  );
};

// Section component to handle rendering of each request type
const Section = React.memo(({ title, data, navigation, usertype }) => {
  return (
    <>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 10,
        }}
      >
        {title}
      </Text>
      {data.length === 0 ? (
        <Text style={{ color: "white", marginTop: 5, marginBottom: 20 }}>No {title.toLowerCase()}</Text>
      ) : (
        data.map((request) => (
          <UserMiniRequestComponent
            key={request.requestID}
            navigation={navigation}
            usertype={usertype}
            date={request.requestDate}
            requestType={request.requestType}
            requestID={request.requestID}
            reserved={request.reserved}
          />
        ))
      )}
    </>
  );
});

export default MyRequestHistoryComponent;