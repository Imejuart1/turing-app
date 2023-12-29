import React from 'react';

const PaginationControls = ({ page, totalPages, prevPage, nextPage, isFirstPage, isLastPage }) => 
{
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
return (
  <div>
    <span>
      Page {page} of {totalPages} 
    </span>
    {renderPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => console.log(`Go to page ${pageNumber}`)}
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
