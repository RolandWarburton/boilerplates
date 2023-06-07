import React from 'react';
import { useLoaderData } from 'react-router-dom'
import { ColoredHexBox } from './styles';

function HexExample() {
  const d = useLoaderData() as string;
  return (
    <>
      <ColoredHexBox color={d}>Hex {d}</ColoredHexBox>
    </>
  )
}

export default HexExample
