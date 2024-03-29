import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/admin-dashboards/user/UserNewForm';
import { API_BASE_URL } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async () => {
      const _user = await getData(API_BASE_URL + `/users/${id}`);
      setCurrentUser(_user.data);
    })();
  }, [id]);

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo tài khoản' : 'Chỉnh sửa'}
          links={[
            { name: 'Quản lý', href: PATH_DASHBOARD.root },
            { name: 'Người dùng', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'Thêm tài khoản' : '' },
          ]}
        />
        <UserNewForm isEdit={isEdit} currentUser={currentUser} id={id} />
      </Container>
    </Page>
  );
}
