// material
import { styled } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import BookingIllustration from 'src/assets/illustration_booking';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';
//
// import { BookingIllustration } from '../../../assets/illustration_booking';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3)
}));

// ----------------------------------------------------------------------


export default function BookingTotal() {
  const [tong, setTong] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const res = await getData(API_BASE_URL + `/thongke/tong`);
        setTong(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(tong[0]?.total)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Tổng liên hệ
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral'
        }}
      >
        <BookingIllustration />
      </Box>
    </RootStyle>
  );
}
