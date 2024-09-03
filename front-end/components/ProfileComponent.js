import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect, memo } from "react";
import { useRoute } from "@react-navigation/native";
import styles from "../styles";


// Memoized Input Fields: ProfileInput is memoized using React.memo. This prevents it from re-rendering unless its props change.
const ProfileInput = memo(({ label, value, onChangeText, editable }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>{label}: </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          ...styles.input,
          flex: 0.7,
          color: editable ? "black" : "gray",
        }}
        editable={editable}
      />
    </View>
  );
});

const ProfileComponent = () => {
  const route = useRoute();
  const { token, profileToShow, mode } = route.params;
  const [profile, setProfile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [studentID, setStudentID] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const url = mode === "View"
      ? `http://localhost:8085/user/profile/${profileToShow}`
      : "http://localhost:8085/user/profile/self";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProfile(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setPhone(data.phone);
        setStudentID(data.studentID);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
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
        Alert.alert("Update Success", "Your profile has been updated.");
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
      <ProfileInput label="Email" value={profile?.username || ""} editable={false} />
      <ProfileInput label="FirstName" value={firstname} onChangeText={setFirstname} editable={isEdit} />
      <ProfileInput label="LastName" value={lastname} onChangeText={setLastname} editable={isEdit} />
      <ProfileInput label="Phone" value={phone} onChangeText={setPhone} editable={isEdit} />
      <ProfileInput label="Student ID" value={studentID} onChangeText={setStudentID} editable={isEdit} />
      {mode === "View"? null : (
        <View style={{ ...styles.widthControll, justifyContent: "center" }}>
          <TouchableOpacity
            style={{ ...styles.blueBtn, flex: 0.45, borderRadius: 16 }}
            onPress={isEdit ? handleSave : () => setIsEdit(true)}
          >
            <Text style={styles.blueBtnText}>{isEdit ? "Save Profile" : "Edit Profile"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileComponent;