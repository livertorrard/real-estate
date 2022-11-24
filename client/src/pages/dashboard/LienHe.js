import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
// material
import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Switch,
  Grid,
  Stack,
  TableHead,
  IconButton,
  Box,
} from '@material-ui/core';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { getData, postData } from 'src/_helper/httpProvider';
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { useSnackbar } from 'notistack5';
import { MIconButton } from 'src/components/@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';
import LienHeToolbar from 'src/components/_dashboard/lienhe/list/LienHeListToolbar';
import LienHeListHead from 'src/components/_dashboard/lienhe/list/LienHeListHead';
import DialogMoreDetail from 'src/components/_dashboard/lienhe/list/DiaLogMoreDetail';
import { fCurrency } from 'src/utils/formatNumber';
import { styled } from '@material-ui/core/styles';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tên', label: 'Tên người liên hệ', alignRight: false },
  { id: 'tên', label: 'Số điện thoại', alignRight: false },
  { id: 'tên', label: 'Tên dự án', alignRight: false },
  { id: 'tên', label: 'Mã dự án', alignRight: false },
  { id: 'status', label: 'Liên hệ', alignRight: false },
  { id: 'status', label: 'Trạng thái mua', alignRight: false },
  { id: '', label: 'Chi tiết' },
];

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}));

// ----------------------------------------------------------------------

export default function LienHeList() {
  const { themeStretch } = useSettings();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [datas, setDatas] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [idsp, setIdsp] = useState(0);
  const [load, setLoad] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(
          API_BASE_URL + `/lienhes?search=${filterName}`,
        );
        const detailLienHe = await getData(
          API_BASE_URL + `/lienhe?idlh=${idsp}`,
        );
        setDatas(res.data);
        setDataDetail(detailLienHe.data);
        console.log(detailLienHe.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [filterName, load]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClickOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = datas.map((n) => n.lh_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

  const isRoleNotFound = datas.length === 0;

  const changeActiveRole = async (id, active) => {
    try {
      const res = await postData(API_BASE_URL + '/lienhe/active', {
        id: id,
        active: active,
      });
      setLoad((e) => e + 1);
      enqueueSnackbar(res.data, {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeConfirm = async (id, active) => {
    try {
      const res = await postData(API_BASE_URL + '/lienhe/confirm', {
        id: id,
        active: active,
      });
      setLoad((e) => e + 1);
      enqueueSnackbar(res.data, {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page title="Liên hệ| Delta">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Liên hệ"
          links={[
            { name: 'Quản lý', href: PATH_DASHBOARD.root },
            { name: 'Liên hệ', href: PATH_DASHBOARD.lienhe.root },
          ]}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card>
              <LienHeToolbar
                selected={selected}
                filterName={filterName}
                onFilterName={handleFilterByName}
                setLoad={setLoad}
                setSelected={setSelected}
              />
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <LienHeListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={datas.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {datas
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((row) => {
                          const {
                            lh_id,
                            lh_ten,
                            lh_sdt,
                            sp_masp,
                            sp_ten,
                            lh_idsp,
                            active,
                            lh_confirm,
                          } = row;
                          const isItemSelected = selected.indexOf(lh_id) !== -1;
                          return (
                            <TableRow
                              hover
                              key={lh_id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) =>
                                    handleClick(event, lh_id)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {lh_ten}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {lh_sdt}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {sp_ten}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle2" noWrap>
                                  {sp_masp}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <Switch
                                  checked={active === 1}
                                  onChange={() => {
                                    changeActiveRole(lh_id, !active);
                                  }}
                                />
                              </TableCell>
                              <TableCell align="left">
                                <Switch
                                  checked={lh_confirm === 1}
                                  onChange={() => {
                                    changeConfirm(lh_id, !lh_confirm);
                                  }}
                                />
                              </TableCell>

                              <TableCell>
                                <IconButton
                                  onClick={() => {
                                    setIdsp(lh_idsp);
                                    setLoad((e) => e + 1);
                                    handleClickOpenDetail();
                                  }}
                                >
                                  <Icon
                                    icon="clarity:details-line"
                                    width={20}
                                    height={20}
                                    color="#F44336"
                                  />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isRoleNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
              <DialogMoreDetail
                open={openDetail}
                handleClose={handleCloseDetail}
                title="Chi tiết liên hệ"
                maxWidth="md"
                message={
                  <>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="subtitle2"
                        sx
                        enableEdit={{ color: 'text.secondary' }}
                      >
                        Họ và tên
                      </Typography>
                      <Typography variant="body2">
                        {dataDetail[0]?.lh_ten}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="subtitle2"
                        sx
                        enableEdit={{ color: 'text.secondary' }}
                      >
                        Số điện thoại
                      </Typography>
                      <Typography variant="body2">
                        {dataDetail[0]?.lh_sdt}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="subtitle2"
                        sx
                        enableEdit={{ color: 'text.secondary' }}
                      >
                        Email
                      </Typography>
                      <Typography variant="body2">
                        {dataDetail[0]?.lh_email}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="subtitle2"
                        sx
                        enableEdit={{ color: 'text.secondary' }}
                      >
                        Ghi chú
                      </Typography>
                    </Stack>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dataDetail[0]?.lh_ghichu,
                      }}
                      style={{
                        height: '20px',
                        marginTop: '10px',
                        fontSize: '13px',
                      }}
                    ></div>
                    {/* <Scrollbar> */}
                      <TableContainer sx={{ minWidth: 720, mt: 4 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Mã dự án</TableCell>
                              <TableCell align="left">Tên dự án</TableCell>
                              <TableCell align="left">Giá</TableCell>
                              <TableCell align="right" />
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Typography component="span" variant="body1">
                                  {dataDetail[0]?.sp_masp}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <ThumbImgStyle
                                    alt="product image"
                                    src={
                                      URL_PUBLIC_IMAGES + dataDetail[0]?.ha_hinh
                                    }
                                  />
                                  <Box>
                                    <Typography
                                      noWrap
                                      variant="subtitle2"
                                      sx={{ maxWidth: 240, mb: 0.5 }}
                                    >
                                      {dataDetail[0]?.sp_ten}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography component="span" variant="body1">
                                  {fCurrency(dataDetail[0]?.sp_gia)}đ
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    {/* </Scrollbar> */}
                  </>
                }
              />

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={datas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
