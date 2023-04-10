import React from 'react'

export const BranchPagination = ({ total, limit, setPage, Page }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="mt-2 h-11 w-full space-x-2 rounded-full py-1">
      {pageNumbers.map((page) => {
        return (
          <button
            className={`${
              Page === page ? 'bg-amber-500 shadow-gray-600' : 'bg-amber-400'
            } h-8 w-8 rounded-full shadow-lg`}
            onClick={() => {
              setPage(page)
            }}
            key={page}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}
