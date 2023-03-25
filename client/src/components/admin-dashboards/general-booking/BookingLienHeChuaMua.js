// material
import { styled } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import CheckOutIllustration from 'src/assets/illustration_checkout';
import { useEffect, useState } from 'react';
import { getData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';
//
// import { CheckOutIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3)
}));

// ----------------------------------------------------------------------


export default function BookingLienHeChuaMua() {
  // const TOTAL = 124000;
  const [tong, setTong] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const res = await getData(API_BASE_URL + `/thongke/chuamua`);
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
          Liên hệ nhưng chưa mua
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
        <CheckOutIllustration />
      </Box>
    </RootStyle>
  );
}
