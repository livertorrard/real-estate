import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import './index.scss';

import New1 from '../News/New_1';
import New2 from '../News/New_2';
import { getData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';

export default function ListNew1() {

    const [datas, setDatas] = React.useState([]);
    React.useEffect(() => {
        (async () => {
          try {
            const res = await getData(
              API_BASE_URL + `/blogs`,
            );
            setDatas(res.data);
          } catch (e) {
            console.log(e);
          }
        })();
      }, []);
    return (
       <Box className="list-product-especical list-news">
            <Container sx={{py: 5}}>
                <Stack className="h-title-menu" direction="row">
                    <Box className="h-title" sx={{ mt: 3}}>
                        <Typography variant="h5"><span className="h5-title">TIN </span>BẤT ĐỘNG SẢN MỚI</Typography>
                        <Typography variant="p" className="p-title">Cập nhật nhanh chóng thông tin thị trường bất động sản</Typography>
                    </Box>
                </Stack>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid item xs={12} md={6}>
                       {datas.length > 0 && <New1 new={datas[0]}></New1>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {
                            datas.map((value, index) => {
                                return index !== 0 && <New2 new={value}></New2>
                            })
                        }
                    </Grid>
                </Grid>
            </Container>
       </Box>
    );
}
