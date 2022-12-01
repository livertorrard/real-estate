import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  Input,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Link} from 'react-router-dom';
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';

const SearchbarStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: '55px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  zIndex: 9999,
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}));

export default function Searchbar() {
  const [search, setSearch] = useState('');
  const [searchColor, setSearchColor] = useState('text.primary');
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const _res = await getData(
        API_BASE_URL + `/products/search?keyWord=${search}`,
      );
      setProducts(_res.data);
    })();
  }, [search]);

  const startvoice = () => {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    let SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;

    let recognition = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList();

    recognition.lang = 'vi-VN';
    let grammar = '#JSGF V1.0;';

    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.interimResults = false;
    recognition.start();

    setSearchColor('red');
    recognition.onresult = async (event) => {
      let lastResult = event.results.length - 1;
      const record = event.results[lastResult][0].transcript;
      if (record !== '') {
        setSearch(record);
        setOpen(true);
        setSearchColor('text.primary');
      } else {
        console.log('Vui long thuc hien lai');
      }
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };
  };

  return (
    <div>
      <SearchbarStyle>
        <Input
          fullWidth
          placeholder="Tìm kiếm…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          startAdornment={
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{
                  color: 'text.disabled',
                  width: 20,
                  height: 20,
                  marginLeft: '10px',
                }}
              />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Box
                component={Icon}
                icon="ic:round-settings-voice"
                sx={{
                  color: searchColor,
                  width: 20,
                  height: 20,
                  cursor: 'pointer',
                }}
                onClick={startvoice}
              />
            </InputAdornment>
          }
          sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
        />
        <Button variant="contained" sx={{ width: '9rem', height: '55px' }}>
          Tìm kiếm
        </Button>
      </SearchbarStyle>

      {open && !!products.length && (
        <Card
          onMouseLeave={() => setOpen(false)}
          sx={{
            p: 3,
            top: '5px',
            width: '90%',
            position: 'relative',
            zIndex: 9999999999,
            boxShadow: (theme) => theme.customShadows.z20,
          }}
        >
          <Table>
            <TableBody>
              {products.map((product) => {
                const { id, name, pictureName, actionName, price } = product;
                const linkTo = `/products/${id}`;
                return (
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThumbImgStyle
                          alt="product image"
                          src={URL_PUBLIC_IMAGES + pictureName}
                        />
                        <Box>
                          <Link
                            to={linkTo}
                            color="inherit"
                            component={RouterLink}
                            sx={{ textDecoration: 'none' }}
                          >
                            <Typography variant="subtitle2">{name}</Typography>
                          </Link>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Stack>
                        <Typography variant="subtitle2">
                          {actionName}{' '}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{
                          color: 'text.disabled',
                          textDecoration: 'line-through',
                        }}
                      >
                        {/* {!!sp_giakhuyenmai && fCurrency(ctpn_gia)} */}
                      </Typography>
                      <Typography>{price}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
