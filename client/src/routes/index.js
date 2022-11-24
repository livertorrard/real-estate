import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed',
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const isAdmin = useSelector((state) => state.user.current.role) === 'ADMIN';
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: isAdmin ? <DashboardLayout /> : <Navigate to="/" />,
      children: [
        {
          path: 'user',
          children: [
            {
              path: '',
              element: <UserList />,
            },
            { path: 'account', element: <UserAccount /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':id/edit', element: <UserCreate /> },
          ],
        },
        {
          path: 'book',
          children: [
            {
              path: '',
              element: <BookList />,
            },
            {
              path: 'new',
              element: <BookCreate />,
            },
            {
              path: ':id/edit',
              element: <BookCreate />,
            },
          ],
        },
        {
          path: 'role',
          children: [
            {
              path: '',
              element: <RoleList />,
            },
            {
              path: 'new',
              element: <RoleCreate />,
            },
            {
              path: ':id/edit',
              element: <RoleCreate />,
            },
          ],
        },
        {
          path: 'tacgia',
          children: [
            {
              path: '',
              element: <TacGiaList />,
            },
          ],
        },
        {
          path: 'danhmuc',
          children: [
            {
              path: '',
              element: <DanhMucList />,
            },
          ],
        },
        {
          path: 'theloai',
          children: [
            {
              path: '',
              element: <TheLoaiList />,
            },
          ],
        },
        {
          path: 'lienhe',
          children: [
            {
              path: '',
              element: <LienHeList />,
            },
          ],
        },
        {
          path: 'thongke',
          children: [
            {
              path: '',
              element: <GeneralBooking />,
            },
          ],
        },
        {
          path: 'blog',
          children: [
            {
              path: '',
              element: <BlogList />,
            },
            {
              path: 'new',
              element: <BlogCreate />,
            },
            {
              path: ':id/edit',
              element: <BlogCreate />,
            },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'san-pham/:id',
          element: <ProductDetail />,
        },
        {
          path: 'tat-ca-san-pham',
          element: <CategoryDetail />,
        },
        {
          path: 'tin-tuc/:id',
          element: <NewsDetail />,
        },
        {
          path: 'gioi-thieu',
          element: <GioiThieu />,
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// userAccount
const UserAccount = Loadable(
  lazy(() => import('../pages/dashboard/UserAccount')),
);
// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(
  lazy(() => import('../pages/authentication/Register')),
);

const VerifyCode = Loadable(
  lazy(() => import('../pages/authentication/VerifyCode')),
);

const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));

const UserCreate = Loadable(
  lazy(() => import('../pages/dashboard/UserCreate')),
);
//-------------------------role-------------------------------------
const RoleList = Loadable(lazy(() => import('../pages/dashboard/RoleList')));
const RoleCreate = Loadable(
  lazy(() => import('../pages/dashboard/RoleCreate')),
);

//--------------------------Gioi thiue-------------------------------------------
const GioiThieu = Loadable(lazy(() => import('../layouts/main/home/Dashboard/GioiThieu')));
//--------------------------Danh Muc-------------------------------------------
const DanhMucList = Loadable(lazy(() => import('../pages/dashboard/DanhMuc')));
//--------------------------Tác giả-------------------------------------------
const TacGiaList = Loadable(lazy(() => import('../pages/dashboard/TacGia')));
//--------------------------Thể loại-------------------------------------------
const TheLoaiList = Loadable(lazy(() => import('../pages/dashboard/TheLoai')));

//--------------------------Lien he-------------------------------------------
const LienHeList = Loadable(lazy(() => import('../pages/dashboard/LienHe')));

//--------------------------sanpham-------------------------------------------
const BookList = Loadable(lazy(() => import('../pages/dashboard/Book')));

//--------------------------Blog-------------------------------------------/
const BlogList = Loadable(lazy(() => import('../pages/dashboard/Blog')));
const BlogCreate = Loadable(
  lazy(() => import('../pages/dashboard/BlogCreate')),
);

//--------------------------Thống kê-------------------------------------------/

const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));


const BookCreate = Loadable(
  lazy(() => import('../pages/dashboard/BookCreate')),
);

const ProductDetail = Loadable(
  lazy(() => import('../layouts/main/home/Dashboard/ProductDetail')),
);

const NewsDetail = Loadable(
  lazy(() => import('../layouts/main/home/Dashboard/NewsDetail')),
);

const CategoryDetail = Loadable(
  lazy(() => import('../layouts/main/home/Dashboard/CategoryDetail')),
);

const Home = Loadable(lazy(() => import('../layouts/main/home')));
//------------------------Bai Viet--------------------------------


//-------------------------------------------------------------------------------

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));