import React from 'react';

const PaginationControls = ({ page, totalPages, prevPage, nextPage, isFirstPage, isLastPage,  goToPage, }) => 
{
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      const startPage = Math.max(1, page - halfVisiblePages);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pageNumbers.push(1, '...'); // Show first page and ellipsis
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        pageNumbers.push('...', totalPages); // Show ellipsis and last page
      }
    }

    return pageNumbers;
  };
  /*const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };*/
  
return (
  <div>
    <span>
      Page {page} of {totalPages} 
    </span>
    {renderPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() =>  goToPage(pageNumber)}
          disabled={page === pageNumber}
        >
          {pageNumber}
        </button>
      ))}
    <button onClick={prevPage} disabled={isFirstPage}>
      Previous
    </button>
    <button onClick={nextPage} disabled={isLastPage}>
      Next
    </button>
  </div>
);
}

export default PaginationControls;
