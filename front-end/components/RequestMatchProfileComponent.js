import { theme } from "../colors";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Linking
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { openURL, canOpenURL } from 'expo-linking';
import MiniProfileComponent from "./MiniProfileComponent";
import * as TokenService from '../services/tokenService';
import API_BASE_URL from "../config";

const RequestMatchProfileComponent = ({ usertype, nameToShow, profileToShow }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility

  const fetchProfileData = async () => {
    try {
      const tokenRefreshed = await TokenService.refreshAccessToken();

      if (!tokenRefreshed) {
        console.log('Token refresh failed, not retrying fetch.');
        
        return;
      }

      const token = await TokenService.getAccessToken();

      const response = await fetch(
        `${API_BASE_URL}/user/profile/${profileToShow}`,
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

  const handleMessageIconPress = async () => {
    const phoneNumber = `sms:${profileData.phone}`;
    const supported = await Linking.canOpenURL(phoneNumber);
  
    if (supported) {
      Linking.openURL(phoneNumber);
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
          <TouchableOpacity
            style={{ marginRight: 15, backgroundColor: '#e2eafc', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 8 }}
            onPress={handleMessageIconPress}>
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
            <MiniProfileComponent name={usertype === 'Student' || usertype === 'Faculty' ? nameToShow : `${profileData.firstname} ${profileData.lastname}`} phone={profileData.phone} email={profileData.username} studentID={profileData.studentID} type={profileData.usertype}/>
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
