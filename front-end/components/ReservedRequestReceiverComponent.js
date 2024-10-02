import React from "react";
import { theme } from "../colors";
import {
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import OfficerMiniRequestComponent from "./OfficerMiniRequestComponent";
import * as TokenService from '../services/tokenService';


const ReservedRequestReceiverComponent = ({ navigation }) => {
  const route = useRoute();
  const { usertype } = route.params;

  const [loading, setLoading] = useState(true);

  // could be just one state for officer or driver, just need to fetch ride requests, or both.
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

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
      console.error(`Error fetching ${status} requests`, error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchRequests("accepted", setAcceptedRequests, usertype === "officer"?
      "http://localhost:8085/request/reserved/accepted/all":"http://localhost:8085/request/reserved/accepted/ride");
      

      fetchRequests("pending", setPendingRequests, usertype === "officer"?
      "http://localhost:8085/request/reserved/pending/all":"http://localhost:8085/request/reserved/pending/ride");
      setLoading(false);
      const intervalId = setInterval(() => {
        fetchRequests("accepted", setAcceptedRequests, usertype === "officer"?
        "http://localhost:8085/request/reserved/accepted/all":"http://localhost:8085/request/reserved/accepted/ride");
      

        fetchRequests("pending", setPendingRequests, usertype === "officer"?
        "http://localhost:8085/request/reserved/pending/all":"http://localhost:8085/request/reserved/pending/ride");
      }, 2000);

      return () => clearInterval(intervalId);
    }, [])
  );

  
  return (
    <ScrollView>
      {/* <Text style={styles.titleText}>Request Accepted by me:</Text> */}
        {acceptedRequests.map((request) => (
          <OfficerMiniRequestComponent
            key={request.requestID}
            requestID={request.requestID}
            requestData={request}
            usertype={usertype}
            navigation={navigation}
          />
        ))}

      {/* <Text style={styles.titleText}>Pending Requests:</Text> */}
        {pendingRequests.map((request) => (
          <OfficerMiniRequestComponent
            key={request.requestID}
            requestID={request.requestID}
            requestData={request}
            usertype={usertype}
            navigation={navigation}
          />
        ))}
    </ScrollView>
  );
};

export default ReservedRequestReceiverComponent;
