# React Snap Carousel

DOM-first, progressively enhanced responsive carousel for React.

📜 Utilizes native browser scrolling & CSS scroll snap points

🧮 Computes responsive page state from scroll position & layout

📲 Dynamic CSS snap point rendering for smooth swiping

🎛 Full control over rendering via React Hooks API

## Usage

### Basic

This basic carousel will dynamically add CSS snap points to items based on the current layout.

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

### Advanced

Similarly, this more advanced carousel will dynamically add CSS snap points to items based on the current layout, but additionally provides dynamic pagination & next / prev controls.

```tsx
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
      <ol>
        {pages.map((_, i) => (
          <li style={{ display: 'flex' }} key={i}>
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
