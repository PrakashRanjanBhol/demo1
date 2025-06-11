import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import styles from './ChatPage.module.css';
import { ChatContext } from "../../context/ChatContext";

const ChatPage = () => {
    const chatHistoryList = [
        { id: 1, title: 'Chat with AI', date: '2025-06-09', time: '10:30 AM' },
        { id: 2, title: 'React Help', date: '2025-06-08', time: '6:45 PM' },
        { id: 3, title: 'Project Planning', date: '2025-06-07', time: '3:15 PM' },
    ];

    const chatHistoryDetails = [
        { id: 1, prompt: "Hi there!", response: "Hi this is the answer" },
        { id: 2, prompt: "Hello there!", response: "Hello this is the answer" }
    ];

    const [chats, setChats] = useState(chatHistoryList);
    const [chatDetails, setChatDetails] = useState(chatHistoryDetails);
    const [selectedChat, setSelectedChat] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [isNewChat, setIsNewChat] = useState(true);

    return (
        <ChatContext.Provider value={{ chats, setChats, selectedChat, setSelectedChat, chatDetails, setChatDetails, prompt, setPrompt, isNewChat, setIsNewChat }}>
            <div className={styles.chatPage}>
                <div className={`${styles.sidebar} ${styles.open}`}>
                    <ChatSidebar />
                </div>
                <div className={styles.chatContent}>
                    <ChatWindow />
                </div>
            </div>
        </ChatContext.Provider>
    );
};

export default ChatPage;
