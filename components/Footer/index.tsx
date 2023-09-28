import queryDatoCMS from '@/utils/queryDatoCMS';
import FooterRenderer from './FooterRenderer';
import { FooterDocument } from '@/graphql/generated';

const Footer = async () => {
  const data = await queryDatoCMS(FooterDocument);

  return <FooterRenderer data={data} />;
};

export default Footer;
