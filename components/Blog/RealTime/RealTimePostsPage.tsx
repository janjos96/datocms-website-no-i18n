'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import PostsPage from '../PostsPage';
import { PostsQuery, PostsQueryVariables } from '@/graphql/generated';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export default function RealTimePostsPage({
  initialData,
  token,
  query,
  page,
  variables,
}: {
  token: string;
  initialData: PostsQuery;
  query: TypedDocumentNode<PostsQuery, PostsQueryVariables>;
  page: number;
  variables: PostsQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <PostsPage data={data} page={page} />;
}
