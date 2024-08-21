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
  Alert,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import UserRequestViewComponent from "../components/UserRequestViewComponent";
import LottieView from "lottie-react-native";

const StudentRequestLockScreen = () => {
  const route = useRoute();
  const { token, requestID } = route.params;
  return (
    <View style={styles.container}>
      <UserRequestViewComponent token={token} requestID={requestID} />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LottieView
          style={{ width: 500, height: 200, marginTop: -30, marginBottom: -60 }}
          source={require("../assets/Animation - 1724086249641.json")}
          autoPlay
          loop
        />
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Waiting for a driver to accept{"\n"} your request.
        </Text>
      </View>
    </View>
  );
};

export default StudentRequestLockScreen;
