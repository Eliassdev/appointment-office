import React from "react";

export const BranchPagination = ({ total, limit, setPage, Page }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="w-full h-11 mt-2 rounded-full py-1 space-x-2">
      {pageNumbers.map(page => {
        return (
          <button
            className={`${
              Page === page ? "bg-amber-500 shadow-gray-600" : "bg-amber-400"
            } w-8 h-8 rounded-full shadow-lg`}
            onClick={() => {
              setPage(page);
            }}
            key={page}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
