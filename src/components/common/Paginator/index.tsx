import React, { useState } from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";

import { PaginatorPropsType } from "./types";

const Paginator: React.FC<PaginatorPropsType> = (props) => {
  const {
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize = 10,
  } = props;

  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter(
          (page) => page >= leftPortionNumber && page <= rightPortionNumber
        )
        .map((page) => {
          return (
            <span
              className={cn(
                {
                  [styles.selectedPage]: currentPage === page,
                },
                styles.pageNumber
              )}
              key={page}
              onClick={(e) => {
                onPageChanged(page);
              }}
            >
              {page}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
