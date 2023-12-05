// src/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatPage = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      auth: {
        token,
      },
    });

    socket.on('personalMessage', ({ from, message }) => {
      setMessages([...messages, { from, message }]);
    });

    socket.on('personalMessageError', ({ to, message }) => {
      console.error(`Error sending message to ${to}: ${message}`);
    });

    return () => {
      socket.off('personalMessage');
      socket.off('personalMessageError');
    };
  }, [token, messages]);

  const sendMessage = () => {
    const socket = io('http://localhost:3001', {
      auth: {
        token,
      },
    });

    socket.emit('personalMessage', { to: recipient, message: newMessage });
    setMessages([...messages, { from: 'Me', message: newMessage }]);
    setNewMessage('');
  };

  return (
    <div>
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.from}: {msg.message}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
