import React, { useImperativeHandle, useMemo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useSnapCarousel } from '../src/use-snap-carousel';
import './reset.css';
const styles = require('./infinite-carousel.module.css');

/**
 * This is an example of an infinite carousel built on top of `useSnapCarousel`
 *
 * NOTE: This is not truly infinite, but rather it's as-good-as-infinite because, in order to keep
 * complexity low, it merely duplicates items in either direction rather than trying to dynamically
 * change the scroll position.
 */

export interface InfiniteCarouselProps<T> {
  readonly axis?: 'x' | 'y';
  readonly items: T[];
  readonly renderItem: (
    props: InfiniteCarouselRenderItemProps<T>
  ) => React.ReactElement<InfiniteCarouselItemProps>;
  readonly scrollMargin?: boolean;
  readonly scrollBehavior?: ScrollBehavior;
}

export interface InfiniteCarouselRenderItemProps<T> {
  readonly item: T;
  readonly index: number;
  readonly isSnapPoint: boolean;
  readonly shouldSnap: boolean;
}

export interface InfiniteCarouselRef {
  readonly refresh: () => void;
}

export const InfiniteCarousel = React.forwardRef<
  InfiniteCarouselRef,
  InfiniteCarouselProps<unknown>
>(
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

    // 1. Duplicate the items to create the illusion of infinity.
    const duplicationFactor = items.length ? Math.ceil(250 / items.length) : 0;
    const itemsToRender = useMemo(
      () => Array.from({ length: duplicationFactor }).flatMap(() => items),
      [duplicationFactor, items]
    );

    // 2. Jump to the middle-most "first" page to minimize the chance of scrolling to either end.
    useLayoutEffect(() => {
      const itemsByPage = pages.map((page) =>
        page.map((idx) => itemsToRender[idx])
      );
      const allFirstPages = itemsByPage.filter(
        (page) => page[0] === itemsToRender[0]
      );
      const mid = allFirstPages[Math.floor(allFirstPages.length / 2)];
      goTo(itemsByPage.indexOf(mid), {
        behavior: 'instant'
      });
      // Need `useEffectEvent`
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages, itemsToRender]);

    // 3. Define the logical pages and the active page index to render based on the actual unique `items`.
    const pagesToRender = pages.filter((page) => page[0] <= items.length - 1);
    const activePageIndexToRender = pagesToRender.length
      ? activePageIndex % pagesToRender.length
      : -1;

    return (
      <div
        className={classNames(styles.root, {
          [styles.x]: axis === 'x',
          [styles.y]: axis === 'y',
          [styles.scrollMargin]: scrollMargin
        })}
      >
        <ul className={styles.scroll} ref={scrollRef}>
          {itemsToRender.map((item, index) =>
            renderItem({
              item,
              index,
              isSnapPoint: snapPointIndexes.has(index),
              // 4. Force snapping to the first item so that pages are always made up of the equivalent
              // items, even if the number of items isn't wholly divisible by the number of pages.
              // -- this simplifies the logic for rendering the controls.
              shouldSnap: item === itemsToRender[0]
            })
          )}
        </ul>
        <div className={styles.pageIndicator}>
          {activePageIndexToRender + 1} / {pagesToRender.length}
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
            {pagesToRender.map((_, i) => (
              <li
                key={i}
                className={classNames(styles.paginationItem, {
                  [styles.paginationItemActive]: i === activePageIndexToRender
                })}
              >
                <button
                  className={styles.paginationButton}
                  onClick={() =>
                    // 5. Jump to the nearest equivalent page.
                    goTo(activePageIndex - activePageIndexToRender + i, {
                      behavior: scrollBehavior
                    })
                  }
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
  props: InfiniteCarouselProps<T> & {
    ref?: React.ForwardedRef<InfiniteCarouselRef>;
  }
) => React.ReactElement;

export interface InfiniteCarouselItemProps {
  readonly isSnapPoint: boolean;
  readonly shouldSnap: boolean;
  readonly bgColor: string;
  readonly width?: number;
  readonly children?: React.ReactNode;
}

export const InfiniteCarouselItem = ({
  isSnapPoint,
  shouldSnap,
  bgColor,
  width,
  children
}: InfiniteCarouselItemProps) => {
  return (
    <li
      className={styles.item}
      style={{
        backgroundColor: bgColor,
        width: width ?? '',
        scrollSnapAlign: isSnapPoint ? 'start' : ''
      }}
      data-should-snap={shouldSnap}
    >
      {children}
    </li>
  );
};
