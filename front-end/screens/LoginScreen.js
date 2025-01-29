import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React from "react";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import * as TokenService from '../services/tokenService';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");


  // Shake animation value
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const shakeButton = () => {
    // Define the shake animation
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://ec2-3-16-22-238.us-east-2.compute.amazonaws.com:8085/user/login", {
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
        shakeButton();
        setLoginError("Incorrect email or password.");
        throw new Error("Login failed!");
      }

      const data = await response.json();
      const token = data.token;
      const refreshToken = data.refreshToken;
      const usertype = data.usertype;
      const verified = data.verified;

      // Store the tokens in AsyncStorage
      await TokenService.storeTokens(token, refreshToken);

      // on login check if the user is verified, if not send them to verify screen
      if (verified) {
        console.log(usertype);
        // Use the userType to navigate
        if (usertype === "Student") {
          navigation.navigate("StudentHome", { usertype });
        } else {
          navigation.navigate("OfficerHome", { usertype });
        }
      } else {
        // handle when user is not verified yet
        try {
          const newCodeResponse = await fetch(
            "http://ec2-3-16-22-238.us-east-2.compute.amazonaws.com:8085/user/newcode",
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

        navigation.navigate("Verification");
      }
    } catch (error) {
      // Handle login failure, e.g., show an alert
      Alert.alert("Login Error", error.message);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
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
        {loginError ? (
          <Animated.Text
            style={{
              alignSelf: "left",
              marginLeft: 22,
              color: "white",
              fontSize: 14,
              transform: [{ translateX: shakeAnimation }],
            }}
          >
            {loginError}
          </Animated.Text>
        ) : null}
        <Animated.View style={{...styles.widthControll, transform: [{ translateX: shakeAnimation }]}}>
          <TouchableOpacity style={styles.blueBtn} onPress={handleLogin}>
            <Text style={styles.blueBtnText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
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
    </KeyboardAvoidingView>
    
  );
}
