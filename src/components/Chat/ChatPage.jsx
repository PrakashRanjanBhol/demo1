import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import styles from './ChatPage.module.css';

const ChatPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className={styles.chatPage}>
            <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
                <ChatSidebar onSelectChat={handleSelectChat} />
            </div>
            <div className={styles.chatContent}>
                {/* Header removed */}
                <ChatWindow
                    chat={selectedChat}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    onUpdateChat={(updatedChat) => {
                        setSelectedChat(updatedChat); // very important
                    }}
                />

            </div>
        </div>
    );
};

export default ChatPage;
