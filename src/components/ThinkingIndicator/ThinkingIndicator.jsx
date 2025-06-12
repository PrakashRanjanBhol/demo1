import React from 'react';
import './ThinkingIndicator.css'; // assuming you save the above CSS here

const ThinkingIndicator = () => {
    return (
        <div className="thinking-container">
            Thinking
            <span className="dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
            </span>
        </div>
    );
};

export default ThinkingIndicator;


// {isStreaming && <ThinkingIndicator />}
