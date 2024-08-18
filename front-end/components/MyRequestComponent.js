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
import UserMiniRequestComponent from "./UserMiniRequestComponent";

const MyRequestComponent = ({ navigation }) => {
  return (
    <ScrollView>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 10,
        }}
      >
        Pending Requests
      </Text>
      <UserMiniRequestComponent
        navigation={navigation}
        requestType={"Safety"}
        date={"08/13/2024"}
      />
      <UserMiniRequestComponent
        navigation={navigation}
        requestType={"Safety"}
        date={"08/13/2024"}
      />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 30,
        }}
      >
        Past Requests
      </Text>
      <UserMiniRequestComponent
        navigation={navigation}
        requestType={"Ride"}
        date={"08/13/2024"}
      />
      <UserMiniRequestComponent
        navigation={navigation}
        requestType={"Safety"}
        date={"08/13/2024"}
      />
    </ScrollView>
  );
};

export default MyRequestComponent;
