import React from "react";
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
import { useEffect, useState } from "react";
import OfficerMiniRequestComponent from "./OfficerMiniRequestComponent";

const ReservedRequestReceiverComponent = ({ navigation }) => {
  const route = useRoute();
  const { token, usertype } = route.params;

  const [loading, setLoading] = useState(true);

  // could be just one state for officer or driver, just need to fetch ride requests, or both.
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  return (
    <ScrollView>
      <OfficerMiniRequestComponent navigation={navigation} />
      <OfficerMiniRequestComponent navigation={navigation} />
      <OfficerMiniRequestComponent navigation={navigation} />
    </ScrollView>
  );
};

export default ReservedRequestReceiverComponent;
