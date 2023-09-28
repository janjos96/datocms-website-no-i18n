'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import Section from './Sections';
import {
  CollectionMetadata,
  PageModelSectionsField,
  PageQuery,
  PageQueryVariables,
  PostRecord,
} from '@/graphql/generated';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export default function RealTimeSections({
  initialData,
  token,
  query,
  variables,
}: {
  initialData: PageQuery;
  variables: PageQueryVariables;
  query: TypedDocumentNode<PageQuery, PageQueryVariables>;
  token: string;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data || !data.page) return <></>;

  return (
    <Section
      sections={data.page.sections as Array<PageModelSectionsField>}
      posts={data.allPosts as PostRecord[]}
      postMeta={data._allPostsMeta as CollectionMetadata}
    />
  );
}
