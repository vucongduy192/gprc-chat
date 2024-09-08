import React, { ChangeEvent, useState } from 'react';
import { Button, IconButton, TextField, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';

export type ChatFormProps = {
  userId: string;
  sendMessage: (user: string, message: string) => void;
};

const ChatForm: React.FC<ChatFormProps> = ({
  userId,
  sendMessage,
}: ChatFormProps) => {
  const [message, setMessage] = useState('');
  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        marginTop: '10px',
        borderRadius: '8px',
      }}
    >
      <TextField
        multiline
        maxRows={4}
        value={message}
        onChange={onChangeMessage}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            setMessage('');
            sendMessage(userId, message);
          }
        }}
        placeholder="Type a message..."
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          marginLeft: '8px',
          marginRight: '8px',
          backgroundColor: '#f4f6f8',
          borderRadius: '4px',
        }}
      />
      <IconButton onClick={() => sendMessage(userId, message)}>
        <Send />
      </IconButton>
    </Paper>
  );
};

export default ChatForm;
