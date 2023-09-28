'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import Post from '../Post/Post';
import { PostQuery, PostQueryVariables } from '@/graphql/generated';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export default function RealTimePost({
  initialData,
  token,
  query,
  variables,
}: {
  token: string;
  initialData: PostQuery;
  query: TypedDocumentNode<PostQuery>;
  variables?: PostQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <Post data={data} />;
}
