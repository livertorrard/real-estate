import { Outlet } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

export default function MainLayout() {
  // const { pathname } = useLocation();
  // const isHome = pathname === '/';

  return (
    <>
      <div>
        <MainNavbar />
        <Outlet />
        <MainFooter />
      </div>
    </>
  );
}
