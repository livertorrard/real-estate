import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import { API_BASE_URL } from 'src/config/configUrl';
import { postData } from 'src/_helper/httpProvider';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });
  const email = Cookies.get('email');
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },

    validationSchema: ChangePassWordSchema,
   
    onSubmit: async (values, { setSubmitting }) => {
      await postData(API_BASE_URL + `/users/${email}/change-password`, values);
      enqueueSnackbar('Đổi mật khẩu thành công', { variant: 'success' });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Mật khẩu cũ"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Mật khẩu mới"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={(touched.newPassword && errors.newPassword) || 'Mật khẩu nên có từ 6+ ký tự'}
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Xác nhận mật khẩu"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Thay đổi mật khẩu
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
