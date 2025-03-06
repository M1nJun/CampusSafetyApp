import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import API_BASE_URL from '../config';
import { useNavigation } from '@react-navigation/native';
import * as TokenService from '../services/tokenService';
import BottomNavigationBarComponent from '../components/BottomNavigationBarComponent';
import styles from '../styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Keyboard } from 'react-native';

const ChatScreen = ({ route }) => {
  const { receiverID, usertype } = route.params;
  const [chatWith, setChatWith] = useState('');
  const [chatWithID, setChatWithID] = useState('');
  const [myID, setMyID] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    // Listen for keyboard show/hide events to adjust the UI:
    // - When the keyboard appears, we update `keyboardHeight` with the keyboard's height from event.endCoordinates.height.
    //   This height is then used as bottom padding in the FlatList's contentContainerStyle so that messages aren't hidden behind the keyboard.
    //   Additionally, we scroll the FlatList to the end to keep the latest messages in view.
    // - When the keyboard hides, we reset the keyboardHeight to 0.
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
      flatListRef.current.scrollToEnd({ animated: true });
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
      
      setChatWith(data.chatWith);
      setChatWithID(data.chatWithID);
      setMyID(data.myID);
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval);
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
        messageTimestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newChatMessage]);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Adjust this value as needed
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatHeaderText}>{chatWith}</Text>
        </View>
        
        <FlatList
          ref={flatListRef}
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
          contentContainerStyle={{ marginBottom: keyboardHeight }}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message"
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={sendMessage}
          >
            <FontAwesome5 name="arrow-up" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export { ChatScreen };
