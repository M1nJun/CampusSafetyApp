import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useRef } from "react";
import styles from "../styles";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function VerificationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { token } = route.params;
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef([]);
  const handleChange = (text, index) => {
    console.log(verificationCode);
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);
    console.log(newCode);

    // move focus to next input
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const getVerificationCode = () => verificationCode.join(""); // combine code in a single string
  const handleSubmit = async () => {
    const code = getVerificationCode();
    if (code.length === 6) {
      console.log("Verification Code:", code);
      try {
        const response = await fetch("http://localhost:8085/user/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: code,
        });

        if (response.ok) {
          const result = await response.text();
          Alert.alert("Success", result);
          // Navigate to StudentHomeScreen upon successful verification
          // This is ok because it has to be a student who tried the verification.
          // Officers have verified account already.
          // need to pass token to the studenthome page.
          // So that whatever reqeust they make becomes the user's request.
          navigation.navigate("StudentHome", { token });
        } else {
          const error = await response.text();
          Alert.alert("Error", error);
        }
      } catch (error) {
        Alert.alert("Error", "Network error. Please try again.");
      }
    } else {
      Alert.alert("Error", "Please enter a 6-digit verification code");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 22, marginBottom: 30 }}>
        A Verification Code has been sent to your email. Please check your
        email.
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        {verificationCode.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.verificationInput}
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
      <View
        style={{
          marginBottom: 100,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={handleSubmit} style={styles.blueBtn}>
          <Text style={styles.blueBtnText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
