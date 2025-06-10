import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatSidebar.module.css';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';

const dummyChats = [
    { id: 1, title: 'Chat with AI', date: '2025-06-09', time: '10:30 AM' },
    { id: 2, title: 'React Help', date: '2025-06-08', time: '6:45 PM' },
    { id: 3, title: 'Project Planning', date: '2025-06-07', time: '3:15 PM' },
];

const ChatSidebar = ({ onSelectChat }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [chats, setChats] = useState(dummyChats);
    const [searchTerm, setSearchTerm] = useState('');
    const overlayRefs = useRef({});
    const nextId = useRef(4);

    useEffect(() => {
        const handleAddNewChat = (e) => {
            const chat = { ...e.detail };
            chat.id = nextId.current++;
            setChats((prev) => [chat, ...prev]);
            setSelectedId(chat.id);
        };

        window.addEventListener("add-new-chat", handleAddNewChat);
        return () => window.removeEventListener("add-new-chat", handleAddNewChat);
    }, []);


    const handleSelect = (chat) => {
        onSelectChat(chat);
        setSelectedId(chat.id);
    };

    const handleOverlayToggle = (e, id) => {
        e.stopPropagation();
        overlayRefs.current[id]?.toggle(e);
    };

    const handleDelete = (id) => {
        setChats((prev) => prev.filter((chat) => chat.id !== id));
        overlayRefs.current[id]?.hide();
    };

    const handleEdit = (id) => {
        console.log("Edit chat:", id);
        overlayRefs.current[id]?.hide();
    };

    const handleCreateNewChat = () => {
        const now = new Date();
        const newChat = {
            id: nextId.current,
            title: '', // initially blank title
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isNew: true, // custom flag
        };
        setSelectedId(newChat.id);
        onSelectChat(newChat);
    };

    const filteredChats = chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Your Chats</h2>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
                <InputText
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className={styles.searchInput}
                    style={{ flex: 1, fontSize: '0.85rem' }}
                />
                <Button
                    icon="pi pi-plus"
                    className={styles.newChatBtn}
                    severity="secondary"
                    onClick={handleCreateNewChat}
                    tooltip="New Chat"
                    rounded
                    text
                    style={{ width: '2rem', height: '2rem', fontSize: '0.85rem' }}
                />

            </div>

            <ul className={styles.chatList}>
                {filteredChats.map((chat) => (
                    <li
                        key={chat.id}
                        className={`${styles.chatItem} ${selectedId === chat.id ? styles.selected : ''}`}
                        onClick={() => handleSelect(chat)}
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

                        <div
                            className={styles.optionsIcon}
                            onClick={(e) => handleOverlayToggle(e, chat.id)}
                        >
                            <i className="pi pi-ellipsis-v" />
                            <OverlayPanel
                                ref={(el) => (overlayRefs.current[chat.id] = el)}
                                dismissable
                                style={{ padding: '0.5rem', minWidth: '100px' }}
                            >
                                <div
                                    style={{ padding: '0.3rem', cursor: 'pointer' }}
                                    onClick={() => handleEdit(chat.id)}
                                >
                                    ✏️ Edit
                                </div>
                                <div
                                    style={{ padding: '0.3rem', cursor: 'pointer', color: 'red' }}
                                    onClick={() => handleDelete(chat.id)}
                                >
                                    🗑️ Delete
                                </div>
                            </OverlayPanel>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;
