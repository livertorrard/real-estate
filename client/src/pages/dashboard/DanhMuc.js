import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Switch,
  Grid,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { getData, putData } from 'src/_helper/httpProvider';
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { useSnackbar } from 'notistack5';
import { MIconButton } from 'src/components/@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';
import DanhMucNewForm from 'src/components/admin-dashboards/danhmuc/DanhMucNewForm';
import DanhMucListToolbar from 'src/components/admin-dashboards/danhmuc/list/DanhMucListToolbar';
import DanhMucListHead from 'src/components/admin-dashboards/danhmuc/list/DanhMucListHead';

const TABLE_HEAD = [
  { id: 'tên', label: 'Tên', alignRight: false },
  { id: 'status', label: 'Trang thái', alignRight: false },
  { id: 'edit', label: 'Chỉnh sửa', alignRight: false },
  { id: '' },
];

export default function DanhMucList() {
  const { themeStretch } = useSettings();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [datas, setDatas] = useState([]);
  const [load, setLoad] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [edit, setEdit] = useState({ isEdit: false, current: {} });

  useEffect(() => {
    (async () => {
      try {
        const res = await getData(
          API_BASE_URL + `/categories?search=${filterName}`,
        );
        setDatas(res.data);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = datas.map((n) => n.id);
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
      const res = await putData(API_BASE_URL + `/categories/active/${id}`, {
        active: active ? 1 : 0,
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
    <Page title="Danh Muc|HYPE">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh mục"
          links={[
            { name: 'Quản lý', href: PATH_DASHBOARD.root },
            { name: 'Danh mục', href: PATH_DASHBOARD.danhmuc.root },
          ]}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <DanhMucNewForm
              isEdit={edit.isEdit}
              current={edit.current}
              setEdit={setEdit}
              setLoad={setLoad}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <DanhMucListToolbar
                selected={selected}
                filterName={filterName}
                onFilterName={handleFilterByName}
                setLoad={setLoad}
                setSelected={setSelected}
              />
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <DanhMucListHead
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
                          const { id, name, pictureName, active } = row;
                          const isItemSelected = selected.indexOf(id) !== -1;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, id)}
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Avatar
                                    variant="square"
                                    alt=""
                                    sx={{ mr: 1 }}
                                    src={`${URL_PUBLIC_IMAGES + pictureName}`}
                                  />
                                  {/* <Typography variant="subtitle2" noWrap> */}
                                  {name}
                                  {/* </Typography> */}
                                </Stack>
                              </TableCell>
                              <TableCell align="left">
                                <Switch
                                  checked={active === 1}
                                  onChange={() => {
                                    changeActiveRole(id, !active);
                                  }}
                                />
                              </TableCell>

                              <TableCell>
                                <IconButton>
                                  <Icon
                                    icon="akar-icons:edit"
                                    color="#B72136"
                                    onClick={() =>
                                      setEdit({
                                        isEdit: true,
                                        current: { id, name, pictureName },
                                      })
                                    }
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
