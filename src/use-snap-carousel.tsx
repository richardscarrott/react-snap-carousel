import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

export interface SnapCarouselResult {
  readonly pages: number[][];
  readonly activePageIndex: number;
  readonly prev: () => void;
  readonly next: () => void;
  readonly goTo: (pageIndex: number) => void;
  readonly refresh: () => void;
  readonly scrollRef: (el: HTMLElement | null) => void;
}

export interface SnapCarouselOptions {
  readonly axis?: 'x' | 'y';
  readonly snapPointClassName?: string;
}

interface SnapCarouselState {
  readonly pages: number[][];
  readonly activePageIndex: number;
}

export const useSnapCarousel = ({
  axis = 'x',
  snapPointClassName
}: SnapCarouselOptions = {}): SnapCarouselResult => {
  const dimension = axis === 'x' ? 'width' : 'height';
  const scrollDimension = axis === 'x' ? 'scrollWidth' : 'scrollHeight';
  const clientDimension = axis === 'x' ? 'clientWidth' : 'clientHeight';
  const nearSidePos = axis === 'x' ? 'left' : 'top';
  const farSidePos = axis === 'x' ? 'right' : 'bottom';
  const scrollPos = axis === 'x' ? 'scrollLeft' : 'scrollTop';
  const offsetPos = axis === 'x' ? 'offsetLeft' : 'offsetTop';

  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  // NOTE: `pages` & `activePageIndex` are modelled as a single state object
  // to ensure they don't become out of sync with one another. (i.e. would rather
  // not implicitly rely on set state batching)
  const [{ pages, activePageIndex }, setCarouselState] =
    useState<SnapCarouselState>({
      pages: [],
      activePageIndex: 0
    });

  const refreshActivePage = useCallback(
    (pages: number[][]) => {
      if (!scrollEl) {
        return;
      }
      // https://excalidraw.com/#json=1ztbZ26T3ri14SiJBZlt4,Rqa2mjiaYJesnfPYEiBdPQ
      const hasScrolledToEnd =
        Math.floor(scrollEl[scrollDimension] - scrollEl[scrollPos]) <=
        scrollEl[clientDimension];
      if (hasScrolledToEnd) {
        // If scrolled to the end, set page to last as it may not end up with an
        // offset of 0 due to scroll capping.
        // (it's not quite aligned with how snapping works, but good enough for now)
        setCarouselState({ pages, activePageIndex: pages.length - 1 });
        return;
      }
      const items = Array.from(scrollEl.children);
      const scrollPort = scrollEl.getBoundingClientRect();
      const offsets = pages.map((page) => {
        const leadIndex = page[0];
        const leadEl = items[leadIndex];
        const rect = leadEl.getBoundingClientRect();
        const offset = rect[nearSidePos] - scrollPort[nearSidePos];
        return Math.abs(offset);
      });
      const minOffset = Math.min(...offsets);
      const nextActivePageIndex = offsets.indexOf(minOffset);
      setCarouselState({ pages, activePageIndex: nextActivePageIndex });
    },
    [scrollEl, clientDimension, nearSidePos, scrollDimension, scrollPos]
  );

  const refresh = useCallback(() => {
    if (!scrollEl) {
      return;
    }
    const items = Array.from(scrollEl.children);
    const scrollPort = scrollEl.getBoundingClientRect();
    let currPageDimension = 0;
    let allItemsDimension = 0;
    const pages = items.reduce<number[][]>((acc, item, i) => {
      const currPage = acc[acc.length - 1];
      // NOTE: `itemDimension` is determined by measuring the far side of the
      // bounding box; this ensures any margin / positioning influencing the visible
      // position of the element is factored in.
      const itemDimension =
        item.getBoundingClientRect()[farSidePos] -
        scrollPort[nearSidePos] +
        scrollEl[scrollPos] -
        allItemsDimension;
      currPageDimension += itemDimension;
      allItemsDimension += itemDimension;
      if (!currPage || currPageDimension > scrollPort[dimension]) {
        acc.push([i]);
        currPageDimension = itemDimension;
      } else {
        currPage.push(i);
      }
      return acc;
    }, []);
    refreshActivePage(pages);
  }, [
    refreshActivePage,
    scrollEl,
    dimension,
    farSidePos,
    nearSidePos,
    scrollPos
  ]);

  useLayoutEffect(() => {
    refresh();
  }, [refresh]);

  // On resize we need to refresh the state
  useEffect(() => {
    const handle = () => {
      // TODO: Consider debouncing
      refresh();
    };
    window.addEventListener('resize', handle);
    window.addEventListener('orientationchange', handle);
    return () => {
      window.removeEventListener('resize', handle);
      window.removeEventListener('orientationchange', handle);
    };
  }, [refresh]);

  // On scroll we only need to refresh the current page as it won't impact `pages`.
  useEffect(() => {
    if (!scrollEl) {
      return;
    }
    const handle = () => {
      // TODO: Consider debouncing
      refreshActivePage(pages);
    };
    scrollEl.addEventListener('scroll', handle);
    return () => {
      scrollEl.removeEventListener('scroll', handle);
    };
  }, [refreshActivePage, pages, scrollEl]);

  const handleGoTo = (index: number) => {
    if (!scrollEl) {
      return;
    }
    const page = pages[index];
    if (!page) {
      return;
    }
    const items = Array.from(scrollEl.children);
    const leadIndex: number | undefined = page[0];
    const leadEl: Element | undefined = items[leadIndex];
    if (!(leadEl instanceof HTMLElement)) {
      return;
    }
    scrollEl.scrollTo({
      behavior: 'smooth',
      [nearSidePos]: leadEl[offsetPos]
    });
  };

  const handlePrev = () => {
    handleGoTo(activePageIndex - 1);
  };

  const handleNext = () => {
    handleGoTo(activePageIndex + 1);
  };

  // Render snap points
  // NOTE: This could be handed off to the call site via a render prop, but as `scrollEl.children`
  // is known to this hook, imperatively updating them seems reasonable and more useful.
  useLayoutEffect(() => {
    if (!scrollEl) {
      return;
    }
    const setSnapPoint = (el: HTMLElement) =>
      snapPointClassName
        ? el.classList.add(snapPointClassName)
        : (el.style.scrollSnapAlign = 'start');

    const clearSnapPoint = (el: HTMLElement) =>
      snapPointClassName
        ? el.classList.remove(snapPointClassName)
        : (el.style.scrollSnapAlign = '');

    const items = Array.from(scrollEl.children);
    const snapPointIndexes = new Set(pages.map((page) => page[0]));
    items.forEach((item, i) => {
      if (!(item instanceof HTMLElement)) {
        return;
      }
      if (snapPointIndexes.has(i)) {
        setSnapPoint(item);
      } else {
        clearSnapPoint(item);
      }
    });
    return () => {
      items.forEach((item) => {
        if (!(item instanceof HTMLElement)) {
          return;
        }
        clearSnapPoint(item);
      });
    };
  }, [pages, scrollEl, snapPointClassName]);

  return {
    prev: handlePrev,
    next: handleNext,
    goTo: handleGoTo,
    refresh,
    pages,
    activePageIndex,
    scrollRef: setScrollEl
  };
};
