import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import UserRequestViewComponent from "../components/UserRequestViewComponent";
import LottieView from "lottie-react-native";
import WaitingForOfficerAnimationComponent from "../components/WaitingForOfficerAnimationComponent";

const StudentRequestLockScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { token, requestID } = route.params;

  return (
    <View style={styles.container}>
      <UserRequestViewComponent token={token} requestID={requestID} />
      <WaitingForOfficerAnimationComponent />
    </View>
  );
};

export default StudentRequestLockScreen;
