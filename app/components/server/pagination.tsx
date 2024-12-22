import Link from 'next/link';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function Pagination({
  currentPage,
  lastPage,
}: {
  currentPage: number;
  lastPage: number;
}) {
  const pageRange = 5; // 페이지버튼 갯수
  const centerPage = Math.floor(pageRange / 2); // 중앙 페이지
  let startPage = Math.max(currentPage - centerPage, 1); // 시작 페이지
  let endPage = Math.min(currentPage + centerPage, lastPage); // 끝 페이지

  if (endPage - startPage + 1 < pageRange) {
    if (startPage === 1) {
      endPage = Math.min(startPage + pageRange - 1, lastPage);
    } else if (endPage === lastPage) {
      startPage = Math.max(endPage - pageRange + 1, 1);
    }
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center justify-center space-x-2 mb-5">
      <div className={"flex items-center"}>
        {currentPage > 1 ? (
          <>
            <Link href={`?page=1`} className="p-2 text-lg">
              <FaAngleDoubleLeft />
            </Link>
            <Link href={`?page=${currentPage - 1}`} className="p-2 text-lg">
              <FaAngleLeft />
            </Link>
          </>
        ) : (
          <div style={{width: '68px'}} /> 
        )}
      </div>
      <div className="flex items-center mx-auto">
        {pages.map((page) => (
          <Link
            key={page}
            href={`?page=${page}`}
            className={`p-2 text-lg rounded-md ${
              page === currentPage
                ? 'bg-black text-white font-bold'
                : 'bg-transparent text-black dark:text-white hover:bg-gray-200'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className={"flex items-center"}>
        {currentPage < lastPage ? (
          <>
            <Link href={`?page=${currentPage + 1}`} className="p-2 text-lg">
              <FaAngleRight />
            </Link>
            <Link href={`?page=${lastPage}`} className="p-2 text-lg">
              <FaAngleDoubleRight />
            </Link>
          </>
        ) : (
          <div style={{width: '68px'}} /> 
        )}
      </div>
    </div>
  );
}
