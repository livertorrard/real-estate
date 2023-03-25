import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton, MobileDatePicker } from '@material-ui/lab';
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getData, postData, putData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { formatDate } from 'src/_helper/formatDate';
import { MIconButton } from 'src/components/@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import { login } from 'src/redux/slices/user';

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  id: PropTypes.string,
};

export default function UserNewForm({ isEdit, currentUser, id }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [reset, setReset] = useState(0);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  function makePwd(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  useEffect(() => {
    (async () => {
      const _roles = await getData(API_BASE_URL + '/auth/role');
      setRoles(_roles.data);
    })();
  }, []);

  const NewUserSchema = Yup.object().shape({
    showPassword: Yup.boolean(),
    fullname: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string()
      .required('Vui lòng nhập địa chỉ email')
      .email('Địa chỉ email không hợp lệ'),
    phone: Yup.string(),
    gender: Yup.string(),
    birthday: Yup.date(),
    authorizationId: Yup.string().required('Vui lòng chọn quyền'),
    password: Yup.string().when('showPassword', {
      is: true,
      then: Yup.string()
        .min(8, 'Mật khẩu ít nhất 8 ký tự!')
        .required('Vui lòng nhập mật khẩu'),
    }),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      showPassword: !isEdit,
      fullname: currentUser?.fullname || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      birthday: currentUser?.birthday || new Date().getFullYear(),
      id: currentUser?.id || '',
      password: '',
      gender: currentUser?.gender || 'Male',
      authorizationId: currentUser?.authorizationId || '',
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setFieldValue }) => {
      try {
        delete values.showPassword;
        values.birthday = formatDate(values.birthday);
        if (isEdit) {
          delete values.credential;
          await putData(API_BASE_URL + `/users/${id}/edit`, values);
          dispatch(login());
        } else {
          values.verify = true;
          delete values.id;
          await postData(API_BASE_URL + `/users/create`, values);
        }
        enqueueSnackbar(
          !isEdit ? 'Tạo tài khoản thành công' : 'Cập nhật thành công!',
          {
            variant: 'success',
          },
        );
        setFieldValue('password', makePwd(8));
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.response.data.message, {
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
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  useEffect(() => {
    (() => {
      setFieldValue('password', makePwd(8));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Họ tên"
                    {...getFieldProps('fullname')}
                    error={Boolean(touched.fullname && errors.fullname)}
                    helperText={touched.fullname && errors.fullname}
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Stack>
                <TextField
                  fullWidth
                  label="Email"
                  {...getFieldProps('email')}
                  disabled={isEdit}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <MobileDatePicker
                    orientation="portrait"
                    label="Ngày sinh"
                    value={values.birthday}
                    onChange={(value) => {
                      setFieldValue('birthday', value);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} margin="normal" />
                    )}
                  />
                  <FormControl sx={{ width: '50%' }}>
                    <FormLabel id="gender-i">Giới tính</FormLabel>
                    <RadioGroup row {...getFieldProps('gender')} value={values?.gender}>
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Nam"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Nữ"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
                <FormControl>
                  <InputLabel id="role-select">Quyền</InputLabel>
                  <Select
                    defaultValue='906eb44d-6f6b-4754-a97b-6343815c8dec'
                    labelId="role-select"
                    label="Quyền"
                    {...getFieldProps('authorizationId')}
                    value={values?.authorizationId}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {!isEdit && (
                  <TextField
                    label="Mật khẩu"
                    {...getFieldProps('password')}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                          </IconButton>
                          <IconButton onClick={() => setReset((e) => e + 1)}>
                            <Icon icon="ic:baseline-change-circle" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.credential && errors.credential)}
                    helperText={touched.credential && errors.credential}
                  />
                )}

                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <LoadingButton type="submit" variant="contained" >
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
