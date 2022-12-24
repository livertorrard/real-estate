import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Stack,
  Container,
  Typography,
} from '@material-ui/core';
import { PATH_AUTH } from '../../routes/paths';
import AuthLayout from '../../layouts/AuthLayout';
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));


export default function Login() {
  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        Bạn chưa có tài khoản? &nbsp;
        <RouterLink
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to={PATH_AUTH.register}
        >
          Đăng ký
        </RouterLink>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
            Bất động sản Q-Land xin chào!!
          </Typography>
          <img src="/static/illustrations/login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Đăng nhập
              </Typography>
            </Box>

            <Box
              component="img"
              src={`/static/auth/ic_jwt.png`}
              sx={{ width: 32, height: 32 }}
            />
          </Stack>

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Bạn chưa có tài khoản?&nbsp;
              <RouterLink
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                Đăng ký
              </RouterLink>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}