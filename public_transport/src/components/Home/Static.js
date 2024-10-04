
import homeStyles from '../../styles/HomeStyle/HomeStyle';
import staticStyles from '../../styles/HomeStyle/Static';




const Static = () => {
  return (
    <>
    <main style={homeStyles.main}>
      <div style={homeStyles.containerStatic}>
        <div style={homeStyles.contentRow}>
          {/* Text Content */}
          <div style={homeStyles.textContentStatic}>
            <h1 style={{...homeStyles.heading1, color: 'white'}}>BusMap</h1>
            <h2 style={{...homeStyles.heading2, color: 'white'}}>
              Hàng trăm ngàn người đã sử dụng để tối ưu hoá hành trình di chuyển bằng phương tiện công cộng
            </h2>

            <div style={homeStyles.buttonContainer}>
              <a href="https://busmap.city/" style={{...homeStyles.buttonSecondary, color: 'whitesmoke'}}>
                BusMap &copy;
              </a>
            </div>

            {/* Good Works Image */}
            <div style={homeStyles.wowWorksImage}>
              <img
                src="https://busmap.vn/wp-content/themes/busmap-theme-dev/images/wow.svg"
                alt="wow1"
                style={homeStyles.goodWorksImage}
              />
            </div>
          </div>

          <div style={homeStyles.textContent}>
          <div style={homeStyles.imageContent}>
            <ul style={staticStyles.staticUl}>
                <li style={staticStyles.liUl}>
                    <img style={staticStyles.img} src='https://busmap.vn/wp-content/uploads/2021/09/Vector-2.png' alt='start'/>
                    <p style={staticStyles.textHeading}>4.5/5</p>
                    <p>Điểm đánh giá ứng dụng</p>
                </li>
                <li style={staticStyles.liUl}>
                <img style={staticStyles.img} src='https://busmap.vn/wp-content/uploads/2021/09/Group-2.png' alt='cmt'/>
                <p style={staticStyles.textHeading}>50.000</p>
                <p>App store & CH Play</p>
                </li>
                <li style={staticStyles.liUl}>
                <img style={staticStyles.img} src='https://busmap.vn/wp-content/uploads/2021/09/Group-1684-1.png' alt='user'/>
                <p style={staticStyles.textHeading}>200.000</p>
                <p>Người dùng đã đăng ký</p>
                </li>
                <li style={staticStyles.liUl}>
                <img style={staticStyles.img} src='https://busmap.vn/wp-content/uploads/2021/09/Group-1-2.png' alt='download'/>
                <p style={staticStyles.textHeading}>4.500.000</p>
                <p>Lượt tải xuống</p>
                </li>
            </ul>
          </div>

            {/* Good Works Image */}
            <div style={homeStyles.wowImageStat}>
              <img
                src="https://busmap.vn/wp-content/themes/busmap-theme-dev/images/wow-2.svg"
                alt=""
                style={homeStyles.wowImageStat}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    
    </>
  );
};

export default Static;

