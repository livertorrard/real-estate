import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';

// routes
// import {
//   PATH_AUTH,
//   PATH_PAGE,
//   PATH_DASHBOARD,
// } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Trang chủ',
    path: '/',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    
  },
  {
    title: 'Giới thiệu',
    path: '/gioi-thieu',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    
  },
  {
    title: 'Tất cả sản phẩm',
    path: '/tat-ca-san-pham',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    
  }
];

export default menuConfig;
