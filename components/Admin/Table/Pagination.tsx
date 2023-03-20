import React from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  page: number;
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageCount }) => {
  const router = useRouter();
  const { limit } = router.query;

  const handlePageClick = (e: { selected: number }) => {
    router.push({ query: { page: e.selected + 1, limit } });
  };

  if (pageCount === 1) return null;

  return (
    <div className="mt-7">
      <ReactPaginate
        pageCount={pageCount}
        initialPage={page - 1}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center"
        previousLinkClassName="border px-3 py-2 md:px-4 md:py-2 rounded-l-md text-sm md:text-base"
        pageLinkClassName="border px-3 py-2 md:px-4 md:py-2 text-sm md:text-base"
        breakLinkClassName="border px-3 py-2 md:px-4 md:py-2 text-sm md:text-base"
        nextLinkClassName="border px-3 py-2 md:px-4 md:py-2 rounded-r-md text-sm md:text-base"
        activeLinkClassName="bg-gray-200 text-sm md:text-base"
        marginPagesDisplayed={3}
        renderOnZeroPageCount={() => null}
      />
    </div>
  );
};

export default Pagination;
