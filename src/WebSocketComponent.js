import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function WebSocketComponent() {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Utwórz połączenie SockJS
    const socket = new SockJS('http://localhost:8084/ws');
    // Utwórz klienta STOMP
    const stomp = Stomp.over(socket);

    // Połącz się z serwerem
    stomp.connect({}, () => {
      setStompClient(stomp);
    });

    // Subskrybuj na kanał
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      // Ustaw funkcję obsługi wiadomości
      const handleReceiveMessage = (message) => {
        setMessages([...messages, message]);
      };

      // Subskrybuj na kanał
      stompClient.subscribe('/chat/c5d4408e-af84-40be-94a0-8e8862460d59', (response) => {
        handleReceiveMessage(JSON.parse(response.body));
      });
    }
  }, [stompClient]);

  const sendMessage = () => {
    if (stompClient) {
        const message = {
            fromUserId: '6c84fb96-12c4-11ec-82a8-0242ac130003', // zastąp odpowiednim UUID
            toUserId: '6c84fb9a-12c4-11ec-82a8-0242ac130003', // zastąp odpowiednim UUID
            content: 'Hello!',
            type: 'TEXT', // przykład typu wiadomości, dostosuj według potrzeb
            conversationId: '123e4567-e89b-12d3-a456-426614174002' // zastąp odpowiednim UUID
        };

        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
    }
};

  return (
    <div>
      <h1>WebSocket Example</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.content}</li>
        ))}
      </ul>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default WebSocketComponent;
