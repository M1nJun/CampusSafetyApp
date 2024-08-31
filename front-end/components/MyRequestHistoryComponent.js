import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import UserMiniRequestComponent from "./UserMiniRequestComponent";
import LottieView from "lottie-react-native";

const MyRequestHistoryComponent = ({ navigation }) => {
  const route = useRoute();
  const { token, usertype} = route.params;

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
        "completed",
        setCompletedRequests,
        "http://localhost:8085/request/officer/self/completed/all"
      );
      setLoading(false);

      const intervalId = setInterval(() => {
        fetchRequests(
          "completed",
          setCompletedRequests,
          "http://localhost:8085/request/officer/self/completed/all"
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
      {/* <Section
        title="Accepted Requests"
        data={acceptedRequests}
        navigation={navigation}
        token={token}
      /> */}
      {console.log(usertype)}
      <Section
        title="Past Requests"
        data={completedRequests}
        usertype={usertype}
        navigation={navigation}
        token={token}
      />
    </ScrollView>
  );
};

// Section component to handle rendering of each request type
const Section = React.memo(({ title, data, navigation, usertype, token }) => {
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
            token={token}
          />
        ))
      )}
    </>
  );
});

export default MyRequestHistoryComponent;