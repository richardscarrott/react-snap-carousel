import React, { useLayoutEffect, useRef, useState } from 'react';
import { Carousel, CarouselItem, CarouselRef } from './carousel';

export default {
  title: 'Carousel',
  component: Carousel
};

export const Default = () => {
  const items = Array.from({ length: 18 });
  return (
    <Carousel>
      {items.map((_, i) => (
        <CarouselItem key={i} bgColor={getColor(i)}>
          {i + 1}
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export const VariableWidth = () => {
  const items = [
    110, 300, 500, 120, 250, 300, 500, 400, 180, 300, 350, 700, 400, 230, 300
  ];
  return (
    <Carousel>
      {items.map((width, i) => (
        <CarouselItem key={i} bgColor={getColor(i)} width={width}>
          {i + 1}
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export const VerticalAxis = () => {
  const items = Array.from({ length: 18 });
  return (
    <Carousel axis="y">
      {items.map((_, i) => (
        <CarouselItem key={i} bgColor={getColor(i)}>
          {i + 1}
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export const DynamicItems = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [items, setItems] = useState(() => Array.from({ length: 1 }));
  const addItem = () => {
    setItems((prev) => [...prev, undefined]);
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
      <Carousel ref={carouselRef}>
        {items.map((_, i) => (
          <CarouselItem key={i} bgColor={getColor(i)}>
            {i + 1}
          </CarouselItem>
        ))}
      </Carousel>
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
