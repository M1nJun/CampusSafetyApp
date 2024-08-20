//rnf
import { theme } from "../colors";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles";
import UserRequestViewComponent from "../components/UserRequestViewComponent";
import OfficerRequestViewComponent from "../components/OfficerRequestViewComponent";
import { useRoute } from "@react-navigation/native";

const RequestViewScreen = ({ route }) => {
  const { token, userType, requestID } = route.params;
  console.log(userType);
  return (
    <View style={styles.container}>
      {userType === "student" ? (
        <UserRequestViewComponent token={token} requestID={requestID} />
      ) : (
        <OfficerRequestViewComponent />
      )}
    </View>
  );
};

export default RequestViewScreen;
