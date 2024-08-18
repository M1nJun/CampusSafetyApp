import React from "react";
import { theme } from "../colors";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import styles from "../styles";

const OfficerMiniRequestComponent = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: "white", borderRadius: 15, marginBottom: 17 }}
      onPress={() =>
        navigation.navigate("RequestView", { userType: "officer" })
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 13,
          paddingBottom: 5,
          paddingLeft: 20,
        }}
      >
        <Text
          style={{
            fontSize: 23,
            fontWeight: "700",
          }}
        >
          Safety Request
        </Text>
        <MaterialCommunityIcons
          name="shield-check"
          size={37}
          color="black"
          style={{ paddingRight: 20 }}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          paddingHorizontal: 20,
          marginBottom: 7,
        }}
      >
        Location: Hiett Hall
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          paddingHorizontal: 20,
          marginBottom: 13,
        }}
      >
        Details: My room number is 203. I am locked out of my room. Please help
        me.
      </Text>
    </TouchableOpacity>
  );
};

export default OfficerMiniRequestComponent;
