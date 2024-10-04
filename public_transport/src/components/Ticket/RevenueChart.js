import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FormControl, InputLabel, MenuItem, Select, Box, CircularProgress, Alert, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { authApi, endpoints } from '../../config/Apis';
import HeadingContent from '../Mutual/HeadingContent';
import PredictedSpending from './PredictSpending';

// Đăng ký các component của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [revenueData, setRevenueData] = useState({});
  const [loading, setLoading] = useState(false);
  const [predict, setPredict] = useState(null)

  const fetchYears = async () => {
    try {
      const response = await authApi().get(endpoints['getYearRevenue'])
      setYears(response.data.years);
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const fetchRevenueByMonth = async (year) => {
    setLoading(true);
    try {
      const response = await authApi().get(`${endpoints['getRevenue']}?year=${year}`)
      const revenue = response.data;

      const labels = revenue.map(item => `Tháng ${item.month}`);
      const data = revenue.map(item => item.totalRevenue);
      const colors = [
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900'
      ]
      setRevenueData({
        labels,
        datasets: [
          {
            label: `Doanh thu ${year}`,
            data,
            backgroundColor: colors
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching revenue by month:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPredict = async() => {
      try{
        let res = await authApi().get(endpoints['revenue-predict'])
        setPredict(res.data.predictedRevenue)
      }
      catch(ex){
        alert(ex.response.data.message);
      }
    }
    loadPredict();
    fetchYears();
  }, []);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    if (year) {
      fetchRevenueByMonth(year);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', textAlign: 'center',marginBottom:'28px' }}>
      <HeadingContent title="Thống kê báo cáo"/>

      <FormControl fullWidth>
        <InputLabel id="year-select-label">Chọn năm</InputLabel>
        <Select
          labelId="year-select-label"
          value={selectedYear}
          label="Chọn năm"
          onChange={handleYearChange}
        >
          {years.length > 0 ? (
            years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Không có năm nào</MenuItem>
          )}
        </Select>
      </FormControl>

      <Box sx={{ marginTop: 5 }}>
        {loading ? (
          <CircularProgress />
        ) : revenueData.labels ? (
          <>
          <Bar
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top',
                  labels: {
                    usePointStyle: true,
                    boxWidth: 0,         
                  }, },
                title: {
                  display: true,
                  text: `Doanh thu năm ${selectedYear}`
                },
              },
            }}
          />
          {predict?<Typography style={{padding:'1.5rem'}}>Dự đoán doanh thu của tháng tiếp theo: {new Intl.NumberFormat('vi-VN').format(Math.floor(predict))} VNĐ</Typography>:<CircularProgress/>}
          <PredictedSpending/>
          </>
        ) : (
          <Alert style={{marginBottom:'18rem'}}>Chọn năm để xem doanh thu</Alert>
        )}
      </Box>
    </Box>
  );
};

export default RevenueChart;
