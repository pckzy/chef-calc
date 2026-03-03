// const InventoryPagination = ({
//   currentPage,
//   totalItems,
//   itemsPerPage,
//   onPageChange,
// }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const startIndex =
//     totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   if (totalItems === 0) return null;

//   return (
//     <div className="p-4 border-t border-neutral-border dark:border-gray-800 flex justify-between items-center bg-neutral-surface/20 dark:bg-gray-800/20 rounded-b-xl">
//       <span className="text-sm text-neutral-text-secondary">
//         Showing{" "}
//         <span className="font-bold text-neutral-text-main dark:text-white">
//           {startIndex}-{endIndex}{" "}
//         </span>
//         of {totalItems}
//       </span>
//       <div className="flex gap-2">
//         {/* ปุ่ม Previous */}
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-3 py-1 text-sm font-medium text-neutral-text-secondary hover:text-neutral-text-main disabled:opacity-50"
//         >
//           Previous
//         </button>

//         {/* รายการเลขหน้า */}
//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             onClick={() => onPageChange(number)}
//             className={`px-3 py-1 text-sm font-medium rounded shadow-sm border ${
//               currentPage === number
//                 ? "text-neutral-text-main bg-white dark:bg-gray-700 border-neutral-border dark:border-gray-600"
//                 : "text-neutral-text-secondary hover:text-neutral-text-main border-transparent"
//             }`}
//           >
//             {number}
//           </button>
//         ))}

//         {/* ปุ่ม Next */}
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 text-sm font-medium text-neutral-text-secondary hover:text-neutral-text-main disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InventoryPagination;


const InventoryPagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // ฟังก์ชันสำหรับคำนวณเลขหน้าที่จะแสดงพร้อมปุ่ม ...
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    if (totalPages <= showMax + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div className="p-4 border-t border-neutral-border dark:border-gray-800 flex justify-between items-center bg-neutral-surface/20 dark:bg-gray-800/20 rounded-b-xl">
      <span className="text-sm text-neutral-text-secondary">
        Showing{' '}
        <span className="font-bold text-neutral-text-main dark:text-white">
          {startIndex}-{endIndex}{' '}
        </span>
        of {totalItems}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm font-medium text-neutral-text-secondary hover:text-neutral-text-main disabled:opacity-50 transition-colors"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === "..."}
            className={`px-3 py-1 text-sm font-medium rounded shadow-sm border transition-all ${
              page === "..." 
                ? "cursor-default border-transparent text-neutral-text-secondary/50"
                : currentPage === page
                  ? "text-neutral-text-main bg-white dark:bg-gray-700 border-neutral-border dark:border-gray-600"
                  : "text-neutral-text-secondary hover:text-neutral-text-main border-transparent hover:bg-neutral-surface dark:hover:bg-gray-800"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm font-medium text-neutral-text-secondary hover:text-neutral-text-main disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InventoryPagination;