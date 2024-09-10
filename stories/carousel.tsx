import React, { useImperativeHandle } from 'react';
import classNames from 'classnames';
import { useSnapCarousel } from '../src/use-snap-carousel';
import './reset.css';
const styles = require('./carousel.module.css');

/**
 * This is an example Carousel built on top of `useSnapCarousel`
 */

export interface CarouselProps<T> {
  readonly axis?: 'x' | 'y';
  readonly items: T[];
  readonly renderItem: (
    props: CarouselRenderItemProps<T>
  ) => React.ReactElement<CarouselItemProps>;
  readonly scrollMargin?: boolean;
  readonly scrollBehavior?: ScrollBehavior;
}

export interface CarouselRenderItemProps<T> {
  readonly item: T;
  readonly index: number;
  readonly isSnapPoint: boolean;
}

export interface CarouselRef {
  readonly refresh: () => void;
}

export const Carousel = React.forwardRef<CarouselRef, CarouselProps<unknown>>(
  ({ axis, items, renderItem, scrollMargin = false, scrollBehavior }, ref) => {
    const {
      scrollRef,
      hasNextPage,
      hasPrevPage,
      next,
      prev,
      goTo,
      pages,
      activePageIndex,
      snapPointIndexes,
      refresh
    } = useSnapCarousel({ axis });

    useImperativeHandle(ref, () => ({ refresh }));

    return (
      <div
        className={classNames(styles.root, {
          [styles.x]: axis === 'x',
          [styles.y]: axis === 'y',
          [styles.scrollMargin]: scrollMargin
        })}
      >
        <ul className={styles.scroll} ref={scrollRef}>
          {items.map((item, index) =>
            renderItem({
              item,
              index,
              isSnapPoint: snapPointIndexes.has(index)
            })
          )}
        </ul>
        <div className={styles.pageIndicator}>
          {activePageIndex + 1} / {pages.length}
        </div>
        <div className={styles.controls}>
          <button
            disabled={!hasPrevPage}
            onClick={() => prev({ behavior: scrollBehavior })}
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
                  onClick={() => goTo(i, { behavior: scrollBehavior })}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ol>
          <button
            disabled={!hasNextPage}
            onClick={() => next({ behavior: scrollBehavior })}
            className={styles.nextButton}
          >
            {String.fromCharCode(8594)}
          </button>
        </div>
      </div>
    );
  }
  // https://fettblog.eu/typescript-react-generic-forward-refs/
) as <T extends any>(
  props: CarouselProps<T> & { ref?: React.ForwardedRef<CarouselRef> }
) => React.ReactElement;

export interface CarouselItemProps {
  readonly isSnapPoint: boolean;
  readonly bgColor: string;
  readonly width?: number;
  readonly children?: React.ReactNode;
}

export const CarouselItem = ({
  isSnapPoint,
  bgColor,
  width,
  children
}: CarouselItemProps) => {
  return (
    <li
      className={styles.item}
      style={{
        backgroundColor: bgColor,
        width: width ?? '',
        scrollSnapAlign: isSnapPoint ? 'start' : ''
      }}
    >
      {children}
    </li>
  );
};
