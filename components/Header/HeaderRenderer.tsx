import { MenuDocument } from '@/graphql/generated';
import Header from '.';
import queryDatoCMS from '@/utils/queryDatoCMS';

export type Menu = {
  id: string;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

export type NotificationStripType = {
  displayNotification: boolean;
  text: string;
  urlLabel: string | null | undefined;
  url: string | undefined | null;
};

const HeaderRenderer = async () => {
  const data = await queryDatoCMS(MenuDocument);

  return <Header data={data} />;
};

export default HeaderRenderer;
