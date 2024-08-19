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

const StudentRequestLockScreen = () => {
  const route = useRoute();
  const { token, requestId } = route.params;
  return (
    <View style={styles.container}>
      <UserRequestViewComponent token={token} requestId={requestId} />
    </View>
  );
};

export default StudentRequestLockScreen;
