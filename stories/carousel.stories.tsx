import React, { useLayoutEffect, useRef, useState } from 'react';
import { Carousel, CarouselItem, CarouselRef } from './carousel';

export default {
  title: 'Carousel',
  component: Carousel
};

export const Default = () => {
  const items = Array.from({ length: 18 }).map((_, index) => ({ id: index }));
  return (
    <Carousel
      items={items}
      renderItem={({ item, index, isSnapPoint }) => (
        <CarouselItem
          key={item.id}
          isSnapPoint={isSnapPoint}
          bgColor={getColor(index)}
        >
          {index + 1}
        </CarouselItem>
      )}
    />
  );
};

export const VariableWidth = () => {
  const items = [
    110, 300, 500, 120, 250, 300, 500, 400, 180, 300, 350, 700, 400, 230, 300
  ];
  return (
    <Carousel
      items={items}
      renderItem={({ item: width, index, isSnapPoint }) => (
        <CarouselItem
          key={index}
          isSnapPoint={isSnapPoint}
          bgColor={getColor(index)}
          width={width}
        >
          {index + 1}
        </CarouselItem>
      )}
    />
  );
};

export const VerticalAxis = () => {
  const items = Array.from({ length: 18 }).map((_, index) => ({ id: index }));
  return (
    <Carousel
      axis="y"
      items={items}
      renderItem={({ item, index, isSnapPoint }) => (
        <CarouselItem
          key={item.id}
          isSnapPoint={isSnapPoint}
          bgColor={getColor(index)}
        >
          {index + 1}
        </CarouselItem>
      )}
    />
  );
};

export const DynamicItems = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [items, setItems] = useState(() =>
    Array.from({ length: 1 }).map((_, index) => ({ id: index }))
  );
  const addItem = () => {
    setItems((prev) => [...prev, { id: prev.length }]);
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
      <Button onClick={() => removeItem()}>Remove Item</Button>
      <Button onClick={() => addItem()}>Add Item</Button>
      <Carousel
        ref={carouselRef}
        items={items}
        renderItem={({ item, index, isSnapPoint }) => (
          <CarouselItem
            key={item.id}
            isSnapPoint={isSnapPoint}
            bgColor={getColor(index)}
          >
            {index + 1}
          </CarouselItem>
        )}
      />
    </>
  );
};

/* Utils */

const getColor = (i: number) => {
  return `hsl(${i * 12} 100% 50%)`;
};

interface ButtonProps {
  readonly children?: React.ReactNode;
  readonly onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      style={{
        background: '#04bfad',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#fff',
        padding: 10,
        marginRight: 5,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 5
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
