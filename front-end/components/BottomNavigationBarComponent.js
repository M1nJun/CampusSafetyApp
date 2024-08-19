//rnf
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomNavigationBarComponent = ({ type, token }) => {
  const navigation = useNavigation();
  const route = useRoute(); // To get the current route name

  const handleNavigation = (screen) => {
    if (route.name !== screen) {
      // Check if we're already on the target screen
      navigation.navigate(screen, { token });
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 35,
      }}
    >
      <TouchableOpacity
        style={{ alignItems: "center", marginHorizontal: 50 }}
        onPress={() => handleNavigation(type + "Home")}
      >
        <Entypo name="home" size={30} color="white" />
        <Text style={{ color: "white", fontWeight: "600", marginTop: 4 }}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", marginHorizontal: 50 }}
        onPress={() => handleNavigation(type + "Account")}
      >
        <MaterialIcons name="account-circle" size={30} color="white" />
        <Text style={{ color: "white", fontWeight: "600", marginTop: 4 }}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigationBarComponent;
