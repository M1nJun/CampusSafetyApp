import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import React from "react";
import styles from "../styles";
import TopToggleComponent from "../components/TopToggleComponent";
import BottomNavigationBarComponent from "../components/BottomNavigationBarComponent";
import ProfileComponent from "../components/ProfileComponent";
import MyRequestComponent from "../components/MyRequestComponent";

export default function StudentAccountScreen({ navigation }) {
  const [isProfile, setIsProfile] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TopToggleComponent
        isLeft={isProfile}
        setIsLeft={setIsProfile}
        leftText="My Profile"
        rightText="My Requests"
      />
      {isProfile ? (
        <ProfileComponent />
      ) : (
        <MyRequestComponent navigation={navigation} />
      )}
      <BottomNavigationBarComponent type="Student" />
    </View>
  );
}
