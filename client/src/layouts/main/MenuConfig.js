import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';

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
    path: '/products',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    
  }
];

export default menuConfig;
