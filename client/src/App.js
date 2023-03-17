import Router from './routes';
import ThemeConfig from './theme';
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <ScrollToTop />
              <GoogleAnalytics />
              <Router />
              <Settings />
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
