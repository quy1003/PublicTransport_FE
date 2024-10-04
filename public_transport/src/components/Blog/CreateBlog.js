import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { authApi, endpoints } from '../../config/Apis';
import { Box, TextField, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import HeadingContent from '../Mutual/HeadingContent';
import BlogStyle from '../../styles/BlogStyle/BlogStyle';

const CreateBlog = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const quillRef = useRef(null);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;

          if (range) {
            quill.insertEmbed(range.index, 'image', imageUrl);
          } else {
            quill.insertEmbed(quill.getLength(), 'image', imageUrl);
          }
        };
        reader.readAsDataURL(file);
      });
    },
  });

  const handleSubmit = async () => {
    if (!title || !content) {
      setDialogMessage('Vui lòng nhập tiêu đề và nội dung bài viết!');
      setIsSuccess(false);
      setOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    try {
      const response = await authApi().post(endpoints['create-blog'], formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setDialogMessage('Bài viết đã được thêm thành công!');
        setIsSuccess(true);
        setOpen(true);
      }
    } catch (error) {
      console.error('Lỗi khi thêm bài viết:', error);
      setDialogMessage(error.response.data.message);
      setIsSuccess(false);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);

    if (isSuccess) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <Box sx={BlogStyle.blogBox}>
      <HeadingContent title="Soạn thảo Blog" />
      <TextField
        fullWidth
        label="Tiêu đề bài viết"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
      />

      <Paper elevation={3} sx={BlogStyle.ppblog}>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleContentChange}
          modules={{
            toolbar: {
              container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['bold', 'italic', 'underline'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ['image'],
                ['clean'],
              ],
            },
          }}
        />
      </Paper>

      <Paper
        {...getRootProps()}
        elevation={2}
        sx={BlogStyle.ppBlog2}
      >
        <input {...getInputProps()} />
        <Typography>Kéo và thả hình ảnh vào đây, hoặc nhấp để chọn ảnh.</Typography>
      </Paper>

      <Box sx={BlogStyle.divbtn}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Đăng bài viết
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isSuccess ? 'Thành công' : 'Thất bại'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateBlog;
