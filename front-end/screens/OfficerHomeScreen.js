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
  SafeAreaView,
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
    <SafeAreaView style={styles.container}>
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
          <RequestReceiverComponent navigation={navigation} usertype={usertype}/>
        ) : (
          <ReservedRequestReceiverComponent navigation={navigation} usertype={usertype}/>
        )}
        <BottomNavigationBarComponent usertype={usertype} />
      </View>
    </SafeAreaView>
    
  );
}
