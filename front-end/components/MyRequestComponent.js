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

  // Fetch request data by status
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
  };

  // Fetch data on component focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchRequests(
        "pending",
        setPendingRequests,
        "http://localhost:8085/request/self/pending/all"
      );
      fetchRequests(
        "accepted",
        setAcceptedRequests,
        "http://localhost:8085/request/self/accepted/all"
      );
      fetchRequests(
        "completed",
        setCompletedRequests,
        "http://localhost:8085/request/self/completed/all"
      );
      setLoading(false);

      const intervalId = setInterval(() => {
        fetchRequests(
          "pending",
          setPendingRequests,
          "http://localhost:8085/request/self/pending/all"
        );
        fetchRequests(
          "accepted",
          setAcceptedRequests,
          "http://localhost:8085/request/self/accepted/all"
        );
        fetchRequests(
          "completed",
          setCompletedRequests,
          "http://localhost:8085/request/self/completed/all"
        );
      }, 10000);

      return () => clearInterval(intervalId);
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
        token={token}
      />
      <Section
        title="Accepted Requests"
        data={acceptedRequests}
        navigation={navigation}
        token={token}
      />
      <Section
        title="Past Requests"
        data={completedRequests}
        navigation={navigation}
        token={token}
      />
    </ScrollView>
  );
};

// Section component to handle rendering of each request type
const Section = React.memo(({ title, data, navigation, token }) => {
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
            date={request.requestDate}
            requestType={request.requestType}
            requestID={request.requestID}
            reserved={request.reserved}
            token={token}
          />
        ))
      )}
    </>
  );
});

export default MyRequestComponent;
