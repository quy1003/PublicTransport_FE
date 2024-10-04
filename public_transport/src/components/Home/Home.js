import React, { useState, useEffect } from 'react';
import homeStyles from '../../styles/HomeStyle/HomeStyle';
import BodyHome from './BodyHome';
import HomeLayout from './HomeLayout';
import MomentHome from './MomentHome';
import Static from './Static';
import Chatbot from '../Mutual/Chatbot';



const Home = () => {
  const images = [
    'https://busmap.vn/wp-content/uploads/2023/03/IMG_2588.jpg',
    'https://busmap.vn/wp-content/uploads/2023/03/IMG_2589.jpg',
    'https://busmap.vn/wp-content/uploads/2023/03/IMG_2590.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Chuyển ảnh mỗi 2 giây

    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, [images.length]);

  return (
    <>
    <main style={homeStyles.main}>
      <div style={homeStyles.container}>
        <div style={homeStyles.contentRow}>
          {/* Text Content */}
          <div style={homeStyles.textContent}>
            <h1 style={homeStyles.heading1}>BusMap</h1>
            <h2 style={homeStyles.heading2}>
              Giúp bạn dễ dàng hơn trong việc đi xe buýt
            </h2>
            <p style={homeStyles.paragraph}>Đặt vé xe đơn giản</p>
            <p style={homeStyles.paragraph}>Theo dõi các tuyến đường, lịch trình xe buýt</p>
            <p style={homeStyles.paragraph}>Định tuyến thông minh, đưa ra các quãng đường có thể có</p>
            <div style={homeStyles.buttonContainer}>
              <a href="https://busmap.city/" style={homeStyles.buttonPrimary}>
                Khám phá
              </a>
              <a href="https://busmap.city/" style={homeStyles.buttonSecondary}>
                BusMap &copy;
              </a>
            </div>

            {/* Good Works Image */}
            <div style={homeStyles.goodWorksImage}>
              <img
                src="https://busmap.vn/wp-content/themes/busmap-theme-dev/images/goodwork.svg"
                alt="Good Works"
                style={homeStyles.goodWorksImage}
              />
            </div>
          </div>

          {/* Image Content */}
          <div style={homeStyles.imageContent}>
            <img
              src={images[currentImageIndex]} // Hiển thị ảnh hiện tại dựa trên currentImageIndex
              alt="Bus"
              style={homeStyles.busImage}
            />
          </div>
        </div>
      </div>
    </main>
    <BodyHome/>
    <MomentHome/>
    <Static/>
    <HomeLayout/>
    <Chatbot/>
    </>
  );
};
export default Home;
