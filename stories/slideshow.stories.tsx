import React, { useLayoutEffect, useRef, useState } from 'react';
import { SlideShow, SlideShowItem, SlideShowRef } from './slideshow';

export default {
  title: 'SlideShow',
  component: SlideShow
};

export const Default = () => {
  const items = Array.from({ length: 20 }).map(
    (_, i) => `https://picsum.photos/1280/720?idx=${i}`
  );
  return (
    <SlideShow>
      {items.map((src) => (
        <SlideShowItem key={src} src={src} />
      ))}
    </SlideShow>
  );
};
