import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useCallback} from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import {
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormControlLabel,
  Icon,
} from '@material-ui/core';
// utils
// routes
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';
import { postData, putData } from 'src/_helper/httpProvider';
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { MIconButton } from 'src/components/@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

BlogNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function BlogNewForm({ isEdit, currentProduct }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const NewProductSchema = Yup.object().shape({
    bv_ten: Yup.string().required('Vui lòng nhập tên bài viết'),
    bv_ma: Yup.string().required('Vui lòng nhập mã bài viết'),
    sp_mota: Yup.string(),
    bv_hinhanh: Yup.array(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bv_ten: currentProduct?.bv_ten || '',
      bv_ma: currentProduct?.bv_ma || '',
      bv_mota: currentProduct?.bv_mota || '',
      bv_hinhanh:
        currentProduct?.bv_hinhanh?.map(
          (e) => `${URL_PUBLIC_IMAGES + e.abv_hinh}`,
        ) || [],
      active: Boolean(currentProduct?.active) || true,
      bv_hinhanh_old: currentProduct?.bv_hinhanh || [],
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let _values = { ...values };
      try {
        const formDt = new FormData();
        if (values.bv_hinhanh.length > 0) {
          values.bv_hinhanh.map((value) => {
            return formDt.append('bv_hinhanh', value);
          });
        }
        formDt.append('data', JSON.stringify(_values));
        if (isEdit) {
          await putData(
            API_BASE_URL + `/blog/${currentProduct.bv_id}`,
            formDt,
            {
              'content-type': 'multipart/form-data',
            },
          );
        } else {
          await postData(API_BASE_URL + '/blog/create', formDt, {
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
        'bv_hinhanh',
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
    setFieldValue('bv_hinhanh', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.bv_hinhanh.filter((_file) => _file !== file);
    setFieldValue('bv_hinhanh', filteredItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
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
                  label="Tên bài viết"
                  {...getFieldProps('bv_ten')}
                  error={Boolean(touched.bv_ten && errors.bv_ten)}
                  helperText={touched.bv_ten && errors.bv_ten}
                />
                <TextField
                  fullWidth
                  label="Mã bài viết"
                  {...getFieldProps('bv_ma')}
                  error={Boolean(touched.bv_ma && errors.bv_ma)}
                  helperText={touched.bv_ma && errors.bv_ma}
                />

                <div>
                  <LabelStyle>Mô tả bài viết</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.bv_mota}
                    placeholder="Mô tả bài viết"
                    onChange={(val) => setFieldValue('bv_mota', val)}
                  />
                </div>

                <div>
                  <LabelStyle>Thêm hình ảnh</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept="image/*"
                    files={values.bv_hinhanh}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.bv_hinhanh && errors.bv_hinhanh)}
                  />
                </div>

                <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                {!isEdit ? 'Thêm bài viết' : 'Lưu'}
              </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
