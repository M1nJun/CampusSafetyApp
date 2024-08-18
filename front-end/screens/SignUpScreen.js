import { theme } from "../colors";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [studentID, setStudentID] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8085/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          usertype: "student",
          firstname: firstName,
          lastname: lastName,
          phone: phone,
          studentID: studentID,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const token = await response.text();

      navigation.navigate("Verification", { token });
    } catch (error) {
      Alert.alert("Sign Up Error", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SignUp Screen</Text>
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
          value={password}
          onChangeText={setPassword}
        ></TextInput>
      </View>
      <View style={styles.widthControll}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        ></TextInput>
      </View>
      <View style={styles.widthControll}>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        ></TextInput>
      </View>
      <View style={styles.widthControll}>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        ></TextInput>
      </View>
      <View style={styles.widthControll}>
        <TextInput
          placeholder="Student ID"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
          value={studentID}
          onChangeText={setStudentID}
        ></TextInput>
      </View>
      <View style={styles.widthControll}>
        <TouchableOpacity style={styles.blueBtn} onPress={handleSignUp}>
          <Text style={styles.blueBtnText}>SignUp</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUp}>
        <Text style={{ color: "white", fontWeight: "500" }}>
          Already have an account?{" "}
        </Text>
        <TouchableOpacity>
          <Text
            style={{ color: "#0284C7", fontWeight: "600" }}
            onPress={() => navigation.push("Login")}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
