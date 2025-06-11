import React, { useContext } from 'react';
import styles from './ChatSidebar.module.css';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ChatContext } from "../../context/ChatContext";

const ChatSidebar = () => {
    const { chats, selectedChat, setSelectedChat, setIsNewChat } = useContext(ChatContext);

    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Your Chats</h2>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
                <InputText
                    value=""
                    placeholder="Search..."
                    className={styles.searchInput}
                    style={{ flex: 1, fontSize: '0.85rem' }}
                    readOnly
                />
                <Button
                    icon="pi pi-plus"
                    className={styles.newChatBtn}
                    severity="secondary"
                    tooltip="New Chat"
                    rounded
                    text
                    style={{ width: '2rem', height: '2rem', fontSize: '0.85rem' }}
                    onClick={() => setIsNewChat(true)}
                />
            </div>

            <ul className={styles.chatList}>
                {chats.map((chat, index) => (
                    <li key={chat.id} className={`${styles.chatItem} ${selectedChat?.id === chat?.id ? styles.selected : ''}`} onClick={() => {
                        setSelectedChat(chat);
                        setIsNewChat(false); // or any other logic
                    }}
                    >
                        <div className={styles.chatDetails}>
                            <i className={`pi pi-comments ${styles.chatIcon}`} />
                            <div className={styles.chatText}>
                                <span className={styles.chatTitle}>{chat.title}</span>
                                <span className={styles.chatTimestamp}>
                                    {chat.date} • {chat.time}
                                </span>
                            </div>
                        </div>

                        <div className={styles.optionsIcon}>
                            <i className="pi pi-ellipsis-v" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;
