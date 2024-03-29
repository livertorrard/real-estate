import { Icon } from '@iconify/react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';
import { LoadingButton } from '@material-ui/lab';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

export default function VerifyCode() {
  const [searchParams] = useSearchParams();
  let email = searchParams.get('email');
  return (
    <RootStyle title="Verify | Minimal UI">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
          <Button
            size="small"
            component={RouterLink}
            to={PATH_AUTH.register}
            startIcon={<Icon icon={arrowIosBackFill} width={0} height={20} />}
            sx={{ mb: 3 }}
          >
            Back
          </Button>

          <Typography variant="h3" paragraph>
            Vui lòng kiểm tra email!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Chúc mừng bạn đã đăng ký tài khoản thành công, để có thể tiếp tục
            mua sắm xin vui lòng xác thực email:
            <span style={{ fontWeight: 'bold' }}>{email} </span>của bạn.
          </Typography>
          <LoadingButton
            fullWidth
            size="large"
            type="button"
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => {
              window.open("https://mail.google.com", "_blank");
            }}
          >
            Xác nhận email
          </LoadingButton>
        </Box>
      </Container>
    </RootStyle>
  );
}
