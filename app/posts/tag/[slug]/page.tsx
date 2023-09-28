import RealTimeTagPosts from '@/components/Blog/RealTime/RealTimeTagPosts';
import TagPosts from '@/components/Blog/TagPosts';
import { TagDocument } from '@/graphql/generated';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { draftMode } from 'next/headers';

type Params = {
  params: {
    slug: string;
  };
};

const TagPage = async ({ params }: Params) => {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(TagDocument, {}, isEnabled);

  return (
    <>
      {!isEnabled && <TagPosts data={data} />}
      {isEnabled && (
        <RealTimeTagPosts
          initialData={data}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ''}
          query={TagDocument}
          variables={{
            slug: params.slug,
          }}
        />
      )}
    </>
  );
};

export default TagPage;
