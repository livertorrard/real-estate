import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import './index.scss';

import New1 from '../News/New_1';



const list_news = [
    {title: 'Những lí do đầy thu hút của dự án chung cư New City', detail: 'Dự án chung cư cao cấp new city tại quận 2 gồm hơn 4000 căn hộ tại số 27 đường Mai Chí Thọ Thủ Thiêm do CDT Thuận V...', date: '25/10/2018 ', author: 'Đào Quý Thương', comment: 2 ,image: 'http://localhost:3000/images/banner_project_1.png'},
    {title: 'Tình hình thị trường bất động sản năm 2018 sẽ diễn ra như thế nào', detail: 'Dự án chung cư cao cấp new city tại quận 2 gồm hơn 4000 căn hộ tại số 27 đường Mai Chí Thọ Thủ Thiêm do CDT Thuận V...', date: '25/10/2018 ', author: 'Đào Quý Thương', comment: 2 ,image: 'http://localhost:3000/images/banner_project_2.png'},
    {title: 'Chủ đầu tư Tân Hoàng Minh Group', detail: 'Dự án chung cư cao cấp new city tại quận 2 gồm hơn 4000 căn hộ tại số 27 đường Mai Chí Thọ Thủ Thiêm do CDT Thuận V...', date: '25/10/2018 ', author: 'Đào Quý Thương', comment: 2 ,image: 'http://localhost:3000/images/banner_project_3.png'},
]

export default function ListNew2() {

    return (
       <Box className="list-product-especical list-news list-new-2">
            <Container sx={{py: 5}}>
                <Stack className="h-title-menu" direction="row">
                    <Box className="h-title" sx={{ mt: 3}}>
                        <Typography variant="h5"><span className="h5-title">TIN </span>THỊ TRƯỜNG</Typography>
                        <Typography variant="p" className="p-title">Thông tin thị trường bất động sản</Typography>
                    </Box>
                </Stack>
                <Grid container spacing={2} sx={{mt: 2}}>
                    {
                        list_news.map((value, index) => {
                            return (
                                <Grid item xs={12} md={4}>
                                    <New1 new={value}></New1>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
       </Box>
    );
}
