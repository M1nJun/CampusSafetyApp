import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, SafeAreaView } from "react-native";
import API_BASE_URL from "../config";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import * as TokenService from "../services/tokenService";
import BottomNavigationBarComponent from "../components/BottomNavigationBarComponent";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ChatListScreen = ({ route }) => {
  const { usertype } = route.params;
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  const fetchConversations = async () => {
    const token = await TokenService.getAccessToken();
    try {
      const response = await fetch(`${API_BASE_URL}/chat/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      } else {
        console.error("Failed to fetch conversations");
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchConversations(); // Fetch immediately when component mounts

    const interval = setInterval(() => {
      fetchConversations(); // Refresh every 2 seconds
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  // Component for rendering each chat item
  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatScreen", {
          receiverID: item.userID,
          receiverName: item.username,
          usertype,
        })
      }
      style={styles.chatItem}
    >
      <FontAwesome name="user-circle" size={50} color="gray" style={{marginRight:15}} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.username}</Text>
        <Text style={styles.lastMessage}>Tap to open chat</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 20}}></View>
      {conversations.length === 0 ? (
        // Show message when there are no conversations
        <View style={{ alignItems: "center", marginBottom: 550 }}>
          <Text style={{ fontSize: 18, color: "gray", marginTop: 100 }}>No conversations yet</Text>
          <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>
            Start a conversation by messaging someone.
          </Text>
        </View>
      ) : (
        // Show conversations if they exist
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.userID.toString()}
          renderItem={renderChatItem}
        />
      )}
      <BottomNavigationBarComponent usertype={usertype} />
    </SafeAreaView>
  );
};

export { ChatListScreen };
