import 'node_modules/react-modal-video/css/modal-video.css';
import '@/styles/global.css';
import { draftMode } from 'next/headers';
import HeaderRenderer from '@/components/Header/HeaderRenderer';
import Footer from '@/components/Footer';

type Params = {
  children: React.ReactNode;
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
