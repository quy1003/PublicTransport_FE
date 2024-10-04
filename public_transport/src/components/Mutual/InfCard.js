import  { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress } from '@mui/material';
import InfCardStyle from '../../styles/Mutual/InfCardStyle';

const InfCard = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <Card onClick={() => props.onClick(props.id)} sx={{ maxWidth: 250, minHeight: 370 }} style={InfCardStyle.cardBody}>
      <CardActionArea>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </div>
        )}
        <CardMedia
          component="img"
          height="200"
          image="https://www.busandcoachbuyer.com/wp-content/uploads/2017/10/Otokar-Kent-C-CNG.jpg"
          alt={props.name}
          onLoad={() => setLoading(false)} // Cập nhật trạng thái khi ảnh được tải xong
          style={{ display: loading ? 'none' : 'block' }} // Ẩn ảnh trong lúc loading
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={InfCardStyle.cardName}>
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default InfCard;
