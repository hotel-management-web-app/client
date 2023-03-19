import React from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  page: number;
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageCount }) => {
  const router = useRouter();

  const handlePageClick = (e: { selected: number }) => {
    router.push({ query: { page: e.selected + 1 } });
  };

  return (
    <div className="mt-5">
      <ReactPaginate
        pageCount={pageCount}
        initialPage={page - 1}
        onPageChange={handlePageClick}
        containerClassName="flex gap-10 justify-center"
        marginPagesDisplayed={3}
        renderOnZeroPageCount={() => null}
      />
    </div>
  );
};

export default Pagination;
