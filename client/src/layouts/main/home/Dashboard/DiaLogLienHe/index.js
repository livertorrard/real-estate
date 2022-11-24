import { forwardRef } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Slide,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Icon,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

import { QuillEditor } from 'src/components/editor';
import { styled } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { API_BASE_URL } from 'src/config/configUrl';
import { useSnackbar } from 'notistack5';
import { MIconButton } from 'src/components/@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';
import { postData } from 'src/_helper/httpProvider';

// ----------------------------------------------------------------------

DialogLienHe.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleClickOpen: PropTypes.func,
  excFunc: PropTypes.func,
};

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

// ----------------------------------------------------------------------

export default function DialogLienHe({ open, handleClose, id_sp }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));
  // const handleConfirm = async () => {
  //   await excFunc();
  //   handleClose();
  // };
  const NewSchema = Yup.object().shape({
    lh_ten: Yup.string().required('Vui lòng nhập họ tên'),
    lh_sdt: Yup.string().required('Vui lòng nhập số điện thoại'),
    lh_email: Yup.string()
      .required('Vui lòng nhập địa chỉ email')
      .email('Địa chỉ email không hợp lệ'),
    lh_ghichu: Yup.string(),
    lh_idsp: Yup.number(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lh_ten: '',
      lh_sdt: '',
      lh_email: '',
      lh_ghichu: '',
      lh_idsp: id_sp,
    },
    validationSchema: NewSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await postData(API_BASE_URL + `/lienhe/create`, values);
        resetForm();
        handleClose()
        enqueueSnackbar('Gửi tư vấn thành công', {
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
    touched,
    values,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Liên hệ tư vấn ngay
        </DialogTitle>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <DialogContent sx={{ marginTop: '20px' }}>
              <Grid container spacing={{ xs: 1, md: 3 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    {...getFieldProps('lh_ten')}
                    error={Boolean(touched.lh_ten && errors.lh_ten)}
                    helperText={touched.lh_ten && errors.lh_ten}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('lh_sdt')}
                    error={Boolean(touched.lh_sdt && errors.lh_sdt)}
                    helperText={touched.lh_sdt && errors.lh_sdt}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    {...getFieldProps('lh_email')}
                    error={Boolean(touched.lh_email && errors.lh_email)}
                    helperText={touched.lh_email && errors.lh_email}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <div>
                    <LabelStyle>Ghi chú</LabelStyle>
                    <QuillEditor
                      simple
                      id="product-description"
                      value={values.lh_ghichu}
                      placeholder="Mô tả ..."
                      onChange={(val) => {
                        setFieldValue('lh_ghichu', val);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="inherit" onClick={handleClose}>
                Đóng
              </Button>
              <LoadingButton type="submit" variant="contained" size="large">
                Gửi liên hệ
              </LoadingButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </>
  );
}
