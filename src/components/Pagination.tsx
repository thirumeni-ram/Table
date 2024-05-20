import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CircularPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CircularPagination: React.FC<CircularPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getItemProps = (index: number) => ({
    onClick: () => onPageChange(index),
    className: `flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
      currentPage === index
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`,
  });

  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 ml-[15.75rem]">
      <button
        className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1.5 text-gray-600 transition duration-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} {...getItemProps(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1.5 text-gray-600 transition duration-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
      </button>
    </div>
  );
};
