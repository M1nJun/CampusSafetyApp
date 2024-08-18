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
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import OfficerMiniRequestComponent from "./OfficerMiniRequestComponent";

const RequestReceiverComponent = ({ navigation }) => {
  return (
    <ScrollView>
      <OfficerMiniRequestComponent navigation={navigation} />
      <OfficerMiniRequestComponent navigation={navigation} />
      <OfficerMiniRequestComponent navigation={navigation} />
    </ScrollView>
  );
};

export default RequestReceiverComponent;
