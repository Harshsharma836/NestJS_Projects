// src/App.jsx
import React, { useState } from 'react';
import LoginPage from './components/login.page';
import ChatPage from './components/chat.page';

const App = () => {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div>
      {!token ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <ChatPage token={token} />
      )}
    </div>
  );
};

export default App;
