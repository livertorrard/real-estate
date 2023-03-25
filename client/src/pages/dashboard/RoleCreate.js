import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { API_BASE_URL } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';
import RoleNewForm from 'src/components/admin-dashboards/Role/RoleNewForm';

export default function RoleCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const [currentRole, setCurrentRole] = useState();

  useEffect(() => {
    (async () => {
      const _role = await getData(API_BASE_URL + `/role/${id}`);
      setCurrentRole(_role.data[0]);
    })();
  }, [id]);

  return (
    <Page title="Role">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo quyền' : 'Chỉnh sửa'}
          links={[
            { name: 'Quản lý', href: PATH_DASHBOARD.root },
            { name: 'quyền', href: PATH_DASHBOARD.role.root },
            { name: !isEdit ? 'Thêm quyền' : '' },
          ]}
        />

        <RoleNewForm isEdit={isEdit} currentRole={currentRole} id={id} />
      </Container>
    </Page>
  );
}
