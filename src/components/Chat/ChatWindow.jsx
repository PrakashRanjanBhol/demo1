import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import styles from "./ChatWindow.module.css";
import { marked } from "marked";
import DOMPurify from "dompurify";

const ChatWindow = ({ chat, sidebarOpen, setSidebarOpen }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typingText, setTypingText] = useState("");
    const [streamingResponse, setStreamingResponse] = useState("");
    const chatContentRef = useRef(null);

    // Consider chat "new" if chat is null/undefined or has isNew=true
    const isNewChat = !chat || chat.isNew;

    // Scroll to bottom on messages change
    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages]);

    // Load dummy messages on chat change
    useEffect(() => {
        setInput("");
        if (!chat) {
            setMessages([]);
            return;
        }
        const dummyHistories = {
            1: [
                { text: "Hi there!", sender: "user" },
                { text: "Hello! How can I assist you today?", sender: "ai" },
            ],
            2: [
                { text: "How to use React Router?", sender: "user" },
                { text: "You can use <Routes> and <Route> to define paths.", sender: "ai" },
            ],
            3: [
                { text: "Let's plan the sprint.", sender: "user" },
                { text: "Sure, what are the goals for this sprint?", sender: "ai" },
            ],
        };
        setMessages(dummyHistories[chat.id] || []);
    }, [chat]);

    // Typing effect for "What Can I Help You With?"
    useEffect(() => {
        if (isNewChat) {
            const fullText = "What Can I Help With?";
            let currentText = "";
            let index = 0;

            setTypingText(""); // reset

            const interval = setInterval(() => {
                if (index < fullText.length) {
                    currentText += fullText[index];
                    setTypingText(currentText);
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 60);

            return () => clearInterval(interval);
        } else {
            setTypingText("");
        }
    }, [chat, isNewChat]);

    // Check if there is at least one user message (to hide the typing text after first query)
    const hasUserMessage = messages.some((msg) => msg.sender === "user");

    const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStreamingResponse("");

    const fullAIResponse =
        "This is a **markdown** streaming response with `code`.\n\n```js\nconsole.log('Hello');\n```";

    const chunks = fullAIResponse.match(/.{1,10}/g); // split into chunks
    let i = 0;

    const streamChunk = () => {
        if (i < chunks.length) {
            setStreamingResponse((prev) => prev + chunks[i]);
            console.log("Chunk:", chunks[i]); // ← ✅ print each chunk
            i++;
            setTimeout(streamChunk, 80);
        } else {
            // Add final message and clear stream buffer
            setMessages((prev) => [
                ...prev,
                { text: fullAIResponse, sender: "ai", markdown: true },
            ]);
            setStreamingResponse("");
        }
    };

    streamChunk();
};



    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.ctrlKey) {
                e.preventDefault();
                const cursor = e.target.selectionStart;
                const newValue = input.substring(0, cursor) + "\n" + input.substring(cursor);
                setInput(newValue);
                setTimeout(() => {
                    e.target.selectionStart = e.target.selectionEnd = cursor + 1;
                }, 0);
            } else {
                e.preventDefault();
                sendMessage();
            }
        }
    };

    return (
        <div className={styles.chatContainer}>
            {messages.length > 0 && (
                <div className={styles.chatContent} ref={chatContentRef}>
                    {messages.length > 0 && (
                        <div className={styles.chatContent} ref={chatContentRef}>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={
                                        msg.sender === "user" ? styles.userMessage : styles.aiMessage
                                    }
                                >
                                    {msg.markdown ? (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(marked.parse(msg.text)),
                                            }}
                                        />
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            ))}

                            {streamingResponse && (
                                <div className={styles.aiMessage}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(marked.parse(streamingResponse)),
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                </div>
            )}

            <div
                className={
                    messages.length === 0
                        ? styles.centeredInputWrapper
                        : styles.bottomInputWrapper
                }
            >
                <div className={styles.inputSection}>
                    <div className={styles.typingHeading}>
                        {isNewChat && typingText && !hasUserMessage ? typingText : "\u00A0"}
                    </div>

                    <div className={styles.inputArea}>
                        <InputTextarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            autoResize
                            placeholder="Type your message..."
                            className={styles.textarea}
                        />
                        <Button
                            icon="pi pi-send"
                            className={styles.sendButton}
                            onClick={sendMessage}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChatWindow;
