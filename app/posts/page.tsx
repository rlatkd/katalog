import { getBlogPosts } from '../utils/mdx';
import { Posts } from 'app/components/posts';
import Pagination from 'app/components/pagination';
import { Top } from 'app/components/top';

const POSTS_PER_PAGE = 5; // 게시글 랜더링 수

type PageProps = {
  searchParams: {
    page?: string;
  };
};

export default function Page({ searchParams }: PageProps) {
  const allPosts = getBlogPosts().sort((a,b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10)); // 내림차순 정렬(최신글이 맨 위로)
  const totalPosts = allPosts.length; // 총 게시글 수
  const lastPage = Math.ceil(totalPosts / POSTS_PER_PAGE); // 마지막 페이지
  const currentPage = parseInt(searchParams.page || "1", 10); // 현재 페이지
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE; // 시작 게시글 번호(페이지당)
  const endIndex = startIndex + POSTS_PER_PAGE; // 끝 게시글 번호(페이지당)
  const currentPosts = allPosts.slice(startIndex, endIndex); // 현재 게시글들

  return (
    <>
      <Top headerText="블로그-안녕하세요 김상훈입니다" headerImage="/static/images/header.jpg" />
      <section className='w-4/6 mx-auto'>
        <Posts posts={currentPosts} />
        <Pagination currentPage={currentPage} lastPage={lastPage} />
      </section>
    </>
  );
}
