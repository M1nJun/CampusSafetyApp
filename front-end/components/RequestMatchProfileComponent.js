import { theme } from "../colors";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { openURL, canOpenURL } from 'expo-linking';
import ProfileComponent from './ProfileComponent'; // Import the ProfileComponent

const RequestMatchProfileComponent = ({ token, usertype, nameToShow, profileToShow }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility
  const mode = "View";

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8085/user/profile/${profileToShow}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        Alert.alert('Error', 'Fail to fetch the profile data.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching the profile data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handlePhoneIconPress = async () => {
    const phoneNumber = `tel:${profileData.phone}`;
    const supported = await canOpenURL(phoneNumber);

    if (supported) {
      openURL(phoneNumber);
    } else {
      Alert.alert("Error", "Your device doesn't support this feature.");
    }
  };

  const handleProfilePress = () => {
    setModalVisible(true); // Show the modal when the profile is pressed
  };

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>No data found.</Text>
      </View>
    );
  }

  return (
    <View style={{ marginLeft: 20, marginBottom: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={handleProfilePress} // Open modal instead of navigating
        >
          <FontAwesome name="user-circle" size={50} color="gray" />
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              {usertype === 'Student' || usertype === 'Faculty' ? nameToShow : `${profileData.firstname} ${profileData.lastname}`}
            </Text>
            <Text style={{ color: 'gray' }}>Profile</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 15, backgroundColor: '#e2eafc', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 8 }}>
            <MaterialIcons name="message" size={25} color="#00a6fb" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10, backgroundColor: '#e2eafc', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 8 }}
            onPress={handlePhoneIconPress}
          >
            <MaterialIcons name="call" size={25} color="#00a6fb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for displaying profile */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: '90%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <ProfileComponent token={token} profileToShow={profileToShow} mode={mode} />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#00a6fb' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RequestMatchProfileComponent;
