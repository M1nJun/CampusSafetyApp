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
import WaitingForOfficerAnimationComponent from "../components/WaitingForOfficerAnimationComponent";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const RequestViewScreen = ({ route }) => {
  const { token, usertype, requestID, requestType } = route.params;
  console.log(usertype);
  return (
    <View style={styles.container}>
      {usertype === "Student" ? (
        <View>
          <UserRequestViewComponent token={token} requestID={requestID} usertype={usertype} />
          <WaitingForOfficerAnimationComponent requestType={requestType}/>
        </View>
      ) : (
        <OfficerRequestViewComponent token={token} requestID={requestID} usertype={usertype} />
      )}
    </View>
  );
};

export default RequestViewScreen;
