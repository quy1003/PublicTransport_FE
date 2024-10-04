
import React from 'react';
import busMapStyles from '../../styles/HomeStyle/BusMapStyles';


const HomeLayout = () => {
  return (
    <div style={{padding:'30px'}}>
    <div style={busMapStyles.layoutContainer}>
      {/* Large Image Item */}
      <div style={{ ...busMapStyles.imageItem, ...busMapStyles.mediumImageItem }}>
        <img
          src="https://busmap.vn/wp-content/uploads/2021/10/Picture12.png"
          alt="Bus 1"
          style={busMapStyles.image}
        />
      </div>
      

      {/* Text Item 1 */}
      <div style={busMapStyles.textItem1}>
        <p style={{...busMapStyles.textParagraph, ...busMapStyles.colorWhitesmoke}}>
        Thanh toán vé xe buýt nhanh chóng
          <br />
        </p>
      </div>

      {/* Medium Image Item */}
      <div style={{ ...busMapStyles.imageItem, ...busMapStyles.mediumImageItem }}>
        <img
          src="https://busmap.vn/wp-content/uploads/2021/10/image-18.jpg"
          alt="Bus 2"
          style={busMapStyles.image}
        />
      </div>

      {/* Text Item 2 */}
      <div style={busMapStyles.textItem2}>
        <p style={{...busMapStyles.textParagraph, ...busMapStyles.colorWhitesmoke}}>
          Hơn 40 tuyến xe khắp TP. Hồ Chí Minh
          <br />
        </p>
      </div>

      {/* Small Image Item */}
      <div style={{ ...busMapStyles.imageItem, ...busMapStyles.mediumImageItem }}>
        <img
          src="https://busmap.vn/wp-content/uploads/2021/10/image-22.jpg"
          alt="Bus 4"
          style={busMapStyles.image}
        />
      </div>

      {/* Text Item 3 */}
      <div style={busMapStyles.textItem3}>
        <p style={{...busMapStyles.textParagraph, ...busMapStyles.colorWhitesmoke}}>
        Hơn 100.000 người dùng mỗi tháng
          <br />
        </p>
      </div>

    </div>
    </div>
  );
};

export default HomeLayout;
