//rnf
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomNavigationBarComponent = ({ usertype }) => {
  const navigation = useNavigation();
  const route = useRoute(); // To get the current route name

  const handleNavigation = (screen) => {
    if (route.name !== screen) {
      // Check if we're already on the target screen
      navigation.navigate(screen, { usertype });
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
      }}
    >
      <TouchableOpacity
        style={{ alignItems: "center", marginHorizontal: 50 }}
        // if the user is driver, make them go to the same screen as officers, but stil send the driver as usertype.
        onPress={() => handleNavigation(usertype === "Driver"? "OfficerHome" : usertype + "Home")}
      >
        <Entypo name="home" size={30} color="white" />
        <Text style={{ color: "white", fontWeight: "600", marginTop: 4 }}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignItems: "center", marginHorizontal: 35 }}
        onPress={() => handleNavigation("ChatList")}
      >
        <Ionicons name="chatbubbles" size={30} color="white" />
        <Text style={{ color: "white", fontWeight: "600", marginTop: 4 }}>
          Message
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignItems: "center", marginHorizontal: 50 }}
        onPress={() => handleNavigation(usertype === "Driver"? "OfficerAccount" : usertype + "Account")}
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
