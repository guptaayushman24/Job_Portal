import React from "react";
import './Pagination.css'
function Pagination({ page, totalPages, setPage }) {
    console.log(totalPages);
    return (
        <div className="pagination">
            {/* Previous Page Button */}
            <span 
                className={page > 1 ? "" : "pagination_disable"} 
                onClick={() => page > 1 && setPage(page - 1)}
            >
                ←
            </span>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
                <span
                    key={i}
                    className={page === i + 1 ? "paginationselected" : ""}
                    onClick={() => setPage(i + 1)}
                >
                    {i + 1}
                </span>
            ))}

            {/* Next Page Button */}
            <span 
                className={page < totalPages ? "" : "pagination_disable"} 
                onClick={() => page < totalPages && setPage(page + 1)}
            >
                →
            </span>
        </div>
    );
}

export default Pagination;
