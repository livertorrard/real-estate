import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import './index.scss';
import { getData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';
import { Link } from 'react-router-dom';

export default function ListProductEspecical() {
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await getData(API_BASE_URL + `/categories/representative`);
        setDatas(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Box className="list-product-especical">
      <Container sx={{ py: 5 }}>
        <Stack className="h-title-menu" direction="row" justifyContent="center">
          <Box className="h-title" sx={{ mt: 3 }}>
            <Typography variant="h5">
              <span className="h5-title">MẪU DỰ ÁN </span>TIÊU BIỂU
            </Typography>
            <Typography variant="p" className="p-title">
              Sự khác biệt mang tên phong cách
            </Typography>
          </Box>
        </Stack>
        <Grid className="list-item" container spacing={2} sx={{ mt: 2 }}>
          {datas.map((product, index) => {
            const col_md = index === 0 ? 8 : 4;
            return (
              <Grid className="_item" key={index} item xs={12} sm={col_md}>
                <div className="wrap_banner">
                  <img
                    src={`http://localhost:3005/public/images/${product?.pictureName}`}
                    alt={product.name}
                  />
                  <div class="wr_title">
                    <div class="wrap_title_ed">
                      <h2 class="h2">
                        <Link
                          className="tag-a"
                          id="link-danh-muc"
                          to={`/products?categoryIds=${product.id}`}
                          title={product.name}
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <p>{product.numberProduct}&nbsp;Dự án</p>
                    </div>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
