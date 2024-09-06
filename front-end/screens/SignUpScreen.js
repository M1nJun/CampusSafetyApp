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
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [studentID, setStudentID] = useState("");

  const [usernameError, setUsernameError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (email.endsWith('@lawrence.edu')) {
      setUsernameError(false); // Clear error if email is valid
    } else {
      setUsernameError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          usertype: "Student",
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
          onChangeText={(text) => {setEmail(text)}}
        ></TextInput>
      </View>
      {usernameError ? <Text style={{marginLeft: 10, color: 'white', fontSize: 14,}}>{"Email must end with @lawrence.edu"}</Text> : null}
      <View style={{ ...styles.widthControll, alignItems: "center", position: "relative" }}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Hides the input content
        />
        {showPassword? <TouchableOpacity style={{ position: "absolute", right: 50, top: "50%", transform: [{ translateY: -12 }] }} onPress={() => setShowPassword(false)} >
        <Ionicons name="eye-off" size={24} color="black" />
        </TouchableOpacity> :  <TouchableOpacity style={{ position: "absolute", right: 50, top: "50%", transform: [{ translateY: -12 }] }} onPress={() => setShowPassword(true)} >
          <Ionicons 
            name="eye" 
            size={24} 
            color="black" 
          />
        </TouchableOpacity>}
        
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
