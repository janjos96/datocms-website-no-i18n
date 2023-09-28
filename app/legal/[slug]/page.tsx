import Legal from '@/components/Legal/Legal';
import RealTimeLegal from '@/components/Legal/RealTimeLegal';
import { LegalDocument, SiteLocale } from '@/graphql/generated';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { draftMode } from 'next/headers';

type Params = {
  params: {
    slug: string;
    lng: SiteLocale;
  };
};

const LegalPage = async ({ params: { slug, lng } }: Params) => {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    LegalDocument,
    {
      slug,
    },
    isEnabled
  );

  return (
    <>
      {!isEnabled && <Legal data={data} lng={lng} />}
      {isEnabled && (
        <RealTimeLegal
          initialData={data}
          locale={lng}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ''}
          query={LegalDocument}
          variables={{ slug }}
        />
      )}
    </>
  );
};

export default LegalPage;
