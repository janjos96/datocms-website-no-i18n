'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import FooterRenderer from './FooterRenderer';
import { FooterQuery, FooterQueryVariables } from '@/graphql/generated';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export default function RealTimeFooter({
  initialData,
  token,
  query,
  variables,
}: {
  token: string;
  initialData: FooterQuery;
  query: TypedDocumentNode<FooterQuery>;
  variables?: FooterQueryVariables;
}) {
  const { data, error, status } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <FooterRenderer data={data} />;
}
