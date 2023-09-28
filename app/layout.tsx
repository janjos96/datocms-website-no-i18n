import 'node_modules/react-modal-video/css/modal-video.css';
import '@/styles/global.css';
import Head from './Head';
import { draftMode } from 'next/headers';
import CustomColor from '@/components/Common/CustomColor';

type Params = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Params) {
  const { isEnabled } = draftMode();
  return (
    <html lang={'en'}>
      <Head />
      <body className={`antialiased overscroll-none`}>
        <CustomColor r={0} g={0} b={0} />
        {children}
      </body>
    </html>
  );
}
