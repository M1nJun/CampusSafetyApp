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
  return (
    <ScrollView>
      <OfficerMiniRequestComponent navigation={navigation} />
      <OfficerMiniRequestComponent navigation={navigation} />
      <OfficerMiniRequestComponent navigation={navigation} />
    </ScrollView>
  );
};

export default ReservedRequestReceiverComponent;
