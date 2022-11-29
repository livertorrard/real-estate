import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import './index.scss';
import Product from '../Product';
import DialogListImage from '../DialogListImage';
import { getData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';
import { useParams } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
import Map from '../Map';
import { Button } from '@material-ui/core';
import DialogLienHe from '../DiaLogLienHe';

export default function ProductDetail() {
  const [open, setOpen] = React.useState(false);
  const [openLienHe, setOpenLienHe] = React.useState(false);
  const [imgActive, setImgActive] = React.useState(0);
  const params = useParams();
  const [datas, setDatas] = React.useState([]);
  const [dataImage, setListImage] = React.useState([]);
  const [imgSrc, setImgSrc] = React.useState('');
  const [dataTinCungChuDe, setDataTinCungChuDe] = React.useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(API_BASE_URL + `/products/${params.id}`);
        setDatas(res.data);
        setListImage(res.data.pictures);
        const rs = await getData(
          API_BASE_URL + `/products/categories/${res.data.categoryId}`,
        );
        setDataTinCungChuDe(rs.data);
        setImgSrc(
          `http://localhost:3005/public/images/${res.data.pictureName}`,
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, [params.id]);

  const handleClickOpenLienHe = () => {
    setOpenLienHe(true);
  };

  const handleCloseLienHe = () => {
    setOpenLienHe(false);
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClickCloseDialog = () => {
    setOpen(false);
  };

  const setImgThumbSrc = (imgSrc, index) => {
    setImgActive(index);
    setImgSrc(`http://localhost:3005/public/images/${imgSrc}`);
  };

  return (
    <>
      <Box className="wrapper-product-detail">
        <Box
          sx={{ width: '100%', display: { xs: 'none', sm: 'inline-block' } }}
        >
          <div className="breadcrumb_background">
            <div className="title_full">
              <div className="container a-center">
                <Typography
                  sx={{ display: { sm: 'none', md: 'inline-block' } }}
                  className="title_page"
                >
                  {datas.sp_thanhpho}
                </Typography>
              </div>
            </div>
          </div>
        </Box>
        {dataImage?.length > 0 && (
          <DialogListImage
            listProduct={dataImage}
            open={open}
            handleClickCloseDialog={handleClickCloseDialog}
          />
        )}
        <Container
          sx={{
            pt: { xs: 0, sm: 5 },
            top: '160px',
            position: { xs: 'absolute', sm: 'unset' },
          }}
        >
          <Typography
            sx={{ display: { xs: 'inline-block', sm: 'none' } }}
            variant="h5"
            className="product-title"
          >
            {datas.sp_thanhpho}
          </Typography>
          <Breadcrumbs
            sx={{ mb: 2 }}
            aria-label="breadcrumb"
            className="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="#">
              Trang chủ
            </Link>
            <Link underline="hover" color="inherit" href="#">
              {datas.sp_thanhpho}
            </Link>
            <Link underline="hover" color="inherit" className="active" href="#">
              {datas.sp_ten}
            </Link>
          </Breadcrumbs>
          <Grid
            className="product-info"
            container
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            spacing={{ xs: 2, md: 4 }}
            sx={{ my: 3 }}
          >
            <Grid item xs={12} md={6}>
              <img
                style={{
                  width: '40rem',
                  height: '30rem',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
                onClick={handleClickOpenDialog}
                className="rounded"
                src={imgSrc}
                alt={datas.name}
              />
              <Grid container className="product-list-image">
                {dataImage.map((product, index) => {
                  const active = index === imgActive ? 'active' : '';
                  return (
                    <Grid item key={index}>
                      <img
                        width="100px"
                        className={`rouned ${active}`}
                        onClick={() => {
                          setImgThumbSrc(product.pictureName, index);
                        }}
                        src={'http://localhost:3005/public/images/'+product.pictureName}
                        alt=""
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h5" className="product-title">
                {datas.name}
              </Typography>
              <Typography variant="p">
                Thuộc Quận/huyện:{' '}
                <span className="product-details"> {datas.address}</span>
              </Typography>
              <br />
              <Typography variant="p">
                Kiểu dự án:{' '}
                <span className="product-details"> {datas.categoryName}</span>
              </Typography>
              <br />
              <Typography variant="p">
                Trạng thái:{' '}
                <span className="product-details"> {datas.actionName}</span>
              </Typography>
              <br />
              <Typography variant="p" className="product-price">
                {fCurrency(datas.price)}
              </Typography>

              <div style={{ display: 'flex' }}>
                <div className="contactphone">
                  <a className="mobile" href={`tel: ${datas.phone}`}>
                    <span className="icon"></span>
                    <div className="mb">
                      <span itemprop="telephone" data-mobile={`${datas.phone}`}>
                        {`${datas.phone}`}
                      </span>
                      <small>Liên hệ ngay</small>
                    </div>
                  </a>
                </div>

                <Button
                  variant="contained"
                  id="buttonlienhe"
                  onClick={() => handleClickOpenLienHe()}
                >
                  Liên hệ tư vấn
                </Button>
              </div>
              <a
                href="http://localhost:3000/Mau-hop.pdf"
                className="hd-a"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="contained" id="buttonhopdong">
                  Hợp đồng mẫu
                </Button>
              </a>

              <DialogLienHe
                open={openLienHe}
                handleClose={handleCloseLienHe}
                id_sp={params.id}
              />
            </Grid>
          </Grid>
          <Box className="product-detail-info">
            <Typography variant="h6" className="title">
              Đặc điểm dự án
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <ul className="product-specical-info">
                  <li>
                    <span>Loại tin rao:</span>
                    {datas.actionName}
                  </li>
                  <li>
                    <span>Địa chỉ:</span>
                    {datas.address}
                  </li>
                  <li>
                    <span>Diện tích (m2):</span>
                    {datas.area}
                  </li>
                  <li>
                    <span>Phòng ngủ:</span>
                    {datas.bedRoom}
                  </li>
                  <li>
                    <span>Phòng WC:</span>
                    {datas.toilet}
                  </li>
                  <li>
                    <span>Hướng nhà (dự án):</span>
                    {datas.houseDirection}
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} md={4}>
                <ul className="product-specical-info info-user">
                  <li>
                    <Avatar
                      alt={datas.authorName}
                      sx={{ width: 56, height: 56, mb: 1 }}
                    />
                  </li>
                  <li>
                    <span>Tên liên lạc:</span>
                    {datas.authorName}
                  </li>
                  <li>
                    <span>Số điện thoại:</span>
                    {datas.phone}
                  </li>
                  <li>
                    <span>Email:</span>
                    {datas.authorEmail}
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Box>
          <Box className="product-detail-info">
            <Typography variant="h6" className="title">
              Chi tiết dự án
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ my: 2 }}>
                <div dangerouslySetInnerHTML={{ __html: datas.description }}></div>
              </Grid>
            </Grid>
          </Box>
          <Box className="product-detail-info">
            <Typography variant="h6" className="title">
              Vị trí dự án
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ my: 2 }}>
                <Map
                  vtd='54.69726685890506'
                  vtc='54.69726685890506'
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBXCZ_ydtXnMnERAr9beiGj8mKET9OfYm8&callback=initMap`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div
                      style={{
                        height: `90vh`,
                        margin: `auto`,
                        border: '2px solid black',
                      }}
                    />
                  }
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Grid>
            </Grid>
          </Box>
          <Box className="list-product-new" sx={{ mt: 3 }}>
            <Stack className="h-title-menu" direction="row" alignItems="center">
              <Box className="h-title" sx={{ flexGrow: 1 }}>
                <Typography variant="h5">
                  <span className="h5-title">TIN RAO</span> CÙNG CHỦ ĐỀ
                </Typography>
                <Typography variant="p" className="p-title">
                  Những tin rao cùng chủ đề bạn đang xem
                </Typography>
              </Box>
              <Box></Box>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {dataTinCungChuDe.map((product, index) => {
                if (index >= 1) {
                  return (
                    <Grid key={index} item xs={12} md={6} lg={4}>
                      <Box sx={{ width: '100%' }}>
                        <Product product={product}></Product>
                      </Box>
                    </Grid>
                  );
                } else {
                  return <></>;
                }
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
