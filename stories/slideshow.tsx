import React from 'react';
import classNames from 'classnames';
import { useSnapCarousel } from '../src/use-snap-carousel';
import './reset.css';
const styles = require('./slideshow.module.css');

/**
 * This is an example Carousel built on top of `useSnapCarousel`
 */

export interface SlideShowProps {
  readonly children?: React.ReactNode;
}

export const SlideShow = ({ children }: SlideShowProps = {}) => {
  const { scrollRef, next, prev, goTo, pages, activePageIndex, refresh } =
    useSnapCarousel();
  return (
    <div className={styles.root}>
      <ul className={styles.scroll} ref={scrollRef}>
        {children}
      </ul>
      <div className={styles.pageIndicator}>
        {activePageIndex + 1} / {pages.length}
      </div>
      <div className={styles.controls}>
        <button
          disabled={activePageIndex === 0}
          onClick={() => prev()}
          className={styles.prevButton}
        >
          {String.fromCharCode(8592)}
        </button>
        <ol className={styles.pagination}>
          {pages.map((_, i) => (
            <li
              key={i}
              className={classNames(styles.paginationItem, {
                [styles.paginationItemActive]: i === activePageIndex
              })}
            >
              <button
                className={styles.paginationButton}
                onClick={() => goTo(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <button
          disabled={activePageIndex === pages.length - 1}
          onClick={() => next()}
          className={styles.nextButton}
        >
          {String.fromCharCode(8594)}
        </button>
      </div>
    </div>
  );
};

export interface SlideShowItemProps {
  readonly src: string;
}

export const SlideShowItem = ({ src }: SlideShowItemProps) => {
  return (
    <li className={styles.item}>
      <img src={src} className={styles.image} />
    </li>
  );
};
