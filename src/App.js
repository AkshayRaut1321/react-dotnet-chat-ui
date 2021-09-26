import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './Components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './Components/Chat';

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [userName, setUser] = useState();
  const [room, setRoom] = useState();

  const joinRoom = async (userName, room) => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:44311/chat')
        .configureLogging(LogLevel.Information)
        .build();
      newConnection.on("ReceiveMessages", (userName, message) => {
        console.log('user:', userName, 'message', message);
        // messages.push({ user, message });
        setMessages(messages => [...messages, { userName, message }]);
        // messages.push({ userName, message });
        // setMessages(messages);
      });

      await newConnection.start();
      await newConnection.invoke("JoinRoom", { userName, room });

      setConnection(newConnection);
      setUser(userName);
      setRoom(room);
    }
    catch (e) {
      console.error('Unexpected error while joining', e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    }
    catch (e) {
      console.error('Unexpected error while sending message', e);
    }
  };

  return <div className='app'>
    <h2>My Chat</h2>
    <hr className='line'></hr>
    {
      !connection ? <Lobby joinRoom={joinRoom}></Lobby>
        : <Chat messages={messages} sendMessage={sendMessage} currentUser={userName}></Chat>
    }
  </div>;
}

export default App;
