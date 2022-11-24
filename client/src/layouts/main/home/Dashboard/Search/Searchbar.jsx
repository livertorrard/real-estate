import {Icon} from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import {styled} from '@material-ui/core/styles';
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
    Typography
} from '@material-ui/core';
import {useEffect, useState} from "react";
import {Link as RouterLink, Link, useNavigate} from "react-router-dom";
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';
import { PATH_PAGE } from 'src/routes/paths';
// import {fCurrency} from "../../_helper/formatCurrentCy";
// components

// ----------------------------------------------------------------------

const SearchbarStyle = styled('div')(({theme}) => ({
    width: '100%',
    height: "55px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    zIndex: 9999
}));

const ThumbImgStyle = styled('img')(({theme}) => ({
    width: 64, height: 64, objectFit: 'cover', marginRight: theme.spacing(2), borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

export default function Searchbar() {

    const [search, setSearch] = useState('');
    const [searchColor, setSearchColor] = useState('text.primary');
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const _res = await getData(API_BASE_URL + `/books?search=${search}`);
            setProducts(_res.data)
        })()
    }, [search])

    const startvoice = () => {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

        let recognition = new SpeechRecognition();
        let speechRecognitionList = new SpeechGrammarList();

        recognition.lang = 'vi-VN';
        let grammar = '#JSGF V1.0;'

        speechRecognitionList.addFromString(grammar, 1);

        recognition.grammars = speechRecognitionList;

        recognition.interimResults = false;
        recognition.start();
        setSearchColor('red')
        recognition.onresult = async (event) => {
            let lastResult = event.results.length - 1;
            const record = event.results[lastResult][0].transcript;
            if (record !== "") {
                setSearch(record);
                setOpen(true);
                setSearchColor('text.primary')
            } else {
                console.log("Vui long thuc hien lai");
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
                        setSearch(e.target.value)
                        setOpen(true)
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <Box
                                component={Icon}
                                icon={searchFill}
                                sx={{color: 'text.disabled', width: 20, height: 20, marginLeft: "10px"}}
                            />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <Box
                                component={Icon}
                                icon="ic:round-settings-voice"
                                sx={{color: searchColor, width: 20, height: 20, cursor: 'pointer'}}
                                onClick={startvoice}
                            />
                        </InputAdornment>
                    }
                    sx={{mr: 1, fontWeight: 'fontWeightBold'}}
                />
                <Button variant="contained" sx={{width: '9rem', height:'55px'}}>
                    Tìm kiếm
                </Button>
            </SearchbarStyle>

            {(open && !!products.length) && (
                <Card
                    onMouseLeave={() => setOpen(false)}
                    sx={{
                        p: 3,
                        top: '5px',
                        width: '90%',
                        position: 'relative',
                        zIndex: 9999999999,
                        boxShadow: (theme) => theme.customShadows.z20
                    }}
                >
                    <Table>
                        <TableBody>
                            {products.map((product) => {
                                console.log(product, "aaaa");
                                const {
                                    sp_id, sp_ten, sp_hinhanh, tl_ten, sp_masp
                                } = product;
                                const linkTo = `/san-pham/${sp_id}`;
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <ThumbImgStyle alt="product image"
                                                               src={URL_PUBLIC_IMAGES + sp_hinhanh[0].ha_hinh}/>
                                                <Box>
                                                    <Link to={linkTo} color="inherit" component={RouterLink} sx={{textDecoration: 'none'}}>
                                                        <Typography variant="subtitle2" >
                                                            {sp_masp} - {sp_ten}
                                                        </Typography>

                                                    </Link>
                                                </Box>
                                            </Box>
                                            
                                        </TableCell>

                                        {/* <TableCell>
                                            <Stack>
                                                <Typography variant='subtitle2'>{sp_ten} </Typography>
                                            </Stack>
                                        </TableCell> */}

                                        <TableCell align="left">
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                sx={{
                                                    color: 'text.disabled', textDecoration: 'line-through'
                                                }}
                                            >
                                                {/* {!!sp_giakhuyenmai && fCurrency(ctpn_gia)} */}
                                            </Typography>
                                            <Typography>
                                                {/* {!!sp_giakhuyenmai ? fCurrency(sp_giakhuyenmai) : fCurrency(ctpn_gia)} */}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    );
}
