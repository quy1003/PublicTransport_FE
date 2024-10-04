import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';
import { authApi, endpoints } from '../../config/Apis';

const PredictedSpending = () => {
  const [predictedSpending, setPredictedSpending] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPredictedSpending = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi().get(endpoints['predict-spending']); 
      setPredictedSpending(response.data.predictedAverageUserSpending);
    } catch (err) {
      setError('Có lỗi xảy ra khi lấy dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictedSpending();
  }, []);

  // Hàm định dạng số tiền theo kiểu Việt Nam
  const formatCurrency = (value) => {
    // Chuyển đổi giá trị sang số
    const amount = parseFloat(value);
    // Làm tròn và định dạng
    return amount ? Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ' : '0 VNĐ';
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Dự đoán Chi tiêu Trung bình
        </Typography>

        {loading && <CircularProgress />}
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
        {predictedSpending && (
          <Typography variant="h4" color="primary">
            {formatCurrency(new Intl.NumberFormat('vi-VN').format(Math.floor(predictedSpending)))}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={fetchPredictedSpending}
          sx={{ marginTop: 2 }}
        >
          Tải lại
        </Button>
      </Paper>
    </Box>
  );
};

export default PredictedSpending;
