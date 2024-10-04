import homeStyles from '../../styles/HomeStyle/HomeStyle';
import { useEffect, useState } from 'react';

const MomentHome = () => {
  const [imageIndex1, setImageIndex1] = useState(0);
  const [imageIndex2, setImageIndex2] = useState(1);
  const [imageIndex3, setImageIndex3] = useState(2);

  const images = [
    "https://busmap.vn/wp-content/uploads/2021/09/image-27.jpg",
    "https://busmap.vn/wp-content/uploads/2021/10/pexels-vinicius-estevao-3069126.jpg",
    "https://busmap.vn/wp-content/uploads/2021/09/Rectangle-235.png",
    "https://busmap.vn/wp-content/uploads/2021/10/thu-nguyen-3LUFsBwuLQI-unsplash.jpg",
    "https://busmap.vn/wp-content/uploads/2021/10/thu-nguyen-3LUFsBwuLQI-unsplash.jpg",
    "https://busmap.vn/wp-content/uploads/2021/10/Picture14.png",
    "https://busmap.vn/wp-content/uploads/2023/03/IMG_2590.png",
    "https://busmap.vn/wp-content/uploads/2021/10/image-22.jpg",
    "https://th.bing.com/th/id/OIP.psUSq2kjhP5bsLuCNhrxSQHaE8?w=1024&h=683&rs=1&pid=ImgDetMain"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setImageIndex1((prevIndex) => (prevIndex + 1) % images.length);
        setImageIndex2((prevIndex) => (prevIndex + 1) % images.length);
        setImageIndex3((prevIndex) => (prevIndex + 1) % images.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <main style={homeStyles.main}>
        <div style={homeStyles.containerMoment}>
          <div style={homeStyles.contentRow}>
            <div style={homeStyles.textContent}>
              <div style={{ position: 'relative' }}>
                <div style={{ ...homeStyles.wonderfulImage }}>
                  <img
                    src="https://busmap.vn/wp-content/themes/busmap-theme-dev/images/wonderful.svg"
                    alt="Wonderful"
                    style={homeStyles.goodWorksImage}
                  />
                </div>
              </div>
              <h1 style={{ ...homeStyles.heading1BodyHome, marginBottom: '50px', position: 'relative', color: 'lightpink' }}>
                <span style={{ position: 'absolute', content: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/heart-left.png)', left: '-4.82927rem', top: '-2.90244rem' }}> </span>
                BusMap
                <span style={{ position: 'absolute', content: 'url(https://busmap.vn/wp-content/themes/busmap-theme-dev/images/heart-right.png)', right: '-5.6rem', top: '-3.90244rem' }}> </span>
              </h1>
              <h2 style={{ ...homeStyles.heading2BodyHomeMoment, color: 'lightpink' }}>
                #BusLife with BusMap means 🚌
              </h2>
              <p style={homeStyles.paragraph}>Cảm ơn các bạn đã ủng hộ chúng tôi trong suốt thời gian qua, sự hài lòng của các bạn chính là động lực để chúng tôi có thể phát triển nhiều hơn nữa. Bất cứ thiếu sót nào xin hãy liên hệ tổng đài của chúng tôi, đồng thời đừng ngần ngại bày tỏ ý kiến để giúp xây dựng mô hình quản lý này trở nên tốt hơn nữa nhé</p>
              <div style={homeStyles.buttonContainer}>
                <a href='https://busmap.vn/' style={homeStyles.buttonSecondary}>
                  BusMap &copy;
                </a>
              </div>
              {/* Div img */}
              <div style={homeStyles.divImgMoment}>
                <img src={images[imageIndex1]} style={homeStyles.imgMoment} alt="Additional" />
                <img src={images[imageIndex2]} style={homeStyles.imgMoment} alt="Additional" />
                <img src={images[imageIndex3]} style={homeStyles.imgMoment} alt="Additional" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MomentHome;
