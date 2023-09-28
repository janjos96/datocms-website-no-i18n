'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import AuthorPosts from '../AuthorPosts';
import { AuthorQuery, AuthorQueryVariables } from '@/graphql/generated';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export default function RealTimeAuthorPosts({
  initialData,
  token,
  query,
  variables,
}: {
  token: string;
  initialData: AuthorQuery;
  query: TypedDocumentNode<AuthorQuery, AuthorQueryVariables>;
  variables: AuthorQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });
  if (!data) return <></>;

  return <AuthorPosts data={data} />;
}
