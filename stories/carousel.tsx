import React, { useImperativeHandle } from 'react';
import classNames from 'classnames';
import { useSnapCarousel } from '../src/use-snap-carousel';
import './reset.css';
const styles = require('./carousel.module.css');

/**
 * This is an example Carousel built on top of `useSnapCarousel`
 */

export interface CarouselProps {
  readonly axis?: 'x' | 'y';
  readonly children?: React.ReactNode;
}

export interface CarouselRef {
  readonly refresh: () => void;
}

export const Carousel = React.forwardRef<CarouselRef, CarouselProps>(
  ({ children, axis } = {}, ref) => {
    const { scrollRef, next, prev, goTo, pages, activePageIndex, refresh } =
      useSnapCarousel({ axis });

    useImperativeHandle(ref, () => ({ refresh }));

    return (
      <div
        className={classNames(styles.root, {
          [styles.x]: axis === 'x',
          [styles.y]: axis === 'y'
        })}
      >
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
  }
);

export interface CarouselItemProps {
  readonly bgColor: string;
  readonly width?: number;
  readonly children?: React.ReactNode;
}

export const CarouselItem = ({
  bgColor,
  width,
  children
}: CarouselItemProps) => {
  return (
    <li
      className={styles.item}
      style={{ backgroundColor: bgColor, width: width ?? '' }}
    >
      {children}
    </li>
  );
};
