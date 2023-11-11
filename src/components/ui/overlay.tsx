import * as React from 'react';

export interface IOverlayProps {}

export default function Overlay(props: IOverlayProps) {
  return <div className='absolute bottom-0 left-0 right-0 top-0 z-40 block h-full w-full bg-background/20' />;
}
