import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';
import styles from "../styles";
import * as TokenService from '../services/tokenService';
import { StackActions, CommonActions } from '@react-navigation/native';
import API_BASE_URL from "../config";



// Memoized Input Fields: ProfileInput is memoized using React.memo. This prevents it from re-rendering unless its props change.
const ProfileInput = memo(({ label, value, onChangeText, editable }) => {
  return (
    <View>
      <Text style={{ ...styles.profileLabel }}>{label}: </Text>
      {editable ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          style={{
            ...styles.input,
            flex: 0.7,
            color: "black",
            backgroundColor: "white",
            paddingLeft: 15,
          }}
          editable={editable}
        />
      ) : (
        <Text style={{ ...styles.profileValue, color:"gray" }}>{value}</Text>
      )}
      <View style={styles.profileDivider} />
    </View>
  );
});

const ProfileComponent = ({ profileToShow}) => {
  const [profile, setProfile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [studentID, setStudentID] = useState("");

  const navigation = useNavigation();

  const fetchProfile = async () => {
    const url = `${API_BASE_URL}/user/profile/self`;
    try {
      const tokenRefreshed = await TokenService.refreshAccessToken();

      if (!tokenRefreshed) {
        console.log('Token refresh failed, not retrying fetch.');
        
        return;
      }

      const token = await TokenService.getAccessToken();

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const tokenRefreshed = await TokenService.refreshAccessToken();

      if (!tokenRefreshed) {
        console.log('Token refresh failed, not retrying fetch.');
        
        return;
      }

      const token = await TokenService.getAccessToken();

      const response = await fetch(
        `${API_BASE_URL}/user/profile/update`,
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

  const handleLogOut = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Log Out",
          onPress: () => {
            TokenService.removeTokens();
            TokenService.removeUserType();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Login' }, // The screen you want to navigate to
                ],
              })
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView>
      <ProfileInput label="Email" value={profile?.username || ""} editable={false} />
      <ProfileInput label="FirstName" value={firstname} onChangeText={setFirstname} editable={false} />
      <ProfileInput label="LastName" value={lastname} onChangeText={setLastname} editable={false} />
      <ProfileInput label="Phone" value={phone} onChangeText={setPhone} editable={isEdit} />
      <ProfileInput label="Student ID" value={studentID} onChangeText={setStudentID} editable={false} />
    
      <View style={{ ...styles.widthControll, justifyContent: "center" }}>
        <TouchableOpacity
          style={{ ...styles.blueBtn, flex: 0.45, borderRadius: 16 }}
          onPress={isEdit ? handleSave : () => setIsEdit(true)}
        >
          <Text style={styles.blueBtnText}>{isEdit ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.widthControll, justifyContent:"flex-end", marginTop:60}}>
        <TouchableOpacity
          onPress={handleLogOut}
          style={{ ...styles.blueBtn, backgroundColor:"white", flex: 0.45, borderRadius: 16, alignItems: "center", flexDirection:"row", justifyContent:"center"}}
        >
          <Feather name="log-out" size={25} color="red" />
          <Text style={{...styles.blueBtnText, color:"red", marginLeft: 5}}>Log Out</Text>
        </TouchableOpacity>
      </View>


    </ScrollView>
  );
};

export default ProfileComponent;