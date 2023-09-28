import Sections from '@/components/Sections/Sections';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { draftMode } from 'next/headers';
import RealTimeSections from '@/components/Sections/RealTimeSections';
import {
  CollectionMetadata,
  PageDocument,
  PageModelSectionsField,
  PostRecord,
} from '@/graphql/generated';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    slug: string;
  };
};

export default async function Home({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    PageDocument,
    {
      slug,
    },
    isEnabled
  );

  if (!data.page) notFound();

  return (
    <>
      {!isEnabled && (
        <Sections
          sections={data.page.sections as Array<PageModelSectionsField>}
          posts={data.allPosts as PostRecord[]}
          postMeta={data._allPostsMeta as CollectionMetadata}
        />
      )}
      {isEnabled && (
        <RealTimeSections
          initialData={data}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ''}
          query={PageDocument}
          variables={{ slug }}
        />
      )}
    </>
  );
}
