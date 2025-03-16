import React from "react";
import { theme } from "../colors";
import {
  ScrollView,
  Text,
  View
} from "react-native";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import OfficerMiniRequestComponent from "./OfficerMiniRequestComponent";
import * as TokenService from '../services/tokenService';
import API_BASE_URL from "../config";


const ReservedRequestReceiverComponent = ({ navigation }) => {
  const route = useRoute();
  const { usertype } = route.params;

  const [loading, setLoading] = useState(true);
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
      fetchRequests("accepted", setAcceptedRequests, usertype === "Officer" ?
        `${API_BASE_URL}/request/reserved/accepted/all` : `${API_BASE_URL}/request/reserved/accepted/ride`);
      
      fetchRequests("pending", setPendingRequests, usertype === "Officer" ?
        `${API_BASE_URL}/request/reserved/pending/all` : `${API_BASE_URL}/request/reserved/pending/ride`);
      setLoading(false);

      const intervalId = setInterval(() => {
        fetchRequests("accepted", setAcceptedRequests, usertype === "Officer" ?
          `${API_BASE_URL}/request/reserved/accepted/all` : `${API_BASE_URL}/request/reserved/accepted/ride`);

        fetchRequests("pending", setPendingRequests, usertype === "Officer" ?
          `${API_BASE_URL}/request/reserved/pending/all` : `${API_BASE_URL}/request/reserved/pending/ride`);
      }, 2000);

      return () => clearInterval(intervalId);
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {acceptedRequests.length === 0 && pendingRequests.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 21, color: "gray", textAlign: "center" }}>
            No requests available
          </Text>
        </View>
      ) : (
        <>
          {acceptedRequests.map((request) => (
            <OfficerMiniRequestComponent
              key={request.requestID}
              requestID={request.requestID}
              requestData={request}
              usertype={usertype}
              navigation={navigation}
            />
          ))}

          {pendingRequests.map((request) => (
            <OfficerMiniRequestComponent
              key={request.requestID}
              requestID={request.requestID}
              requestData={request}
              usertype={usertype}
              navigation={navigation}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default ReservedRequestReceiverComponent;
