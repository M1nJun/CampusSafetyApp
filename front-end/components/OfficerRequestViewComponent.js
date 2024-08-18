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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const OfficerRequestViewComponent = () => {
  const navigation = useNavigation();
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
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome name="user-circle" size={50} color="gray" />
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Minjun Lee</Text>
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
      <View style={{ ...styles.widthControll, marginTop: 40 }}>
        <TextInput
          placeholder="Officer Name"
          placeholderTextColor="white"
          autoCapitalize="none"
          style={{
            paddingVertical: 11,
            paddingLeft: 15,
            borderRadius: 10,
            marginVertical: 10,
            fontSize: 17,
            marginLeft: 20,
            flex: 0.65,
            backgroundColor: "#D3D3D3",
            fontWeight: "600",
            color: "white",
          }}
        ></TextInput>
      </View>
      <View
        style={{
          ...styles.widthControll,
          justifyContent: "space-between",
          paddingBottom: 25,
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
        >
          <Text style={{ ...styles.blueBtnText, paddingVertical: 6 }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.push("OfficerRequestLock");
          }}
          style={{
            ...styles.blueBtn,
            flex: 0.4,
            borderRadius: 17,
            marginRight: 20,
          }}
        >
          <Text style={{ ...styles.blueBtnText, paddingVertical: 6 }}>
            Accept
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfficerRequestViewComponent;
