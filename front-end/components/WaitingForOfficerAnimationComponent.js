import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as TokenService from '../services/tokenService';

const WaitingForOfficerAnimationComponent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { requestID, requestType } = route.params;

  const [status, setStatus] = useState("pending");

  const doneRequest = () => {
    navigation.goBack();
    // navigation.replace("StudentHome", { token });
  };

  const fetchStatus = async () => {
    try {
      const tokenRefreshed = await TokenService.refreshAccessToken();

      if (!tokenRefreshed) {
        console.log('Token refresh failed, not retrying fetch.');
        
        return;
      }

      const token = await TokenService.getAccessToken();

      const response = await fetch(
        `http://localhost:8085/request/${requestID}/status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const status = await response.text();
        console.log(status);
        setStatus(status);
      } else {
        const error = await response.text();
        console.log(error);
      }
    } catch (error) {
      Alert.alert("Error", `Could not update status: ${error.message}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStatus();

      const intervalId = setInterval(() => {
        fetchStatus();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [])
  );

  return (
    <View style={{ justifyContent: "center", alignItems: "center", marginTop: -80, marginBottom: 40}}>
        {status === "pending" ? (
          <>
            <LottieView
              style={{
                width: 500,
                height: 200,
                marginTop: -30,
                marginBottom: -60,
              }}
              source={require("../assets/WaitingDriver.json")}
              autoPlay
              loop
            />
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Waiting for {requestType === "ride"? "a Driver" : "an Officer"} to accept{"\n"} your request.
            </Text>
          </>
        ) : status === "accepted" ? (
          <>
            <LottieView
              style={{
                width: 120,
                height: 120,
                marginTop: 20,
                marginBottom: 5,
              }}
              source={require("../assets/Accepted.json")}
              autoPlay
              loop={false}
              onAnimationLoaded={() => {
                this.animation.play(0, 45);
              }}
              ref={(animation) => {
                this.animation = animation;
              }}
            />
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
             {requestType === "ride"? " A Driver" : "An Officer"} accepted{"\n"} your request.
            </Text>
          </>
        ) : status === "completed" ? (
          <>
            <LottieView
              style={{
                width: 150,
                height: 150,
                marginBottom: 5,
              }}
              source={require("../assets/Completed.json")}
              autoPlay
              loop={false}
            />
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Your request has been{"\n"} completed.
            </Text>
            <View
              style={{
                ...styles.widthControll,
                justifyContent: "center",
              }}
            >
              {/* <TouchableOpacity style={styles.blueBtn} onPress={doneRequest}>
                <Text style={styles.blueBtnText}>Done</Text>
              </TouchableOpacity> */}
            </View>
          </>
        ) : null}
      </View>
  )
}

export default WaitingForOfficerAnimationComponent;