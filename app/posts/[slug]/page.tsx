import queryDatoCMS from '@/utils/queryDatoCMS';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Post from '@/components/Blog/Post/Post';
import RealTimePost from '@/components/Blog/RealTime/RealTimePost';
import { PostDocument, SiteLocale } from '@/graphql/generated';

type Params = {
  params: {
    slug: string;
    lng: SiteLocale;
  };
};

const BlogDetailsPage = async ({ params: { slug, lng } }: Params) => {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    PostDocument,
    {
      slug,
    },
    isEnabled
  );

  if (!data.post) {
    notFound();
  }

  return (
    <>
      {!isEnabled && <Post data={data} />}
      {isEnabled && (
        <RealTimePost
          initialData={data}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ''}
          query={PostDocument}
        />
      )}
    </>
  );
};

export default BlogDetailsPage;
