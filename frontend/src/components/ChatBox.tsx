import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { IMessage } from '../hooks/useMessages';

export type ChatBoxProps = {
  userId: string;
  messages: IMessage[];
};

const ChatBox: React.FC<ChatBoxProps> = ({
  userId,
  messages,
}: ChatBoxProps) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          height: '400px', // Adjust height as needed
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        {messages.map(({ from, message }: IMessage, key: number) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '8px',
              alignItems: from === userId ? 'flex-end' : 'flex-start',
            }}
          >
            <Typography variant="caption" color="textSecondary">
              {from}
            </Typography>
            <Paper
              elevation={2}
              sx={{
                padding: '10px',
                backgroundColor: from === userId ? '#e3f2fd' : '#f4f6f8',
                maxWidth: '70%',
                borderRadius: '12px',
                wordWrap: 'break-word',
              }}
            >
              <Typography variant="body1">{message}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ChatBox;
