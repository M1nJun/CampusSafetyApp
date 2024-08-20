import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import React from "react";
import styles from "../styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import TopToggleComponent from "../components/TopToggleComponent";
import BottomNavigationBarComponent from "../components/BottomNavigationBarComponent";
import ProfileComponent from "../components/ProfileComponent";
import MyRequestComponent from "../components/MyRequestComponent";

export default function StudentAccountScreen({ navigation }) {
  const route = useRoute();
  const { token } = route.params;
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
        <ProfileComponent token={token} />
      ) : (
        <MyRequestComponent navigation={navigation} token={token} />
      )}
      <BottomNavigationBarComponent type="Student" token={token} />
    </View>
  );
}
