# React Snap Carousel 🫰

[![GitHub package.json version](https://img.shields.io/github/package-json/v/richardscarrott/react-snap-carousel.svg)](https://www.npmjs.com/package/react-snap-carousel)
[![CI](https://github.com/richardscarrott/react-snap-carousel/actions/workflows/node.js.yml/badge.svg)](https://github.com/richardscarrott/react-snap-carousel/actions/workflows/node.js.yml)
[![GitHub license](https://img.shields.io/github/license/richardscarrott/react-snap-carousel.svg)](https://github.com/richardscarrott/react-snap-carousel/blob/main/LICENSE)

DOM-first, responsive carousel for React.

React Snap Carousel leaves the DOM in charge of scrolling and simply computes derived state from the layout, allowing you to progressively enhance a scroll element with responsive carousel controls.

![Alt Text](react-snap-carousel.gif)

🧈 Utilizes native browser scrolling & CSS scroll snap points for best performance and UX

📏 Computes responsive page state from DOM layout & scroll position

📲 Dynamic page-based CSS snap point rendering

🎛 Full control over UI using React Hooks API

🖋️ Written in TypeScript

☕️ [Lightweight (~1kB)](https://bundlephobia.com/package/react-snap-carousel) + zero dependencies

## Install

```
npm install react-snap-carousel
```

## Examples

🔥[StoryBook Examples](https://richardscarrott.github.io/react-snap-carousel/)🔥

✨[CodeSandbox StarterKit](https://codesandbox.io/s/react-snap-carousel-0zlvmw?file=/src/Carousel.tsx)✨

## Usage

React Snap Carousel doesn't expose a ready-made `<Carousel />` component and instead offers a single export `useSnapCarousel` which provides the state & functions necessary to build your own carousel component.

The following code snippet is a good starting point.

> Inline styles are used for simplicity. You can use whichever CSS framework you prefer.

> You can see it in action on [CodeSandbox](https://codesandbox.io/s/react-snap-carousel-0zlvmw?file=/src/Carousel.tsx).

```tsx
// Carousel.tsx
import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

const styles = {
  root: {},
  scroll: {
    position: 'relative',
    display: 'flex',
    overflow: 'auto',
    scrollSnapType: 'x mandatory'
  },
  item: {
    width: '250px',
    height: '250px',
    flexShrink: 0
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextPrevButton: {},
  nextPrevButtonDisabled: { opacity: 0.3 },
  pagination: {
    display: 'flex'
  },
  paginationButton: {
    margin: '10px'
  },
  paginationButtonActive: { opacity: 0.3 },
  pageIndicator: {
    display: 'flex',
    justifyContent: 'center'
  }
};

interface CarouselProps {
  readonly children?: React.ReactNode;
}

export const Carousel = ({ children }: CarouselProps) => {
  const { scrollRef, pages, activePageIndex, prev, next, goTo } =
    useSnapCarousel();
  return (
    <div style={styles.root}>
      <ul style={styles.scroll} ref={scrollRef}>
        {children}
      </ul>
      <div style={styles.controls}>
        <button
          style={{
            ...styles.nextPrevButton,
            ...(activePageIndex === 0 ? styles.nextPrevButtonDisabled : {})
          }}
          onClick={() => prev()}
        >
          Prev
        </button>
        {pages.map((_, i) => (
          <button
            style={{
              ...styles.paginationButton,
              ...(activePageIndex === i ? styles.paginationButtonActive : {})
            }}
            onClick={() => goTo(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          style={{
            ...styles.nextPrevButton,
            ...(activePageIndex === pages.length - 1
              ? styles.nextPrevButtonDisabled
              : {})
          }}
          onClick={() => next()}
        >
          Next
        </button>
      </div>
      <div style={styles.pageIndicator}>
        {activePageIndex + 1} / {pages.length}
      </div>
    </div>
  );
};

interface CarouselItemProps {
  readonly children?: React.ReactNode;
}

export const CarouselItem = ({ children }: CarouselItemProps) => (
  <li style={styles.item}>{children}</li>
);
```

```tsx
// App.tsx
import { Carousel, CarouselItem } from './Carousel';

const items = Array.from({ length: 20 }).map(
  (_, i) => `https://picsum.photos/500?idx=${i}`
);

const App = () => (
  <Carousel>
    {items.map((imgSrc) => (
      <CarouselItem>
        <img src={imgSrc} width="250" height="250" />
      </CarouselItem>
    ))}
  </Carousel>
);

export default App;
```

## License

[MIT](LICENSE)
