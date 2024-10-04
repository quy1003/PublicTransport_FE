import React from 'react';
import homeStyles from '../../styles/HomeStyle/HomeStyle';


const BodyHome = () => {
  return (
    <main style={homeStyles.main}>
      <div style={homeStyles.containerBodyHome}>
        <div style={homeStyles.contentRow}>
          {/* Text Content */}
          <div style={homeStyles.textContent}>
            <h1 style={homeStyles.heading1BodyHome}>BusMap</h1>
            <h2 style={homeStyles.heading2BodyHome}>
            Sử dụng các phương tiện giao thông công cộng tiện lợi, nhanh chóng và tiết kiệm
            </h2>
            <p style={homeStyles.paragraph}>Thông qua các tính năng📍tìm đường 📝 tra cứu tuyến 🕛 xem vị trí xe theo thời gian thực 🚌 di chuyển đa phương thức và 👍 đánh giá chất lượng</p>
            <div style={homeStyles.buttonContainer}>
              <a href='https://busmap.vn/' style={homeStyles.buttonSecondary}>
                BusMap &copy;
              </a>
            </div>

          </div>

          {/* Image Content */}
          <div style={homeStyles.imageContent}>
            <img
              src="https://busmap.vn/wp-content/uploads/2021/09/Group-1810-1.png"
              alt="Bus"
              style={homeStyles.busImage}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BodyHome;
