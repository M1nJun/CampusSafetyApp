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
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UserRequestViewComponent = () => {
  return (
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
        <Text
          style={{
            fontSize: 25,
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
        Details: My room number is 203. I am locked out of my room. Please help
        me.
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
          justifyContent: "center",
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity style={styles.blueBtn}>
          <Text style={styles.blueBtnText}>Cancel this Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserRequestViewComponent;
