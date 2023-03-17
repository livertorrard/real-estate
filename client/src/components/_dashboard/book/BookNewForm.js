import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import {
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormControlLabel,
  Icon,
} from '@material-ui/core';
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';
import { getData, postData, putData } from 'src/_helper/httpProvider';
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { MIconButton } from 'src/components/@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tacgiaList, setTacgiaList] = useState([]);
  const [tlList, setTlList] = useState([]);
  const [dmList, setDmList] = useState([]);

  useEffect(() => {
    (async () => {
      const _tacgia = await getData(API_BASE_URL + '/authors');
      setTacgiaList(_tacgia.data);
      const _tl = await getData(API_BASE_URL + '/actions');
      setTlList(_tl.data);
      const _dm = await getData(API_BASE_URL + '/categories');
      setDmList(_dm.data);
    })();
  }, []);

  const NewProductSchema = Yup.object().shape({
    sp_ten: Yup.string().required('Vui lòng nhập tên sản phẩm'),
    sp_mota: Yup.string(),
    sp_hinhanh: Yup.array(),
    sp_masp: Yup.string().required('Vui lòng nhập mã sản phẩm'),
    sp_diachi: Yup.string().required('Vui lòng nhập địa chỉ'),
    sp_gia: Yup.number().required('Vui lòng nhập giá'),
    sp_dientich: Yup.string().required('Vui lòng diện tích'),
    sp_huongnha: Yup.string().required('Vui lòng nhập hướng nhà'),
    sp_lat: Yup.string().required('Vui lòng nhập vị trí điểm đầu dự án'),
    sp_lng: Yup.string().required('Vui lòng nhập vị trí điểm cuối dự án'),
    sp_thanhpho: Yup.string().required('Vui lòng nhập thành phố'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sp_ten: currentProduct?.sp_ten || '',
      sp_mota: currentProduct?.sp_mota || '',
      sp_hinhanh:
        currentProduct?.sp_hinhanh?.map(
          (e) => `${URL_PUBLIC_IMAGES + e.ha_hinh}`,
        ) || [],
      sp_gia: currentProduct?.sp_gia || 1000000,
      sp_phongngu: currentProduct?.sp_phongngu || 1,
      sp_dientich: currentProduct?.sp_dientich || 1,
      sp_phongwc: currentProduct?.sp_phongwc || 1,
      sp_huongnha: currentProduct?.sp_huongnha || '',
      sp_diachi: currentProduct?.sp_diachi || '',
      sp_lat: currentProduct?.sp_lat || 1.0,
      sp_lng: currentProduct?.sp_lng || 1.0,
      sp_thanhpho: currentProduct?.sp_thanhpho || '',
      sp_idtl:
        {
          tl_ten: currentProduct?.tl_ten,
          tl_id: currentProduct?.sp_idtl,
        } || '',
      sp_iddm:
        {
          dm_ten: currentProduct?.dm_ten,
          dm_id: currentProduct?.sp_iddm,
        } || '',
      sp_idtg:
        {
          tg_ten: currentProduct?.tg_ten,
          tg_id: currentProduct?.sp_idtg,
        } || '',
      active: Boolean(currentProduct?.active) || true,
      sp_masp: currentProduct?.sp_masp || '',
      sp_hinhanh_old: currentProduct?.sp_hinhanh || [],
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let _values = { ...values };
      _values.sp_idtg = values.sp_idtg.tg_id;
      _values.sp_idtl = values.sp_idtl.tl_id;
      _values.sp_iddm = values.sp_iddm.dm_id;
      try {
        const formDt = new FormData();
        if (values.sp_hinhanh.length > 0) {
          values.sp_hinhanh.map((value) => {
            return formDt.append('file', value);
          });
        }
        formDt.append('data', JSON.stringify(_values));
        if (isEdit) {
          await putData(
            API_BASE_URL + `/book/${currentProduct.sp_id}`,
            formDt,
            {
              'content-type': 'multipart/form-data',
            },
          );
        } else {
          await postData(API_BASE_URL + '/products/create', formDt, {
            'content-type': 'multipart/form-data',
          });
          resetForm();
        }
        enqueueSnackbar(!isEdit ? 'Thêm thành công' : 'Cập nhật thành công', {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.response.data, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'sp_hinhanh',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
    [setFieldValue],
  );

  const handleRemoveAll = () => {
    setFieldValue('sp_hinhanh', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.sp_hinhanh.filter((_file) => _file !== file);
    setFieldValue('sp_hinhanh', filteredItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Tên dự án"
                  {...getFieldProps('sp_ten')}
                  error={Boolean(touched.sp_ten && errors.sp_ten)}
                  helperText={touched.sp_ten && errors.sp_ten}
                />
                <TextField
                  fullWidth
                  label="Vị trí đầu"
                  {...getFieldProps('sp_lat')}
                  error={Boolean(touched.sp_lat && errors.sp_lat)}
                  helperText={touched.sp_lat && errors.sp_lat}
                />
                <TextField
                  fullWidth
                  label="Vị trí cuối"
                  {...getFieldProps('sp_lng')}
                  error={Boolean(touched.sp_lng && errors.sp_lng)}
                  helperText={touched.sp_lng && errors.sp_lng}
                />
                <TextField
                  fullWidth
                  label="Thành phố / Tỉnh"
                  {...getFieldProps('sp_thanhpho')}
                  error={Boolean(touched.sp_thanhpho && errors.sp_thanhpho)}
                  helperText={touched.sp_thanhpho && errors.sp_thanhpho}
                />

                <div>
                  <LabelStyle>Mô tả</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.sp_mota}
                    placeholder="Mô tả ..."
                    onChange={(val) => setFieldValue('sp_mota', val)}
                  />
                </div>

                <div>
                  <LabelStyle>Thêm hình ảnh</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept="image/*"
                    files={values.sp_hinhanh}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.sp_hinhanh && errors.sp_hinhanh)}
                  />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      {...getFieldProps('active')}
                      checked={values.active}
                    />
                  }
                  label="Trạng thái (Ẩn/hiện)"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Mã dự án"
                    {...getFieldProps('sp_masp')}
                    error={Boolean(touched.sp_masp && errors.sp_masp)}
                    helperText={touched.sp_masp && errors.sp_masp}
                  />
                  <TextField
                    fullWidth
                    label="Giá tiền"
                    {...getFieldProps('sp_gia')}
                  />
                  <TextField
                    fullWidth
                    label="Phòng ngủ"
                    {...getFieldProps('sp_phongngu')}
                  />
                  <TextField
                    fullWidth
                    label="Phòng vệ sinh"
                    {...getFieldProps('sp_phongwc')}
                  />
                  <TextField
                    fullWidth
                    label="Diện tích"
                    {...getFieldProps('sp_dientich')}
                  />
                  <TextField
                    fullWidth
                    label="Hướng nhà"
                    {...getFieldProps('sp_huongnha')}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    multiline
                    rows={4}
                    {...getFieldProps('sp_diachi')}                 
                    error={Boolean(touched.sp_diachi && errors.sp_diachi)}
                    helperText={touched.sp_diachi && errors.sp_diachi}
                  />

                  <Autocomplete
                    freeSolo
                    value={values.sp_idtg}
                    onChange={(event, newValue) => {
                      setFieldValue('sp_idtg', newValue);
                    }}
                    options={tacgiaList?.map((option) => ({
                      tg_id: option.id,
                      tg_ten: option.name,
                    }))}
                    renderInput={(params) => (
                      <TextField label="Chủ sở hữu" {...params} />
                    )}
                    getOptionLabel={(option) => option.tg_ten || ''}
                  />
                  <Autocomplete
                    freeSolo
                    value={values.sp_iddm}
                    onChange={(event, newValue) => {
                      setFieldValue('sp_iddm', newValue);
                    }}
                    options={dmList?.map((option) => ({
                      dm_id: option.id,
                      dm_ten: option.name,
                    }))}
                    renderInput={(params) => (
                      <TextField label="Danh mục" {...params} />
                    )}
                    getOptionLabel={(option) => option.dm_ten || ''}
                  />
                  <Autocomplete
                    freeSolo
                    value={values.sp_idtl}
                    onChange={(event, newValue) => {
                      setFieldValue('sp_idtl', newValue);
                    }}
                    options={tlList?.map((option) => ({
                      tl_id: option.id,
                      tl_ten: option.actionName,
                    }))}
                    renderInput={(params) => (
                      <TextField label="Thể loại" {...params} />
                    )}
                    getOptionLabel={(option) => option.tl_ten || ''}
                  />
                </Stack>
              </Card>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                {!isEdit ? 'Thêm dự án' : 'Lưu'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
