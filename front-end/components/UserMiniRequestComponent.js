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

const UserMiniRequestComponent = ({
  navigation,
  requestID,
  requestType,
  date,
  token,
}) => {
  return (
    <TouchableOpacity
      style={styles.miniRequest}
      onPress={() =>
        navigation.navigate("RequestView", {
          token,
          requestID,
          userType: "student",
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          {requestType} Request
        </Text>
        <Text style={{ fontSize: 18 }}>, </Text>
        <Text style={{ fontSize: 18 }}>{date}</Text>
      </View>

      {requestType === "ride" ? (
        <FontAwesome5
          name="shuttle-van"
          size={30}
          color="black"
          style={{ paddingRight: 20 }}
        />
      ) : (
        <MaterialCommunityIcons
          name="shield-check"
          size={32}
          color="black"
          style={{ paddingRight: 20 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default UserMiniRequestComponent;
