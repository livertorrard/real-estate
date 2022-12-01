import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import LoadingScreen from '../components/LoadingScreen';
import { useSelector } from 'react-redux';

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
          path: 'products/:id',
          element: <ProductDetail />,
        },
        {
          path: 'products',
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

const UserAccount = Loadable(
  lazy(() => import('../pages/dashboard/UserAccount')),
);

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

const RoleList = Loadable(lazy(() => import('../pages/dashboard/RoleList')));

const RoleCreate = Loadable(
  lazy(() => import('../pages/dashboard/RoleCreate')),
);

const GioiThieu = Loadable(
  lazy(() => import('../layouts/main/home/Dashboard/GioiThieu')),
);
const DanhMucList = Loadable(lazy(() => import('../pages/dashboard/DanhMuc')));

const TacGiaList = Loadable(lazy(() => import('../pages/dashboard/TacGia')));

const TheLoaiList = Loadable(lazy(() => import('../pages/dashboard/TheLoai')));

const LienHeList = Loadable(lazy(() => import('../pages/dashboard/LienHe')));

const BookList = Loadable(lazy(() => import('../pages/dashboard/Book')));

const BlogList = Loadable(lazy(() => import('../pages/dashboard/Blog')));

const BlogCreate = Loadable(
  lazy(() => import('../pages/dashboard/BlogCreate')),
);

const GeneralBooking = Loadable(
  lazy(() => import('../pages/dashboard/GeneralBooking')),
);

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

const Page500 = Loadable(lazy(() => import('../pages/Page500')));

const NotFound = Loadable(lazy(() => import('../pages/Page404')));
