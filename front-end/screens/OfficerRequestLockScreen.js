//rnf
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
  Alert,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const OfficerRequestLockScreen = () => {
  const navigation = useNavigation();
  const handleCancel = () => {
    navigation.push("OfficerHome");
  };
  const showConfirmation = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to cancel this request?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleCancel(),
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", borderRadius: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 20,
            paddingBottom: 40,
            paddingLeft: 20,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <FontAwesome name="user-circle" size={50} color="gray" />
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Minjun Lee
              </Text>
              <Text style={{ color: "gray" }}>Profile</Text>
            </View>
          </TouchableOpacity>
          <MaterialCommunityIcons
            name="shield-check"
            size={37}
            color="black"
            style={{ paddingRight: 20 }}
          />
        </View>

        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            paddingLeft: 20,
          }}
        >
          Safety Request
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            paddingLeft: 20,
            marginVertical: 10,
          }}
        >
          Location: Hiett Hall
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            paddingLeft: 20,
            marginVertical: 10,
          }}
        >
          Details: My room number is 203. I am locked out of my room. Please
          help me.
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            paddingLeft: 20,
            marginVertical: 10,
          }}
        >
          Date: 07/30/2024 09:33 am
        </Text>
        <View
          style={{
            ...styles.widthControll,
            justifyContent: "flex-end",
            paddingBottom: 20,
            paddingRight: 20,
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.blueBtn,
              backgroundColor: "black",
              flex: 0.4,
              borderRadius: 17,
              marginLeft: 20,
            }}
            onPress={showConfirmation}
          >
            <Text style={{ ...styles.blueBtnText, paddingVertical: 6 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 17,
          fontWeight: "500",
          marginTop: 60,
          alignSelf: "center",
        }}
      >
        You are currently working on this Request.{"\n"}When you're done, press
        Complete.
      </Text>
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TouchableOpacity
          //   onPress={() => {
          //     navigation.push("OfficerRequestLock");
          //   }}
          style={{
            ...styles.blueBtn,
            flex: 0.7,
            borderRadius: 22,
            marginRight: 20,
          }}
        >
          <Text style={{ ...styles.blueBtnText, paddingVertical: 12 }}>
            Complete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfficerRequestLockScreen;
