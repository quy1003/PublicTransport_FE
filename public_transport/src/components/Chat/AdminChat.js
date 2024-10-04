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
import { ref, get, onValue, set } from 'firebase/database';
import Spinner from '../Mutual/Spinner';

const socket = io('http://localhost:5000');

const AdminChat = () => {
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (user && user._id) {
      // Lấy danh sách users từ nhánh chats có lịch sử với admin
      const chatsRef = ref(db, `chats`);
      onValue(chatsRef, (snapshot) => {
        const chatsData = snapshot.val() || {};
        const usersWhoChatted = {};

        // Duyệt qua danh sách các users đã chat với admin (user._id là adminId)
        Object.keys(chatsData).forEach((userId) => {
          if (chatsData[userId][user._id]) {  // Nếu admin đã chat với user này
            usersWhoChatted[userId] = true;  // Đánh dấu user là đã chat với admin
          }
        });

        if (Object.keys(usersWhoChatted).length > 0) {
          const usersRef = ref(db, `users`);
          get(usersRef).then((snapshot) => {
            const allUsers = snapshot.val() || {};
            const filteredUsers = {};

            // Chỉ giữ lại những user đã có lịch sử chat với admin
            Object.keys(allUsers).forEach((userId) => {
              if (usersWhoChatted[userId]) {
                filteredUsers[userId] = allUsers[userId];
              }
            });

            setUsers(filteredUsers);
          });
        }
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
  useEffect(() => {
    if (user && user._id && user.type === 'ADMIN') {
      const adminRef = ref(db, `admins/${user._id}`);
  
      // Check if the admin exists in Firebase
      get(adminRef).then((snapshot) => {
        if (!snapshot.exists()) {
          // If admin does not exist, create a new entry in Firebase
          const newAdminData = {
            _id: user._id,
            username: user.username || 'Admin', // Use username or default to 'Admin'
            type: 'ADMIN',
          };
  
          set(adminRef, newAdminData)
            .then(() => {
              console.log('Admin information added to Firebase');
            })
            .catch((error) => {
              console.error('Error creating admin:', error);
            });
        }
      }).catch((error) => {
        console.error('Error fetching admin data from Firebase:', error);
      });
    }
  }, [user]);
  useEffect(() => {
    if (selectedUser && user && user._id) {
      socket.emit('adminJoinRoom', { adminId: user._id, userId: selectedUser });

      // Lấy lịch sử chat từ Firebase
      const chatRef = ref(db, `chats/${selectedUser}/${user._id}`);
      onValue(chatRef, (snapshot) => {
        setChat(Object.values(snapshot.val() || {}));
      });
    }
    else{
      
    }
  }, [selectedUser, user]);

  const sendMessage = async () => {
    if (selectedUser && user && user._id && message.trim()) {
      const messageData = {
        sender: user._id,
        message,
        timestamp: Date.now(),
      };

      const chatRef = ref(db, `chats/${selectedUser}/${user._id}`);

      try {
        const snapshot = await get(chatRef);
        const currentMessages = snapshot.val() || {};

        // Cập nhật tin nhắn
        const updatedMessages = {
          ...currentMessages,
          [Date.now()]: messageData,
        };

        await set(chatRef, updatedMessages);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (!user || !user._id) {
    return <Typography>Không có dữ liệu quản trị viên.</Typography>;
  }

  return (
    <>
    {user && user.type === 'ADMIN'?<>
      <Grid container spacing={2} style={{ height: '90vh', padding: '16px' }}>
      <Grid item xs={4} style={{ height: 'calc(90vh - 32px)', display: 'flex', flexDirection: 'column' }}>
        <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" style={{ padding: '16px' }}>
            Danh sách người dùng
          </Typography>
          <List style={{ flex: 1, overflowY: 'auto' }}>
            {Object.keys(users).length > 0 ? (
              Object.keys(users).map((userId) => (
                <ListItem
                  button
                  key={userId}
                  onClick={() => setSelectedUser(userId)}
                  selected={selectedUser === userId}
                >
                  <ListItemText primary={users[userId]?.username || 'Unknown User'} />
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
          {selectedUser ? (
            <>
              <Box style={{ padding: '16px' }}>
                <Typography variant="h6">
                  {users[selectedUser]?.username || 'Unknown User'}
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
              <Typography variant="h6">Chọn người dùng để bắt đầu chat</Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
    </>:<h1>Unauthenticated</h1>}
    </>
  );
};

export default AdminChat;
