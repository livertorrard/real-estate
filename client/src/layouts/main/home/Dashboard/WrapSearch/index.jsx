import React from 'react'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Search from '../Search';
import Search2 from '../Search_2';

export default function WrapSearch() {
    return (
        <div style={{marginTop: '200px'}}>
            <Typography sx={{ color: 'white', mb: 5 }} align="center" variant="h2">Tìm kiếm nhà đất mơ ước</Typography>
            {/* <Typography sx={{ color: 'white', mb: 5 }} align="center" variant="h2">Xây dựng tương lai cuộc sống</Typography> */}
                <Box sx={{ width: "80%", mx: 'auto' }}>
                    <Search></Search>
                </Box>
            <Typography sx={{ color: 'white' }} align="center" variant="h6">Tìm nhanh theo kiểu dáng</Typography>
            <Search2></Search2>
        </div>
    )
}
