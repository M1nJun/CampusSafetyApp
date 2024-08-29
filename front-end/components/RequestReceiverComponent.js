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
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../styles";
import OfficerMiniRequestComponent from "./OfficerMiniRequestComponent";

const RequestReceiverComponent = ({ navigation }) => {
  const route = useRoute();
  const { token } = route.params;
  return (
    <ScrollView>
      <OfficerMiniRequestComponent navigation={navigation} />
      <OfficerMiniRequestComponent navigation={navigation} />
      <OfficerMiniRequestComponent navigation={navigation} />
    </ScrollView>
  );
};

export default RequestReceiverComponent;
