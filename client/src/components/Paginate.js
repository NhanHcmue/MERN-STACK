import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { NavLink, useLocation } from "react-router-dom";
import { useSearchParams } from "../hooks/useSearchParams";

export default function Paginate({ totalPage }) {
  const location = useLocation();
  const searchParams = useSearchParams();
  const currentPage = +searchParams.get("page") || 1;

  const createPageArray = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 ||
        i === totalPage ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pages = createPageArray();

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 mt-5">
      <div className="flex-1 flex items-center justify-center overflow-x-auto">
        <nav
          className="inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {/* Previous */}
          <NavLink
            to={`${location.pathname}?page=${
              currentPage > 1 ? currentPage - 1 : 1
            }`}
            className="inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </NavLink>

          {/* Pages with ... */}
          {pages.map((page, index) =>
            page === "..." ? (
              <span
                key={index}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400"
              >
                ...
              </span>
            ) : (
              <NavLink
                to={`${location.pathname}?page=${page}`}
                key={page}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium border ${
                  page === currentPage
                    ? "text-white bg-black border-black"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </NavLink>
            )
          )}

          {/* Next */}
          <NavLink
            to={`${location.pathname}?page=${
              currentPage < totalPage ? currentPage + 1 : totalPage
            }`}
            className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
