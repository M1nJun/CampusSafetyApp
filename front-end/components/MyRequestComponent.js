import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import UserMiniRequestComponent from "./UserMiniRequestComponent";
import LottieView from "lottie-react-native";
import * as TokenService from '../services/tokenService';
import API_BASE_URL from "../config";

const MyRequestComponent = ({ navigation }) => {
  const route = useRoute();
  const { usertype } = route.params;

  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
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
      fetchRequests("pending", setPendingRequests, `${API_BASE_URL}/request/self/pending/all`);
      fetchRequests("accepted", setAcceptedRequests, `${API_BASE_URL}/request/self/accepted/all`);
      fetchRequests("completed", setCompletedRequests, `${API_BASE_URL}/request/self/completed/all`);
      setLoading(false);

      const intervalId = setInterval(() => {
        fetchRequests("pending", setPendingRequests, `${API_BASE_URL}/request/self/pending/all`);
        fetchRequests("accepted", setAcceptedRequests, `${API_BASE_URL}/request/self/accepted/all`);
        fetchRequests("completed", setCompletedRequests, `${API_BASE_URL}/request/self/completed/all`);
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
      <Section
        title="Pending Requests"
        data={pendingRequests}
        navigation={navigation}
        usertype={usertype}
      />
      <Section
        title="Accepted Requests"
        data={acceptedRequests}
        navigation={navigation}
        usertype={usertype}
      />
      <Section
        title="Past Requests"
        data={completedRequests}
        navigation={navigation}
        usertype={usertype}
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
          color: "gray",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 10,
        }}
      >
        {title}
      </Text>
      {data.length === 0 ? (
        <Text style={{ color: "gray", marginTop: 5, marginBottom: 20 }}>No {title.toLowerCase()}</Text>
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

export default MyRequestComponent;
