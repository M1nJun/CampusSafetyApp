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
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../styles";
import TopToggleComponent from "../components/TopToggleComponent";
import BottomNavigationBarComponent from "../components/BottomNavigationBarComponent";
import RequestReceiverComponent from "../components/RequestReceiverComponent";
import ReservedRequestReceiverComponent from "../components/ReservedRequestReceiverComponent";

export default function OfficerHomeScreen({ navigation }) {
  const route = useRoute();
  const { token, usertype } = route.params;
  const [isLeft, setIsLeft] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TopToggleComponent
        isLeft={isLeft}
        setIsLeft={setIsLeft}
        leftText="Requests"
        rightText="Reserved Requests"
      />
      {/* conditional scrollview rendering */}
      {isLeft ? (
        <RequestReceiverComponent navigation={navigation} token={token} usertype={usertype}/>
      ) : (
        <ReservedRequestReceiverComponent navigation={navigation} token={token} usertype={usertype}/>
      )}
      <BottomNavigationBarComponent token={token} type="Officer" />
    </View>
  );
}
