import React from 'react';
import classNames from 'classnames';
import { useSnapCarousel } from '../src/use-snap-carousel';
import './reset.css';
const styles = require('./carousel.module.css');

export const Carousel = () => {
  const { scrollRef, next, prev, goTo, pages, activePageIndex, refresh } =
    useSnapCarousel();
  return (
    <div className={styles.root}>
      <ul className={styles.scroll} ref={scrollRef}>
        {Array.from({ length: 100 }).map((_, i) => (
          <li
            className={styles.item}
            key={i}
            style={{ backgroundColor: getColor(i) }}
          >
            Item {i}
          </li>
        ))}
      </ul>
      <div className={styles.pageIndicator}>
        {activePageIndex + 1} / {pages.length}
      </div>
      <button className={styles.prevButton} onClick={() => prev()}>
        ⬅️ Prev
      </button>
      <button className={styles.nextButton} onClick={() => next()}>
        Next ➡️
      </button>
      <ol className={styles.pagination}>
        {pages.map((_, i) => (
          <li className={styles.paginationItem} key={i}>
            <button
              className={classNames(styles.paginationButton, {
                [styles.paginationButtonActive]: i === activePageIndex
              })}
              onClick={() => goTo(i)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

const getColor = (i: number) => {
  return `hsl(${i * 10} 100% 50%)`;
};
