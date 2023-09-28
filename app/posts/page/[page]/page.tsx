import PostsPage from '@/components/Blog/PostsPage';
import RealTimePostsPage from '@/components/Blog/RealTime/RealTimePostsPage';
import { PostsDocument, SiteLocale } from '@/graphql/generated';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    page: number;
  };
};

const Blog = async ({ params }: Params) => {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    PostsDocument,
    {
      skip: (params.page - 1) * 9,
    },
    isEnabled
  );

  if (!data.allPosts.length) {
    notFound();
  }

  return (
    <>
      {!isEnabled && <PostsPage data={data} page={params.page} />}
      {isEnabled && (
        <RealTimePostsPage
          initialData={data}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ''}
          query={PostsDocument}
          variables={{
            skip: (params.page - 1) * 9,
          }}
          page={params.page}
        />
      )}
    </>
  );
};

export default Blog;
