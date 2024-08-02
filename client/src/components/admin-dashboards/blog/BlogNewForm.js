import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useCallback } from 'react';
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
  FormControlLabel,
  Icon,
} from '@material-ui/core';
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';
import { postData, putData } from 'src/_helper/httpProvider';
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { MIconButton } from 'src/components/@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

BlogNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function BlogNewForm({ isEdit, currentProduct }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên bài viết'),
    code: Yup.string()
      .max(20, 'Vui lòng nhập không quá 20 kí tự')
      .required('Vui lòng nhập mã bài viết'),
    description: Yup.string(),
    file: Yup.array(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      code: currentProduct?.code || '',
      description: currentProduct?.description || '',
      file:
        currentProduct?.pictures?.map(
          (e) => `${URL_PUBLIC_IMAGES + e.pictureName}`,
        ) || [],
      active: Boolean(currentProduct?.active) ? 1 : 0,
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const formDt = new FormData();
        if (values.file.length > 0) {
          formDt.append('file', values.file[0]);
        }

        formDt.append('name', values.name);
        formDt.append('code', values.code);
        formDt.append('description', values.description);
        formDt.append('active', values.active);

        if (isEdit) {
          await putData(API_BASE_URL + `/posts/${currentProduct.id}`, formDt, {
            'content-type': 'multipart/form-data',
          });
        } else {
          await postData(API_BASE_URL + '/posts', formDt, {
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
        'file',
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
    setFieldValue('file', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.bv_hinhanh.filter((_file) => _file !== file);
    setFieldValue('file', filteredItems);
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
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  label="Mã bài viết"
                  {...getFieldProps('code')}
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                />

                <div>
                  <LabelStyle>Mô tả bài viết</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.description}
                    placeholder="Mô tả bài viết"
                    onChange={(val) => setFieldValue('description', val)}
                  />
                </div>

                <div>
                  <LabelStyle>Thêm hình ảnh</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept="image/*"
                    files={values.file}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.file && errors.file)}
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
