import { SiteLocale } from '@/graphql/generated';

type Props = {
  postCount: number;
};

const PageIndicatorList = ({ postCount }: Props) => {
  const listOfPages = [];

  for (let i = 0; i * 9 < postCount; i++) {
    listOfPages.push(
      <li className="mx-1">
        <a
          href={i === 0 ? '/posts/' : '/posts/page/' + (i + 1)}
          className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
        >
          {i + 1}
        </a>
      </li>
    );
  }

  return listOfPages;
};

export default PageIndicatorList;
