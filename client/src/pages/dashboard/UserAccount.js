// material
import { Container } from '@material-ui/core';
// redux
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import AccountChangePassword from 'src/components/_dashboard/user/account/AccountChangePassword';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();


  return (
    <Page title="User: Change Password | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Đổi mật khẩu'
          links={[
            { name: 'Quản lý', href: PATH_DASHBOARD.root },
            { name: 'Đổi mật khẩu', href: PATH_DASHBOARD.user.list },
            // { name: id },
          ]}
        />
        <AccountChangePassword />
      </Container>
    </Page>
  );
}
