import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const API_BASE_URL = 'http://localhost:8085';  // Update with your backend URL

const ChatListScreen = ({ navigation }) => {
    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChatList();
    }, []);

    const fetchChatList = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat/conversations`, {
                headers: {
                    Authorization: `Bearer YOUR_JWT_TOKEN`,  // Replace dynamically in production
                },
            });
            const data = await response.json();
            setChatList(data);
        } catch (error) {
            console.error('Error fetching chats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <FlatList
                data={chatList}
                keyExtractor={(item) => item.userID}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { userID: item.userID, username: item.username })}>
                        <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                            <Text style={{ fontSize: 18 }}>{item.username}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default ChatListScreen;
