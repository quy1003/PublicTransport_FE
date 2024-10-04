import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Apis, { authApi, endpoints } from "../../config/Apis";
import Spinner from "../Mutual/Spinner";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import BlogStyle from "../../styles/BlogStyle/BlogStyle";
import { UserContext } from "../../App";

const DetailBlog = () => {
  const [user] = useContext(UserContext)
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await Apis.get(endpoints["get-blog-detail"](id));
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể lấy dữ liệu bài viết");
        setLoading(false);
      }
    };
    fetchBlogDetail();
    const fetchComments = async (page) => {
      try {
        setLoading(true);
        const response = await Apis.get(`${endpoints["get-comments"](id)}?page=${page}`);
        setComments(response.data.comments);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Không thể lấy dữ liệu bình luận");
        setLoading(false);
      }
    };
    fetchComments(1);
  }, [id]);

  useEffect(() => {
    if (blog) {
      const imgs = document.querySelectorAll(".blog-content img");
      imgs.forEach((img) => {
        img.style.maxWidth = "50%";
        img.style.height = "auto";
        img.style.objectFit = "contain";
        img.style.display = "block";
        img.style.margin = "20px auto";
      });
    }
  }, [blog]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert>{error.response.data.message}</Alert>;
  }

  const handleCommentSubmit = async () => {
    try {
      const response = await authApi().post(endpoints["post-comment"](id), {
        content: comment,
      });
      if (response.status === 201) {
        setComment("");
        const fetchComments = async (page) => {
          try {
            setLoading(true);
            const response = await Apis.get(`${endpoints["get-comments"](id)}?page=${page}`);
            setComments(response.data.comments);
            setTotalPages(response.data.totalPages);
            setLoading(false);
          } catch (err) {
            setError("Không thể lấy dữ liệu bình luận");
            setLoading(false);
          }
        };
        fetchComments(currentPage);
      }
    } catch (err) {
      <Alert>{err.response.data.message}</Alert>;
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const fetchComments = async (page) => {
        try {
          setLoading(true);
          const response = await Apis.get(`${endpoints["get-comments"](id)}?page=${page}`);
          setComments(response.data.comments);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } catch (err) {
          setError("Không thể lấy dữ liệu bình luận");
          setLoading(false);
        }
      };
      fetchComments(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const fetchComments = async (page) => {
        try {
          setLoading(true);
          const response = await Apis.get(`${endpoints["get-comments"](id)}?page=${page}`);
          setComments(response.data.comments);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } catch (err) {
          setError("Không thể lấy dữ liệu bình luận");
          setLoading(false);
        }
      };
      fetchComments(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container style={BlogStyle.blogContainer}>
      {blog && (
        <>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            {blog.title}
          </Typography>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={BlogStyle.blogContent}
          />

          <div style={BlogStyle.divImg}>
            {blog.images &&
              blog.images.length > 0 &&
              blog.images.map((image, index) => (
                <div key={index} style={BlogStyle.divWrapImg}>
                  <img
                    src={image}
                    alt={`blog_image_${index}`}
                    style={BlogStyle.img}
                  />
                </div>
              ))}
          </div>

          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            style={{ marginTop: "20px" }}
          >
            Được tạo vào: {new Date(blog.createdAt).toLocaleString()}
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleCommentSubmit();
            }}
            style={{ marginTop: "20px", width: "100%" }}
          >
            {user && <>
              <TextField
              fullWidth
              label="Nhập bình luận của bạn"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" color="primary" type="submit">
                Gửi bình luận
              </Button>
            </Box>
            </>}

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Bình luận mới nhất</Typography>
              <List>
                {comments.map((comment) => (
                  <ListItem key={comment._id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={comment.user.username}
                        src={comment.user.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.content}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {comment.user.username}
                          </Typography>
                          {" — " + new Date(comment.createdAt).toLocaleString()}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                  variant="contained"
                >
                Bình luận trước đó
                </Button>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                  variant="contained"
                >
                Xem thêm
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default DetailBlog;
