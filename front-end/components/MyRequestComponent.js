import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import UserMiniRequestComponent from "./UserMiniRequestComponent";
import LottieView from "lottie-react-native";

const MyRequestComponent = ({ navigation }) => {
  const route = useRoute();
  const { token } = route.params;

  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(null);

  const fetchRequests = async (status, setStateFunction, url) => {
    try {
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
    // finally {
    //   setLoading(false);
    // }
  };

  const fetchAllRequests = async () => {
    setLoading(true);
    await fetchRequests(
      "pending",
      setPendingRequests,
      "http://localhost:8085/request/self/pending/all"
    );
    await fetchRequests(
      "accepted",
      setAcceptedRequests,
      "http://localhost:8085/request/self/accepted/all"
    );
    await fetchRequests(
      "completed",
      setCompletedRequests,
      "http://localhost:8085/request/self/completed/all"
    );
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllRequests();

      // Start polling every 10 seconds
      const intervalId = setInterval(fetchAllRequests, 10000);
      setPolling(intervalId);

      // Cleanup when the component is unfocused
      return () => {
        clearInterval(intervalId);
        setPolling(null);
      };
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
      {pendingRequests.length === 0 ? (
        <Text style={{ color: "white" }}>No pending requests</Text>
      ) : (
        pendingRequests.map((request) => (
          <UserMiniRequestComponent
            key={request.requestID}
            navigation={navigation}
            date={request.requestDate}
            requestType={request.requestType}
            requestID={request.requestID}
            token={token}
          />
        ))
      )}

      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 10,
        }}
      >
        Accepted Requests
      </Text>
      {acceptedRequests.length === 0 ? (
        <Text style={{ color: "white" }}>No accepted requests</Text>
      ) : (
        acceptedRequests.map((request) => (
          <UserMiniRequestComponent
            key={request.requestID}
            navigation={navigation}
            date={request.requestDate}
            requestType={request.requestType}
            requestID={request.requestID}
            token={token}
          />
        ))
      )}

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
      {completedRequests.length === 0 ? (
        <Text style={{ color: "white" }}>No past requests</Text>
      ) : (
        completedRequests.map((request) => (
          <UserMiniRequestComponent
            key={request.requestID}
            navigation={navigation}
            date={request.requestDate}
            requestType={request.requestType}
            requestID={request.requestID}
            token={token}
          />
        ))
      )}
    </ScrollView>
  );
};

export default MyRequestComponent;
