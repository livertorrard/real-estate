import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import './index.scss';

export default function LienHe() {
  return (
    <Box className="wrapper-product-detail wrapper-news">
      <Box sx={{ width: '100%', display: { xs: 'none', sm: 'inline-block' } }}>
        <div className="breadcrumb_background">
          <div className="title_full">
            <div className="container a-center">
              <Typography
                sx={{ display: { sm: 'none', md: 'inline-block' } }}
                className="title_page"
              >
                Giới thiệu
              </Typography>
            </div>
          </div>
        </div>
      </Box>
      <Container
        sx={{
          pt: { xs: 0, sm: 5 },
          top: '160px',
          position: { xs: 'absolute', sm: 'unset' },
        }}
      >
        <Breadcrumbs
          sx={{ mb: 2 }}
          aria-label="breadcrumb"
          className="breadcrumb"
        >
          <Link to="#" className="tag-a">
            Trang chủ
          </Link>
          <Link to="#" className="tag-a">
            Giới thiệu
          </Link>
        </Breadcrumbs>
        <Grid
          className="news-write-info"
          container
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 5 }}
          sx={{ my: 3 }}
        >
          <Grid item xs={12} md={12} order={{ xs: 1, md: 2 }}>
            <Box className="news-details">
              <Typography className="title" variant="h7">
                <h3 className="tag-a">Giới thiệu</h3>
              </Typography>
              <Box className="news-content">
                <Box className="news-comments">
                  <Typography className="title" variant="h5">
                    Viết bình luận của bạn:
                  </Typography>
                  <form action="" method="POST">
                    <Grid container spacing={{ xs: 1, md: 3 }}>
                      <Grid item xs={12} md={6}>
                        <input
                          type="text"
                          name="user-name"
                          placeholder="Họ và tên"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <input type="text" name="email" placeholder="Email" />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <textarea
                          name="comment"
                          id=""
                          placeholder="Viết bình luận"
                          cols="30"
                          rows="10"
                        ></textarea>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <button>Gửi bình luận</button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
