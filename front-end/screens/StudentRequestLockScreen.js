import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import UserRequestViewComponent from "../components/UserRequestViewComponent";
import LottieView from "lottie-react-native";

const StudentRequestLockScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { token, requestID } = route.params;

  const [status, setStatus] = useState("pending");

  const doneRequest = () => {
    navigation.replace("StudentHome", { token });
  };

  const fetchStatus = async () => {
    try {
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
    }, [token])
  );

  return (
    <View style={styles.container}>
      <UserRequestViewComponent token={token} requestID={requestID} />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
              Waiting for a driver to accept{"\n"} your request.
            </Text>
          </>
        ) : status === "accepted" ? (
          <>
            <LottieView
              style={{
                width: 150,
                height: 150,
                marginTop: 40,
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
              Driver accepted{"\n"} your request.
            </Text>
          </>
        ) : status === "completed" ? (
          <>
            <LottieView
              style={{
                width: 150,
                height: 150,
                marginTop: 40,
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
              <TouchableOpacity style={styles.blueBtn} onPress={doneRequest}>
                <Text style={styles.blueBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default StudentRequestLockScreen;
