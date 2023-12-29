import React from 'react';

const PaginationControls = ({ page, totalPages, prevPage, nextPage, isFirstPage, isLastPage }) => (
  <div>
    <span>
      Page {page} of {totalPages} 
    </span>
    <button onClick={prevPage} disabled={isFirstPage}>
      Previous
    </button>
    <button onClick={nextPage} disabled={isLastPage}>
      Next
    </button>
  </div>
);

export default PaginationControls;
