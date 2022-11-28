import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FormGroup, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Product from '../Product';
import Button from '@mui/material/Button';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Checkbox from '@mui/material/Checkbox';
import './index.scss';
import { getData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const thumbnail_category =
  'http://localhost:3000/images/thumbnail_category.png';

export default function CategoryDetail() {
  const [searchParams] = useSearchParams();
  let _danhmuc = searchParams.get('danhmuc');
  const [datas, setDatas] = React.useState([]);
  const [_load, setLoad] = React.useState(0);
  const [dataDanhMuc, setDataDanhMuc] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState({
    radioPrice: '',
    radioSize: '',
    radioSort: '',
    radioType: '',
  });
  React.useEffect(() => {
    (async () => {
      try {
        let { radioPrice, radioSize, radioSort, radioType } = selectedValue;
        radioPrice = radioPrice.split('-');
        radioSize = radioSize.split('-');

        let _fromPrice = '',
          _toPrice = '',
          _fromSize = '',
          _toSize = '';

        if (radioPrice.length > 1) {
          if (radioPrice[0] !== '*') _fromPrice = radioPrice[0];
          if (radioPrice[1] !== '*') _toPrice = radioPrice[1];
        }

        if (radioSize.length > 1) {
          if (radioSize[0] !== '*') _fromSize = radioSize[0];
          if (radioSize[1] !== '*') _toSize = radioSize[1];
        }
        let arrDanhMuc = [];
        checked?.map((data) => {
          arrDanhMuc.push((data));
          return arrDanhMuc;
        });
        if (!_danhmuc) _danhmuc = arrDanhMuc;
        const res = await getData(
          API_BASE_URL +
            `/products?categoryIds=${_danhmuc}&&fromPrice=${_fromPrice}&&toPrice=${_toPrice}&&fromSize=${_fromSize}&&toSize=${_toSize}&&sort=${radioSort}&&type=${radioType}`,
        );
        const resDanhMuc = await getData(API_BASE_URL + `/categories`);
        setDataDanhMuc(resDanhMuc.data);
        setDatas(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [
    _danhmuc,
    _load,
    selectedValue.radioDanhMuc,
    selectedValue.radioPrice,
    selectedValue.radioSize,
    selectedValue.radioSort,
    selectedValue.radioType,
  ]);

  const [sort, setSort] = React.useState(0);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const toggleDrawer = (_boolean) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(_boolean);
  };

  const handleCheckBox = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  return (
    <>
      <Box className="wrapper-product-detail wrapper-news">
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
                  Tin Thị trường
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
          <Typography
            sx={{ display: { xs: 'inline-block', sm: 'none' } }}
            variant="h5"
            className="product-title"
          >
            TP. HỒ CHÍ MINH
          </Typography>
          <Breadcrumbs
            sx={{ mb: 2 }}
            aria-label="breadcrumb"
            className="breadcrumb"
          >
            <Link to="/" className="tag-a">
              Trang chủ
            </Link>
          </Breadcrumbs>
          <Grid
            className="news-write-info"
            container
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 5 }}
            sx={{ my: 3 }}
          >
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 2, md: 1 }}
              sx={{ display: { xs: 'none', md: 'inline-block' } }}
            >
              <Box className="search-products">
                <Box>
                  {!_danhmuc && (
                    <>
                      <Typography className="title" variant="h6">
                        Tin liên quan
                      </Typography>

                      <ul className="news-category search-Radio">
                        {dataDanhMuc.map((danhmuc, index) => {
                          return (
                            <>
                              <li>
                                <FormGroup>
                                  <FormControlLabel
                                    value={danhmuc.id}
                                    control={
                                      <Checkbox
                                        size="small"
                                        name="price[]"
                                        onChange={(e) => {
                                          handleCheckBox(e);
                                          setLoad((e) => e + 1);
                                        }}
                                      />
                                    }
                                    label={danhmuc.name}
                                  />
                                </FormGroup>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </Box>
                <Box>
                  <Typography className="title" variant="h6">
                    Chọn mức giá
                  </Typography>
                  <ul className="news-category search-Radio">
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="radio-price"
                      value={selectedValue.radioPrice}
                      onChange={(e) => {
                        setSelectedValue((pre) => ({
                          ...pre,
                          radioPrice: e.target.value,
                        }));
                      }}
                    >
                      <li>
                        <FormControlLabel
                          value="*-100000000"
                          control={<Radio size="small" name="price" />}
                          label=" Giá dưới 100.000.000đ"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="100000000-200000000"
                          control={<Radio size="small" name="price" />}
                          label="100.000.000đ - 200.000.000đ"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="200000000-300000000"
                          control={<Radio size="small" name="price" />}
                          label="200.000.000đ - 300.000.000đ"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="300000000-500000000"
                          control={<Radio size="small" name="price" />}
                          label="300.000.000đ - 500.000.000đ"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="500000000-1000000000"
                          control={<Radio size="small" name="price" />}
                          label="500.000.000đ - 1.000.000.000đ"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="1000000000-*"
                          control={<Radio size="small" name="price" />}
                          label="Giá trên 1.000.000.000đ"
                        />
                      </li>
                    </RadioGroup>
                  </ul>
                </Box>
                <Box>
                  <Typography className="title" variant="h6">
                    Chọn diện tích
                  </Typography>
                  <ul className="news-category search-Radio">
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="radio-size"
                      value={selectedValue.radioSize}
                      onChange={(e) => {
                        setSelectedValue((pre) => ({
                          ...pre,
                          radioSize: e.target.value,
                        }));
                      }}
                    >
                      <li>
                        <FormControlLabel
                          value="20-50"
                          control={<Radio size="small" name="size" />}
                          label=" Từ 20 - 50 m2"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="50-90"
                          control={<Radio size="small" name="size" />}
                          label=" 50 - 90 m2"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="90-120"
                          control={<Radio size="small" name="size" />}
                          label="90 - 120 m2"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="120-160"
                          control={<Radio size="small" name="size" />}
                          label=" 120 - 160 m2"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="160-*"
                          control={<Radio size="small" name="size" />}
                          label=" Trên 160 m2"
                        />
                      </li>
                    </RadioGroup>
                  </ul>
                </Box>
                <Box>
                  <Typography className="title" variant="h6">
                    Loại tin rao
                  </Typography>
                  <ul className="news-category search-Radio">
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="radio-type"
                      value={selectedValue.radioType}
                      onChange={(e) => {
                        setSelectedValue((pre) => ({
                          ...pre,
                          radioType: e.target.value,
                        }));
                      }}
                    >
                      <li>
                        <FormControlLabel
                          value="fff3b141-08f7-4585-bb75-2f72f2aaaf9a"
                          control={<Radio size="small" name="type" />}
                          label=" Nhà đất - Bán"
                        />
                      </li>
                      <li>
                        <FormControlLabel
                          value="c466a38c-7d44-46c7-9508-5ac7d30c728e"
                          control={<Radio size="small" name="type" />}
                          label=" Nhà đất - Thuê"
                        />
                      </li>
                    </RadioGroup>
                  </ul>
                </Box>
                <Box>
                  <Typography className="title" variant="h6">
                    Danh mục tin tức
                  </Typography>
                  <ul className="news-category">
                    <li className="li-category-intro">
                      <Link to="/" className="tag-a">
                        Trang chủ
                      </Link>
                    </li>
                    <li className="li-category-intro">
                      <Link to="/tat-ca-san-pham" className="tag-a">
                        Tất cả sản phẩm
                      </Link>
                    </li>
                    <li className="li-category-intro">
                      <Link to="/gioi-thieu" className="tag-a">
                        Giới thiệu
                      </Link>{' '}
                    </li>
                  </ul>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={9} order={{ xs: 1, md: 2 }}>
              <Box className="search-result">
                <img
                  className="rounded"
                  width="100%"
                  src={thumbnail_category}
                  alt=""
                />
                <Stack
                  sx={{ display: { xs: 'none', md: 'flex' }, mt: 2 }}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <small>Ưu tiên xem:</small>
                  <RadioGroup
                    aria-labelledby="demo-error-radios"
                    name="radio-sort"
                    value={selectedValue.radioSort}
                    onChange={(e) => {
                      setSelectedValue((pre) => ({
                        ...pre,
                        radioSort: e.target.value,
                      }));
                    }}
                    sx={{ display: 'inline-block' }}
                  >
                    <small>
                      <FormControlLabel
                        value="asc"
                        control={<Radio size="small" name="sort" />}
                        label=" Giá tăng dần "
                      />
                    </small>
                    <small>
                      <FormControlLabel
                        value="desc"
                        control={<Radio size="small" name="type" />}
                        label=" Giá giảm dần"
                      />
                    </small>
                  </RadioGroup>
                </Stack>

                <Select
                  sx={{ display: { xs: 'inline-block', md: 'none' }, mt: 2 }}
                  labelId="demo-select-small"
                  size="small"
                  value={sort}
                  label="Sort"
                  onChange={handleChange}
                >
                  <MenuItem value={0}>
                    {' '}
                    <em>Sắp xếp theo</em>{' '}
                  </MenuItem>
                  <MenuItem value={3}>Giá tăng dần</MenuItem>
                  <MenuItem value={4}>Giá giảm dần</MenuItem>
                </Select>
                <Divider sx={{ my: 2 }} light />
                <Grid
                  container
                  spacing={2}
                  sx={{ mt: 5, backgroundColor: '#f6f7f9' }}
                >
                  {datas.map((product, index) => {
                    return (
                      <Grid key={index} item xs={12} md={6} lg={4}>
                        <Box sx={{ width: '100%' }}>
                          <Product product={product}></Product>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
            <Grid tem xs={12}>
              <Button
                sx={{ display: { xs: 'inline-block', md: 'none' } }}
                className="btn btn-open-drawer"
                onClick={toggleDrawer(true)}
              >
                <PlaylistAddCheckIcon
                  sx={{ fontSize: '25px' }}
                ></PlaylistAddCheckIcon>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
