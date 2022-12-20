# React Snap Carousel

[![GitHub package.json version](https://img.shields.io/github/package-json/v/richardscarrott/react-snap-carousel.svg)](https://www.npmjs.com/package/react-snap-carousel)
[![CI](https://github.com/richardscarrott/react-snap-carousel/actions/workflows/node.js.yml/badge.svg)](https://github.com/richardscarrott/react-snap-carousel/actions/workflows/node.js.yml)
[![GitHub license](https://img.shields.io/github/license/richardscarrott/react-snap-carousel.svg)](https://github.com/richardscarrott/react-snap-carousel/blob/main/LICENSE)

DOM-first, responsive carousel for React.

React Snap Carousel leaves the DOM in charge of scrolling and simply computes derived state from the layout, allowing you to progressively enhance a scroll element with responsive carousel controls.

🧈 Utilizes native browser scrolling & CSS scroll snap points

📏 Computes responsive page state from DOM layout & scroll position

📲 Dynamic page-based CSS snap point rendering

🎛 Full control over UI using React Hooks API

☕️ Zero dependencies + [small footprint (1.1kB)](https://bundlephobia.com/package/react-snap-carousel@0.0.1)

![Alt Text](react-snap-carousel.gif)

## Examples

🔥[LIVE DEMO](https://richardscarrott.github.io/react-snap-carousel/)🔥

## Usage

### Basic

This basic carousel will dynamically add CSS snap points to items based on the current DOM layout.

```tsx
import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

const BasicCarousel = () => {
  const { scrollRef } = useSnapCarousel();
  return (
    <ul
      ref={scrollRef}
      style={{
        display: 'flex',
        overflow: 'auto',
        scrollSnapType: 'x mandatory'
      }}
    >
      {Array.from({ length: 100 }).map((_, i) => (
        <li
          style={{
            backgroundColor: 'aqua',
            fontSize: '50px',
            width: '250px',
            height: '250px',
            flexShrink: 0,
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Item {i}
        </li>
      ))}
    </ul>
  );
};

export default BasicCarousel;
```

### Controls

This controls example additionally renders dynamic carousel controls.

```tsx
import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

const AdvancedCarousel = () => {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  return (
    <>
      <ul
        ref={scrollRef}
        style={{
          display: 'flex',
          overflow: 'auto',
          scrollSnapType: 'x mandatory'
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <li
            style={{
              backgroundColor: 'aqua',
              fontSize: '50px',
              width: '250px',
              height: '250px',
              flexShrink: 0,
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Item {i}
          </li>
        ))}
      </ul>
      <div>
        {activePageIndex + 1} / {pages.length}
      </div>
      <button onClick={() => prev()}>Prev</button>
      <button onClick={() => next()}>Next</button>
      <ol style={{ display: 'flex' }}>
        {pages.map((_, i) => (
          <li key={i}>
            <button
              style={i === activePageIndex ? { opacity: 0.5 } : {}}
              onClick={() => goTo(i)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol>
    </>
  );
};

export default AdvancedCarousel;
```

## License

[MIT](LICENSE)
