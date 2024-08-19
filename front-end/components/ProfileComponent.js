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
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import styles from "../styles";

const ProfileComponent = () => {
  const route = useRoute();
  const { token } = route.params;
  const [profile, setProfile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [studentID, setStudentID] = useState("");
  const edit = () => setIsEdit(true);
  const notEdit = () => setIsEdit(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:8085/user/profile/self",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setProfile(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setPhone(data.phone);
        setStudentID(data.studentID);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8085/user/profile/update",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            phone,
            studentID,
          }),
        }
      );

      if (response.ok) {
        const result = await response.text();
        Alert.alert("Update Success", result); // Show success message
        setIsEdit(false);
      } else {
        Alert.alert("Update Failed", "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Email: </Text>
        <TextInput
          value={profile?.username || ""}
          autoCapitalize="none"
          style={{
            ...styles.input,
            flex: 0.7,
            color: "gray",
          }}
          editable={false}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Password: </Text>
        <TextInput
          value={profile?.password || ""}
          autoCapitalize="none"
          style={{
            ...styles.input,
            flex: 0.7,
            color: "gray",
          }}
          editable={false}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>FirstName: </Text>
        <TextInput
          value={firstname}
          onChangeText={setFirstname}
          autoCapitalize="none"
          style={{
            ...styles.input,
            flex: 0.7,
            color: isEdit ? "black" : "gray",
          }}
          editable={isEdit}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>LastName: </Text>
        <TextInput
          value={lastname}
          onChangeText={setLastname}
          autoCapitalize="none"
          style={{
            ...styles.input,
            flex: 0.7,
            color: isEdit ? "black" : "gray",
          }}
          editable={isEdit}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Phone: </Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          autoCapitalize="none"
          style={{
            ...styles.input,
            flex: 0.7,
            color: isEdit ? "black" : "gray",
          }}
          editable={isEdit}
        ></TextInput>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Student ID: </Text>
        <TextInput
          value={studentID}
          onChangeText={setStudentID}
          autoCapitalize="none"
          style={{
            ...styles.input,
            flex: 0.7,
            color: isEdit ? "black" : "gray",
          }}
          editable={isEdit}
        ></TextInput>
      </View>
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TouchableOpacity
          style={{ ...styles.blueBtn, flex: 0.45, borderRadius: 16 }}
          onPress={isEdit ? handleSave : edit}
        >
          <Text style={styles.blueBtnText}>{isEdit ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileComponent;
