import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Message = ({ text, timestamp, isUser, avatar }) => {
  const messageClasses = isUser
    ? 'bg-blue-500 text-white self-end'
    : 'bg-blue-100 text-gray-800 self-start';
  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : ''}`}>
      <div className={`rounded-lg p-2 max-w-xs md:max-w-md lg:max-w-lg ${messageClasses}`}>
        <div>{text}</div>
        <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
      </div>
    </div>
  );
};

const MessageList = ({ messages }) => {
  const yourUsername = 'You';
  return (
    <div className="flex flex-col space-y-2 p-4 overflow-auto">
      {messages.map((messageObj, index) => (
        <Message
          key={index}
          text={messageObj.text}
          timestamp={messageObj.timestamp}
          isUser={messageObj.username === yourUsername}
        />
      ))}
    </div>
  );
};

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(storedMessages);
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (currentMessage.trim() === '') return;

    const newMessageObj = {
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      username: 'You'
    };

    const updatedMessages = [...messages, newMessageObj];
    setMessages(updatedMessages);
    setCurrentMessage('');

    const blob = new Blob([JSON.stringify(updatedMessages)], { type: 'application/json' });
    const fileData = new FormData();
    fileData.append("file", blob);

    try {
      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: process.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: process.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem('chatMessagesIPFSHash', responseData.data.IpfsHash);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col bg-gray-100">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-800">Chat ONN</h1>
      </div>
      <MessageList messages={messages} />
      <form onSubmit={handleSendMessage} className="mt-auto flex items-center bg-white p-4 shadow rounded-lg">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message here..."
          className="flex-1 border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
