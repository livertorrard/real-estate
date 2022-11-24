import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { styled } from '@material-ui/core/styles';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { Box, Card, Grid, Stack, TextField, Typography } from '@material-ui/core';
// utils
// routes
//
import { UploadMultiFile } from '../../upload';
import { postData, putData } from 'src/_helper/httpProvider';
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { Icon } from '@iconify/react';
import { MIconButton } from 'src/components/@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';
import { useCallback } from 'react';

// ----------------------------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

DanhMucNewForm.propTypes = {
  isEdit: PropTypes.bool,
  current: PropTypes.object,
  id: PropTypes.string,
  setEdit: PropTypes.func,
  setLoad: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function DanhMucNewForm({ isEdit, current, setEdit, setLoad }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const NewSchema = Yup.object().shape({
    dm_ten: Yup.string().required('Vui lòng nhập tên'),
    dm_hinhanh: Yup.array(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dm_ten: current?.dm_ten || '',
      dm_hinhanh:
      current?.dm_hinhanh?.map(
        (e) => `${URL_PUBLIC_IMAGES + e.adm_hinh}`,
      ) || [],
      dm_hinhanh_old: current?.dm_hinhanh || [],
    },
    validationSchema: NewSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let _values = { ...values };
        const formDt = new FormData();
        if (values.dm_hinhanh.length > 0) {
          values.dm_hinhanh.map((value) => {
            return formDt.append('dm_hinhanh', value);
          });
        };
        formDt.append('data', JSON.stringify(_values));
        if (isEdit) {
          await putData(API_BASE_URL + `/danhmuc/${current.id}/edit`, 
            formDt,
            {
              'content-type': 'multipart/form-data',
            },
          );
          if (setEdit) setEdit({ isEdit: false, current: {} });
        } else {
          await postData(API_BASE_URL + `/danhmuc/create`, 
            formDt,
            {
              'content-type': 'multipart/form-data',
            },
          );
          resetForm();
        }
        if (setLoad) setLoad((e) => e + 1);
        enqueueSnackbar(
          !isEdit ? 'Thêm danh mục thành công' : 'Cập nhật thành công!',
          {
            variant: 'success',
          },
        );
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
  const { errors,values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;
  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'dm_hinhanh',
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
    setFieldValue('dm_hinhanh', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.dm_hinhanh.filter((_file) => _file !== file);
    setFieldValue('dm_hinhanh', filteredItems);
  };
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Tên danh mục"
                  {...getFieldProps('dm_ten')}
                  error={Boolean(touched.dm_ten && errors.dm_ten)}
                  helperText={touched.dm_ten && errors.dm_ten}
                />
                <div>
                  <LabelStyle>Thêm hình ảnh</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept="image/*"
                    files={values.dm_hinhanh}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.dm_hinhanh && errors.dm_hinhanh)}
                  />
                </div>

                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <LoadingButton type="submit" variant="contained">
                    {!isEdit ? 'Thêm' : 'Lưu'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
