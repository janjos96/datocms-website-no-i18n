'use client';

import { MenuQuery, MenuQueryVariables } from '@/graphql/generated';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import Header from '.';

const RealTimeHeader = ({
  initialData,
  token,
  query,
  variables,
}: {
  token: string;
  initialData: MenuQuery;
  query: TypedDocumentNode<MenuQuery>;
  variables: MenuQueryVariables;
}) => {
  const { data, error, status } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <Header data={data} />;
};

export default RealTimeHeader;
