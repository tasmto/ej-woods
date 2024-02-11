'use client'
import React, { useEffect } from 'react'
import Image from "next/image"

import cartGifs from '../data/cartgifs.json'

type Props = {}
const randomGif = cartGifs[Math.floor(Math.random() * cartGifs.length)] || ''

const EmptyCartGif = (props: Props) => {
  useEffect(() => {}, [])

  // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)

  return (
    <div className='relative   flex h-60 max-h-72 w-full items-center justify-center overflow-hidden object-contain'>
      <Image
        src={randomGif}
        alt='empty cart'
        quality={100}
        className='object-contain'
        fill
        sizes="100vw" />
    </div>
  );
}

export default EmptyCartGif
