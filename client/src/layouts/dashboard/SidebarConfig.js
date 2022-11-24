// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  role: getIcon('ic_role'),
  tacgia: getIcon('ic_new'),
  danhmuc: getIcon('ic_category'),
  ngonngu: getIcon('ic_translate'),
  book: getIcon('ic_book'),
  phieunhap: getIcon('ic_addbook'),
};

const sidebarConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.list,
        icon: ICONS.user,
      },
      {
        title: 'Đổi mật khẩu',
        path: PATH_DASHBOARD.user.account,
        icon: ICONS.user,
      },
      {
        title: 'Quyền',
        path: PATH_DASHBOARD.role.root,
        icon: ICONS.role,
      },
      {
        title: 'Dự án bất động sản',
        path: PATH_DASHBOARD.book.root,
        icon: ICONS.book,
      },
      {
        title: 'Chủ sở hữu đất',
        path: PATH_DASHBOARD.tacgia.root,
        icon: ICONS.user,
      },

      {
        title: 'Danh mục',
        path: PATH_DASHBOARD.danhmuc.root,
        icon: ICONS.kanban,
      },
      {
        title: 'Thể loại',
        path: PATH_DASHBOARD.theloai.root,
        icon: ICONS.danhmuc,
      },
      {
        title: 'Liên hệ',
        path: PATH_DASHBOARD.lienhe.root,
        icon: ICONS.chat,
      },
      {
        title: 'Thống kê',
        path: PATH_DASHBOARD.general.thongke,
        icon: ICONS.analytics,
      },

      {
        title: 'Bài viết',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
      },
    ],
  },
];

export default sidebarConfig;
