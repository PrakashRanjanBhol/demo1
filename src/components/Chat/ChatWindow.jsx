import React, { useContext, useEffect, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { ChatContext } from "../../context/ChatContext";
import styles from "./ChatWindow.module.css";
import SourceDropdown from "./SourceDropdown";

const ChatWindow = () => {
    const {
        chatDetails,
        setChatDetails,
        prompt,
        setPrompt,
        isNewChat,
        setIsNewChat
    } = useContext(ChatContext);

    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [showAllImages, setShowAllImages] = useState(false);
    const [modalImages, setModalImages] = useState([]);

    const [typingText, setTypingText] = useState("");

    useEffect(() => {
        if (isNewChat) {
            const fullText = "What Can I Help With?";
            let currentText = "";
            let index = 0;

            setTypingText("");

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
    }, [isNewChat]); // ✅ no need for [chat, isNewChat] unless `chat` affects it






    const askQuery = (e) => {
        if ((e.key === "Enter" && !e.shiftKey) || e.type === "click") {
            e.preventDefault?.();

            if (isNewChat)
                setIsNewChat(false);

            const newMessage = {
                id: chatDetails.length + 1,
                prompt: prompt,
                response: "Hi this is the answer",
                images: [...uploadedImages], // ✅ store image URLs
            };

            setChatDetails((prevDetails) => [...prevDetails, newMessage]);
            setPrompt("");
            setUploadedImages([]); // Clear uploaded images after sending

            setTimeout(() => {
                chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 0);
        }
    };

    const handleUpload = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setUploadedImages((prev) => [...prev, ...imagePreviews]);
    };

    return (
        <div
            className={styles.chatContainer}
            style={
                isNewChat
                    ? {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }
                    : {}
            }
        >
            {!isNewChat && (
                <div className={styles.chatContent}>
                    {chatDetails.map((msg) => (
                        <React.Fragment key={msg.id}>
                            <div className={styles.userMessage}>
                                <div>{msg.prompt}</div>

                                {msg.images && msg.images.length > 0 && (
                                    <div className={styles.imagePreviewContainer}>
                                        {msg.images.slice(0, 5).map((img, idx) => (
                                            <img key={idx} src={img} className={styles.previewImage} />
                                        ))}
                                        {msg.images.length > 5 && (
                                            <div
                                                className={styles.moreImages}
                                                onClick={() => {
                                                    setShowAllImages(true);
                                                    setModalImages(msg.images);
                                                }}
                                            >
                                                +{msg.images.length - 5} Images
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className={styles.aiMessage}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(marked.parse(msg.response)),
                                    }}
                                />
                            </div>
                        </React.Fragment>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            )}

            {/* Input Section (Always Shown) */}
            <div
                className={styles.bottomInputWrapper}
            >
                {isNewChat && typingText && (
                    <div className={styles.typingText}>{typingText}</div>
                )}


                <div className={styles.promptBox}>
                    {uploadedImages.length > 0 && (
                        <div className={styles.imagePreviewContainer}>
                            {uploadedImages.slice(0, 3).map((img, index) => (
                                <img key={index} src={img} className={styles.previewImage} />
                            ))}
                            {uploadedImages.length > 3 && (
                                <div
                                    className={styles.moreImages}
                                    onClick={() => setShowAllImages(true)}
                                >
                                    +{uploadedImages.length - 3} Images
                                </div>
                            )}
                        </div>
                    )}

                    <InputTextarea
                        rows={1}
                        autoResize
                        placeholder="Type your message..."
                        className={styles.textarea}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={askQuery}
                    />

                    <div className={styles.buttonRow}>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleUpload}
                        />

                        <Button
                            icon="pi pi-upload"
                            className={styles.iconButton}
                            text
                            rounded
                            severity="secondary"
                            aria-label="Upload"
                            onClick={() => fileInputRef.current.click()}
                        />

                        <div className="d-flex gap-3 align-items-center justify-content-end">
                            <SourceDropdown onSelect={(value) => console.log("Selected Source:", value)} />

                            <Button
                                icon="pi pi-send"
                                className={styles.sendButton}
                                text
                                rounded
                                severity="primary"
                                aria-label="Send"
                                onClick={askQuery}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                header="Uploaded Images"
                visible={showAllImages}
                style={{ width: "50vw" }}
                onHide={() => setShowAllImages(false)}
                draggable={false}
                resizable={false}
            >
                <div className={styles.modalImagesContainer}>
                    {uploadedImages.map((img, index) => (
                        <img key={index} src={img} className={styles.modalImage} />
                    ))}
                </div>
            </Dialog>
        </div>
    );
};

export default ChatWindow;
