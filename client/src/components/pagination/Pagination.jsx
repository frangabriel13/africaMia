// import React from "react";
// import s from "./Pagination.module.css";

// const Pagination = ({ currentPage, totalPages, handlePageChange, goToPrevPage, goToNextPage }) => {
//   return (
//     <div className={s.pagination}>
//       <button onClick={goToPrevPage} className={s.page}>
//         {"<"}
//       </button>
//       {
//         Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             className={currentPage === index + 1 ? `${s.page} ${s.active}` : s.page}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))
//       }
//       <button onClick={goToNextPage} className={s.page}>
//         {">"}
//       </button>
//     </div>
//   );
// };


// export default Pagination;

import React from "react";
import s from "./Pagination.module.css";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRightLight } from "react-icons/pi";

const Pagination = ({ currentPage, totalPages, handlePageChange, goToPrevPage, goToNextPage }) => {
  return (
    <div className={s.pagination}>
      <button onClick={goToPrevPage} className={s.page}>
        <PiArrowLeftLight className={s.icon} />
      </button>
      <span className={s.pageInfo}>
        {currentPage}/{totalPages}
      </span>
      <button onClick={goToNextPage} className={s.page}>
        <PiArrowRightLight className={s.icon} />
      </button>
    </div>
  );
};

export default Pagination;