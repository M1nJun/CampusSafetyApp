//rnf
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../styles";
import RideRequesterComponent from "../components/RideRequesterComponent";
import SafetyRequesterComponent from "../components/SafetyRequesterComponent";
import TopToggleComponent from "../components/TopToggleComponent";
import BottomNavigationBarComponent from "../components/BottomNavigationBarComponent";

export default function StudentHomeScreen() {
  const route = useRoute();
  const { token } = route.params;
  const [isRide, setIsRide] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TopToggleComponent
        isLeft={isRide}
        setIsLeft={setIsRide}
        leftText="Ride Request"
        rightText="Safety Request"
      />
      {/* conditional scrollview rendering */}
      {isRide ? (
        <RideRequesterComponent token={token} />
      ) : (
        <SafetyRequesterComponent token={token} />
      )}

      <BottomNavigationBarComponent type="Student" token={token} />
    </View>
  );
}
