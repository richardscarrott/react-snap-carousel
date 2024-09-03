import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  InfiniteCarousel,
  InfiniteCarouselItem,
  InfiniteCarouselRef
} from './infinite-carousel';
import { Button } from './lib/button';
import { Select } from './lib/select';

export default {
  title: 'Infinite Carousel',
  component: InfiniteCarousel
};

export const Default = () => {
  const items = Array.from({ length: 18 }).map((_, index) => ({
    id: index,
    index
  }));
  return (
    <InfiniteCarousel
      items={items}
      renderItem={({ item, index, isSnapPoint, shouldSnap }) => (
        <InfiniteCarouselItem
          key={index}
          isSnapPoint={isSnapPoint}
          shouldSnap={shouldSnap}
          bgColor={getColor(item.index)}
        >
          {item.index + 1}
        </InfiniteCarouselItem>
      )}
    />
  );
};

export const VariableWidth = () => {
  const items = [
    110, 300, 500, 120, 250, 300, 500, 400, 180, 300, 350, 700, 400, 230, 300
  ].map((width, index) => ({ id: index, index, width }));
  return (
    <InfiniteCarousel
      items={items}
      renderItem={({ item, index, isSnapPoint, shouldSnap }) => (
        <InfiniteCarouselItem
          key={index}
          isSnapPoint={isSnapPoint}
          shouldSnap={shouldSnap}
          bgColor={getColor(item.index)}
          width={item.width}
        >
          {item.index + 1}
        </InfiniteCarouselItem>
      )}
    />
  );
};

export const VerticalAxis = () => {
  const items = Array.from({ length: 18 }).map((_, index) => ({
    id: index,
    index
  }));
  return (
    <InfiniteCarousel
      axis="y"
      items={items}
      renderItem={({ item, index, isSnapPoint, shouldSnap }) => (
        <InfiniteCarouselItem
          key={index}
          isSnapPoint={isSnapPoint}
          shouldSnap={shouldSnap}
          bgColor={getColor(item.index)}
        >
          {item.index + 1}
        </InfiniteCarouselItem>
      )}
    />
  );
};

export const DynamicItems = () => {
  const carouselRef = useRef<InfiniteCarouselRef>(null);
  const [items, setItems] = useState(() =>
    Array.from({ length: 6 }).map((_, index) => ({ id: index, index }))
  );
  const addItem = () => {
    setItems((prev) => [...prev, { id: prev.length, index: prev.length }]);
  };
  const removeItem = () => {
    setItems((prev) => prev.slice(0, -1));
  };
  useLayoutEffect(() => {
    if (!carouselRef.current) {
      return;
    }
    carouselRef.current.refresh();
  }, [items]);
  return (
    <>
      <div style={{ display: 'flex', gap: '10px', margin: '0 0 10px' }}>
        <Button onClick={() => removeItem()}>Remove Item</Button>
        <Button onClick={() => addItem()}>Add Item</Button>
      </div>
      <InfiniteCarousel
        ref={carouselRef}
        items={items}
        renderItem={({ item, index, isSnapPoint, shouldSnap }) => (
          <InfiniteCarouselItem
            key={index}
            isSnapPoint={isSnapPoint}
            shouldSnap={shouldSnap}
            bgColor={getColor(item.index)}
          >
            {item.index + 1}
          </InfiniteCarouselItem>
        )}
      />
    </>
  );
};

export const ScrollBehavior = () => {
  const scrollBehaviors: ScrollBehavior[] = ['smooth', 'instant', 'auto'];
  const [scrollBehavior, setScrollBehavior] = useState(scrollBehaviors[0]);
  const items = Array.from({ length: 18 }).map((_, index) => ({
    id: index,
    index
  }));
  return (
    <>
      <div style={{ margin: '0 0 10px' }}>
        <Select
          onChange={(e) => {
            setScrollBehavior(e.target.value as ScrollBehavior);
          }}
          value={scrollBehavior}
        >
          {scrollBehaviors.map((value) => (
            <option key={value} value={value}>
              {value.slice(0, 1).toUpperCase() + value.slice(1)}
            </option>
          ))}
        </Select>
      </div>
      <InfiniteCarousel
        scrollBehavior={scrollBehavior}
        items={items}
        renderItem={({ item, index, isSnapPoint, shouldSnap }) => (
          <InfiniteCarouselItem
            key={index}
            isSnapPoint={isSnapPoint}
            shouldSnap={shouldSnap}
            bgColor={getColor(item.index)}
          >
            {item.index + 1}
          </InfiniteCarouselItem>
        )}
      />
    </>
  );
};

/* Utils */

const getColor = (i: number) => {
  return `hsl(-${i * 12} 100% 50%)`;
};
