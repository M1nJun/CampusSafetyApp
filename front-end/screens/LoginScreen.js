import { theme } from "../colors";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React from "react";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8085/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const data = await response.json();
      const token = data.token;
      const usertype = data.usertype;
      const verified = data.verified;

      // on login check if the user is verified, if not send them to verify screen
      if (verified) {
        console.log(usertype);
        // Use the userType to navigate
        if (usertype === "student") {
          navigation.navigate("StudentHome", { token });
        } else if (usertype === "officer") {
          navigation.push("OfficerHome");
        } else {
          // Handle other user types or errors
          throw new Error("Unknown user type!");
        }
      } else {
        // handle when user is not verified yet
        try {
          const newCodeResponse = await fetch(
            "http://localhost:8085/user/newcode",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!newCodeResponse.ok) {
            throw new Error("Failed to generate new verification code!");
          }
          Alert.alert(
            "Verification",
            "You are not yet verified. A new verification code has been sent to your email."
          );
        } catch (error) {
          Alert.alert("Error", error.message);
        }

        navigation.navigate("Verification", { token });
      }
    } catch (error) {
      // Handle login failure, e.g., show an alert
      Alert.alert("Login Error", error.message);
    }
  };
  return (
    <View style={{ ...styles.container, alignItems: "center" }}>
      <Text style={styles.header}>Login Screen</Text>
      <View style={styles.widthControll}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
      </View>
      <View style={styles.widthControll}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        ></TextInput>
      </View>
      <View style={styles.widthControll}>
        <TouchableOpacity style={styles.blueBtn} onPress={handleLogin}>
          <Text style={styles.blueBtnText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUp}>
        <Text style={{ color: "white", fontWeight: "500" }}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity>
          <Text
            style={{ color: "#0284C7", fontWeight: "600" }}
            onPress={() => navigation.push("SignUp")}
          >
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
