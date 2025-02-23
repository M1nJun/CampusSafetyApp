import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import moment from 'moment';

const API_BASE_URL = 'http://localhost:8085';

const ChatScreen = ({ route }) => {
    const { userID, username } = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        fetchChatHistory();
        setupWebSocket();

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, []);

    const fetchChatHistory = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat/history?receiverID=${userID}`, {
                headers: { Authorization: `Bearer YOUR_JWT_TOKEN` },
            });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const setupWebSocket = () => {
        const socket = new SockJS(`${API_BASE_URL}/ws`);
        const stomp = Stomp.over(socket);
        stomp.connect({}, () => {
            stomp.subscribe(`/user/${userID}/queue/messages`, (msg) => {
                const newMessage = JSON.parse(msg.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });
        setStompClient(stomp);
    };

    const sendMessage = () => {
        if (stompClient && message.trim()) {
            const chatMessageDTO = {
                receiverID: userID,
                messageContent: message,
            };
            stompClient.send('/app/sendMessage', {}, JSON.stringify(chatMessageDTO));
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.senderID === userID ? styles.receiver : styles.sender]}>
                        <Text style={styles.messageText}>{item.messageContent}</Text>
                        <Text style={styles.timestamp}>{moment(item.messageTimestamp).format('hh:mm A')}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    messageContainer: { padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: '75%' },
    sender: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
    receiver: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
    messageText: { fontSize: 16, color: '#fff' },
    timestamp: { fontSize: 12, color: '#ccc', marginTop: 5, textAlign: 'right' },
    inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
    input: { flex: 1, borderWidth: 1, borderRadius: 5, padding: 10, marginRight: 10 },
});

export default ChatScreen;
