import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, SafeAreaView } from "react-native";
import API_BASE_URL from "../config";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import * as TokenService from "../services/tokenService";
import BottomNavigationBarComponent from "../components/BottomNavigationBarComponent";

const ChatListScreen = ({ route }) => {
  const { usertype } = route.params;
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
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
    fetchConversations();
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
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.username}</Text>
        <Text style={styles.lastMessage}>Tap to open chat</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 20}}></View>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.userID}
        renderItem={renderChatItem}
      />
      <BottomNavigationBarComponent usertype={usertype} />
    </SafeAreaView>
  );
};

export { ChatListScreen };
