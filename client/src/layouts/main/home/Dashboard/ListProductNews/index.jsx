import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
// import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import './index.scss';
import Product from '../Product';
import { API_BASE_URL } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';


const menu_items = [
    'Biệt thự',
    'Căn hộ',
    'Chugn cư',
    'Nhà vườn',
];


export default function ListProductNews() {
    const [toggleMenu, setToggleMenu] = useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(toggleMenu);
    const [datas, setDatas] = React.useState([]);
    useEffect(() => {
        (async () => {
          try {
            const res = await getData(
              API_BASE_URL + `/books/new`,
            );
            setDatas(res.data);
            console.log(res.data,"ListProductNews");
          } catch (e) {
            console.log(e);
          }
        })();
      }, []);

    const handleMenuItemClick = ( event, index ) => {
        setSelectedIndex(index);
        setToggleMenu(null);
    };

    const handleClose = () => {
        setToggleMenu(null);
    };

    return (
       <Box className="wrap-list-product-new">
            <Container sx={{py: 5}}>
                <Stack className="h-title-menu" direction="row" alignItems="center">
                    <Box className="h-title" sx={{flexGrow: 1 }}>
                        <Typography variant="h5"><span className="h5-title">DỰ ÁN</span> MỚI NHẤT</Typography>
                        <Typography variant="p" className="p-title">Dự án mới nhất này có đang ở gần bạn ?</Typography>
                    </Box>
                    {/* <Box className="h-menu">
                        <Box sx={{display: {xs: 'none', md: 'inline-block'}}}>
                                <ul>
                                    <li><Link className="tag-a selected">BIỆT THỰ</Link></li>
                                    <li><Link className="tag-a">CĂN HỘ</Link></li>
                                    <li><Link className="tag-a">CHUNG cư</Link></li>
                                    <li><Link className="tag-a">NHÀ VƯỜN</Link></li>
                                </ul>
                        </Box>
                        <MenuIcon
                            aria-controls="h-menu"
                            onClick={handleClickListItem}  
                            className="icon-menu" 
                            sx={{display: {xs: 'inline-block', md: 'none'}}}
                        ></MenuIcon>
                    </Box> */}
                </Stack>
                <Menu
                    sx={{display: {xs: 'inline-block', md: 'none'}}}
                    className="xs-h-menu"
                    id="h-menu"
                    anchorEl={toggleMenu}
                    open={open}
                    onClose={handleClose}
                >
                    {menu_items.map((item, index) => (
                    <MenuItem
                        key={item}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {item}
                    </MenuItem>
                    ))}
                </Menu>
                <Grid container spacing={2} sx={{mt: 5}}>
                    {
                        datas?.map((product, index) => {
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
