import useMessages from './hooks/useMessages';
import { useMemo, useEffect, useState, useRef } from 'react';
import ChatBox from './components/ChatBox';
import ChatForm from './components/ChatForm';
import { BroadcastClient } from './pb/chat_grpc_web_pb';
import './App.css';

function App() {
  const client = useMemo(
    () => new BroadcastClient('http://localhost:8080'),
    [],
  );
  const userId = useRef(`${Date.now()}`);
  const { messages, sendMessage } = useMessages(userId.current, 'User', client);

  return (
    <div className="App">
      <h1>Chat App</h1>
      <ChatBox userId={userId.current} messages={messages}></ChatBox>
      <ChatForm userId={userId.current} sendMessage={sendMessage}></ChatForm>
    </div>
  );
}

export default App;
