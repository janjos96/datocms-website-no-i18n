import AuthorPosts from '@/components/Blog/AuthorPosts';
import RealTimeAuthorPosts from '@/components/Blog/RealTime/RealTimeAuthorPosts';
import { AuthorDocument } from '@/graphql/generated';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    slug: string;
  };
};

const AuthorPage = async ({ params }: Params) => {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    AuthorDocument,
    {
      slug: params.slug,
    },
    isEnabled
  );

  if (!data.author) notFound();

  return (
    <>
      {!isEnabled && <AuthorPosts data={data} />}
      {isEnabled && (
        <RealTimeAuthorPosts
          initialData={data}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ''}
          query={AuthorDocument}
          variables={{
            slug: params.slug,
          }}
        />
      )}
    </>
  );
};

export default AuthorPage;
