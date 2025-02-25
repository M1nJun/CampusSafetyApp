import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, SafeAreaView } from 'react-native';
import API_BASE_URL from '../config';
import { useNavigation } from '@react-navigation/native';
import * as TokenService from '../services/tokenService';
import BottomNavigationBarComponent from '../components/BottomNavigationBarComponent';
import styles from '../styles'; // Ensure styles are properly imported

const ChatScreen = ({ route }) => {
  const { receiverID, usertype } = route.params; // receiverID is now passed, but we'll update it from API response
  const [chatWith, setChatWith] = useState('');
  const [chatWithID, setChatWithID] = useState('');
  const [myID, setMyID] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await TokenService.getAccessToken();
        const response = await fetch(`${API_BASE_URL}/chat/history?receiverID=${receiverID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Chat History Fetched:", data); // Debugging log
        
        // Set new state values from API response
        setChatWith(data.chatWith); // Name of the person we're chatting with
        setChatWithID(data.chatWithID); // Their ID
        setMyID(data.myID); // Our own ID from the API
        setMessages(data.messages); // The list of messages

      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchMessages();
  }, [receiverID]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const token = await TokenService.getAccessToken();
      await fetch(`${API_BASE_URL}/chat/sendMessage`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverID: chatWithID, messageContent: newMessage }),
      });

      const newChatMessage = {
        senderID: myID, 
        receiverID: chatWithID,
        messageContent: newMessage,
        messageTimestamp: new Date().toISOString(), // Simulating timestamp
      };

      // Add new message to chat history
      setMessages((prevMessages) => [...prevMessages, newChatMessage]);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display Chat Partner's Name */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderText}>{chatWith}</Text>
      </View>

      {/* Display Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.senderID === myID ? styles.senderMessage : styles.receiverMessage
          ]}>
            <Text style={item.senderID === myID ? styles.senderText : styles.receiverText}>
              {item.messageContent}
            </Text>
          </View>
        )}
      />

      {/* Message Input and Send Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNavigationBarComponent usertype={usertype} />
    </SafeAreaView>
  );
};

export { ChatScreen };
