import { useEffect, useState, useRef } from 'react';
import { Connect, User, Message } from '../pb/chat_pb';
import { BroadcastClient } from '../pb/chat_grpc_web_pb';

export type IMessage = {
  from: string;
  message: string;
};

const useMessages = (
  userId: string,
  username: string,
  client: BroadcastClient,
) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const mounted = useRef(false);

  useEffect(() => {
    const getMessage = () => {
      const user = new User();
      user.setId(userId);
      user.setName(username);

      const connection = new Connect();
      connection.setUser(user);
      connection.setActive(true);
      const stream = client.createStream(connection);

      stream.on('data', (m) => {
        if (!m) {
          return;
        }

        setMessages((current) => {
          return [...current, { from: m.getId(), message: m.getContent() }];
        });
      });
    };

    if (!mounted.current) {
      getMessage();
    } else {
      mounted.current = true;
    }
  }, [userId, username, client]);

  const sendMessage = (from: string, message: string) => {
    const req = new Message();
    req.setId(from);
    req.setContent(message);
    client.broadcastMessage(req, {}, (err, _) => {
      if (err) {
        console.log(err);
      }
    });
  };

  return { messages, sendMessage };
};

export default useMessages;
