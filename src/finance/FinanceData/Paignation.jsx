/* eslint-disable react/prop-types */
function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    onPageChange(page);
  };
  return (
    <nav aria-label="Page navigation">
      <ul className="flex space-x-2 justify-end">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-blue-600 border border-blue-600 bg rounded-l hover:bg-blue-400 hover:text-white"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => {
          // Display buttons for currentPage and a few surrounding pages
          const showPage =
            i + 1 === 1 ||
            i + 1 === currentPage ||
            i + 1 === totalPages ||
            Math.abs(i + 1 - currentPage) <= 2;
          if (showPage) {
            return (
              <li key={i}>
                <button
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 ${
                    i + 1 === currentPage
                      ? 'bg-green-700 text-white font-bold'
                      : 'text-blue-600 hover:bg-blue-400 hover:text-white'
                  } border border-blue-600`}
                >
                  {i + 1} 
                </button>
               
              </li>
            );
          }
          return null;
        })}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-blue-600 border border-blue-600 rounded-r hover:bg-blue-400 hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
