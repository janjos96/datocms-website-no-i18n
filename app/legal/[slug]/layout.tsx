import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import 'node_modules/react-modal-video/css/modal-video.css';
import '@/styles/global.css';
import { draftMode } from 'next/headers';
import { SiteLocale } from '@/graphql/generated';
import HeaderRenderer from '@/components/Header/HeaderRenderer';
type Params = {
  children: React.ReactNode;
  params: {
    lng: SiteLocale;
  };
};

export default async function RootLayout({ children }: Params) {
  const { isEnabled } = draftMode();

  return (
    <>
      <HeaderRenderer />
      {children}
      <Footer />
    </>
  );
}
