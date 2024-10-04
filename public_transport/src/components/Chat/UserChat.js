import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { UserContext } from '../../App';
import { db } from '../../config/firebase';
import { ref, set, get, onValue } from 'firebase/database';
import Spinner from '../Mutual/Spinner';

const socket = io('http://localhost:5000');

const UserChat = () => {
  const [admins, setAdmins] = useState({});
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [user] = useContext(UserContext); // Ensure user is retrieved from context

  // Check if user exists, if not create the user in Firebase
  useEffect(() => {
    if (user && user._id) {
      const userRef = ref(db, `users/${user._id}`);

      get(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
          // If user doesn't exist, create the user in Firebase
          set(userRef, {
            username: user.username || 'Unknown User',
            type: 'USER',
          });
        }
      });
    }
    else{}
  }, [user]);

  // Fetch admins from Firebase and handle real-time chat messages
  useEffect(() => {
    if (!user || user.type === 'ADMIN') {
      return; // If no user or user is an admin, skip processing
    }

    if (user._id) {
      // Fetch admin list from Firebase
      const adminsRef = ref(db, 'admins');
      onValue(adminsRef, (snapshot) => {
        const adminsData = snapshot.val() || {};
        setAdmins(adminsData);
      });

      socket.on('chatMessage', (data) => {
        setChat((prevChat) => [...prevChat, data]);
      });

      return () => {
        socket.off('chatMessage');
      };
    }
    else{

    }
  }, [user]);

  // Fetch chat history for selected admin
  useEffect(() => {
    if (!user || user.type === 'ADMIN') {
      return; // Skip if user is invalid
    }

    if (selectedAdmin && user && user._id) {
      socket.emit('userJoinRoom', { userId: user._id, adminId: selectedAdmin });

      // Fetch chat history from Firebase
      const chatRef = ref(db, `chats/${user._id}/${selectedAdmin}`);
      onValue(chatRef, (snapshot) => {
        setChat(Object.values(snapshot.val() || {}));
      });
    }
    else{}
  }, [selectedAdmin, user]);

  const sendMessage = async () => {
    if (!user || user.type === 'ADMIN' || !selectedAdmin) return;

    if (message.trim()) {
      const messageData = {
        sender: user._id,
        message,
        timestamp: Date.now(),
      };

      const chatRef = ref(db, `chats/${user._id}/${selectedAdmin}`);

      try {
        // Get current messages
        const snapshot = await get(chatRef);
        const currentMessages = snapshot.val() || {};

        // Add new message
        const updatedMessages = {
          ...currentMessages,
          [Date.now()]: messageData,
        };

        // Set updated messages
        await set(chatRef, updatedMessages);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // If user is invalid, display an error message
  if (!user || user.type === 'ADMIN') {
    return <Typography>Không có dữ liệu người dùng hoặc tài khoản không hợp lệ.</Typography>;
  }

  return (
    <Grid container spacing={2} style={{ height: '90vh', padding: '16px' }}>
      <Grid item xs={4} style={{ height: 'calc(90vh - 32px)', display: 'flex', flexDirection: 'column' }}>
        <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" style={{ padding: '16px' }}>
            Danh sách quản trị viên
          </Typography>
          <List style={{ flex: 1, overflowY: 'auto' }}>
            {Object.keys(admins).length > 0 ? (
              Object.keys(admins).map((adminId) => (
                <ListItem
                  button
                  key={adminId}
                  onClick={() => setSelectedAdmin(adminId)}
                  selected={selectedAdmin === adminId}
                >
                  <ListItemText primary={admins[adminId]?.username || 'Unknown Admin'} />
                </ListItem>
              ))
            ) : (
              <Spinner/>
            )}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={8} style={{ height: 'calc(90vh - 32px)', display: 'flex', flexDirection: 'column' }}>
        <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {selectedAdmin ? (
            <>
              <Box style={{ padding: '16px' }}>
                <Typography variant="h6">
                  {admins[selectedAdmin]?.username || 'Unknown Admin'}
                </Typography>
              </Box>

              <Box style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {chat.length > 0 ? (
                  chat.map((msg, index) => (
                    <Stack
                      key={index}
                      direction={msg.sender === user._id ? 'row-reverse' : 'row'}
                      spacing={2}
                      style={{
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          backgroundColor:
                            msg.sender === user._id ? '#3f51b5' : '#e0e0e0',
                          color: msg.sender === user._id ? '#fff' : '#000',
                          maxWidth: '60%',
                        }}
                      >
                        {msg.message}
                      </Typography>
                    </Stack>
                  ))
                ) : (
                  <Typography>Không có tin nhắn nào.</Typography>
                )}
              </Box>

              <Box style={{ padding: '16px', display: 'flex', alignItems: 'center', borderTop: '1px solid #ddd' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Nhập tin nhắn..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '16px' }}
                  onClick={sendMessage}
                >
                  Gửi
                </Button>
              </Box>
            </>
          ) : (
            <Box style={{ padding: '16px' }}>
              <Typography variant="h6">Chọn quản trị viên để bắt đầu chat</Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserChat;
