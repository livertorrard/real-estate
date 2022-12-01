import './index.scss';
import React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';
import { URL_PUBLIC_IMAGES } from 'src/config/configUrl';

const Search_2 = () => {
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await getData(API_BASE_URL + `/categories`);
        setDatas(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <Stack sx={{ mt: 4 }} direction="row" justifyContent="center">
        {datas.map((data) => {
          return (
            <Link
              to={`/products?categoryIds=${data.id}`}
              className="_1-search-advanced"
            >
              <Box className="thumbnail">
                <img
                  src={URL_PUBLIC_IMAGES+data.pictureName}
                  alt={data.pictureName}
                />
              </Box>
              <Typography
                sx={{ textDecoration: 'none' }}
                className="typography"
                variant="p"
              >
                {data.name}
              </Typography>
            </Link>
          );
        })}
      </Stack>
    </>
  );
};

export default Search_2;
