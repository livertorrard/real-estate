import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import './index.scss';
import Product from '../Product';   
import { getData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';

export default function ListProductSale() {

    const [datas, setDatas] = React.useState([]);
    React.useEffect(() => {
        (async () => {
          try {
            const res = await getData(
              API_BASE_URL + `/books/ban`,
            );
            setDatas(res.data);
          } catch (e) {
            console.log(e);
          }
        })();
      }, []);

    return (
       <Box className="list-product-new" id="wrap-dang-ban">
            <Container sx={{py: 5}}>
                <Stack className="h-title-menu" direction="row" alignItems="center">
                    <Box className="h-title" sx={{flexGrow: 1 }}>
                        <Typography variant="h5"><span className="h5-title" id="h5-title">DỰ ÁN</span> ĐANG BÁN</Typography>
                        <Typography variant="p" className="p-title">Những dự án đang bán hàng đầu được săn đón</Typography>
                    </Box>
                    <Box></Box>
                </Stack>
                <Grid container spacing={2} sx={{mt: 5}}>
                    {
                        datas.map((product, index) => {
                            return (
                                <Grid key={index} item xs={12} md={6} lg={4}>
                                    <Box sx={{width: '100%'}}>
                                        <Product product={product}></Product>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
       </Box>
    );
}
