//rnf
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView } from "react-native";
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
  const { usertype } = route.params;
  const [isRide, setIsRide] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TopToggleComponent
          isLeft={isRide}
          setIsLeft={setIsRide}
          leftText="Ride Request"
          rightText="Safety Request"
        />
        {isRide ? (
          <RideRequesterComponent usertype={usertype} />
        ) : (
          <SafetyRequesterComponent usertype={usertype} />
        )}
        <BottomNavigationBarComponent usertype={usertype} />
      </View>
    </SafeAreaView>
  );
}
