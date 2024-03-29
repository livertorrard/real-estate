import './index.scss';
import React from 'react';
import Stack from '@mui/material/Stack';
import ListNew1 from './Dashboard/ListNew1';
import ListProductNews from './Dashboard/ListProductNews';
import ListProductEspecical from './Dashboard/ListProductEspecical';
import ListProductRents from './Dashboard/ListProductRents';
import ListProductSale from './Dashboard/ListProductSale';
import WrapSearch from './Dashboard/WrapSearch';

export default function Home() {
    return (
        <>
            <Stack className="header">
                <WrapSearch></WrapSearch>
            </Stack>
            <ListProductNews></ListProductNews>
            <ListProductEspecical></ListProductEspecical>
            <ListProductRents></ListProductRents>
            <ListNew1></ListNew1>
            <ListProductSale></ListProductSale>
        </>
    );
}
