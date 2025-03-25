import { getImageProps, ImageProps } from 'next/image'
import React from 'react'

interface BackgroundImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  width: number
  height: number
}

function getBackgroundImage(srcSet?: string): string {
  if (!srcSet) return ''

  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ')
      return `url("${url}") ${dpi}`
    })
    .join(', ')

  return `image-set(${imageSet})`
}

export function BackgroundImage({
  src, 
  alt = '', 
  width, 
  height, 
  style,
  ...divProps
}: BackgroundImageProps) {
  const { 
    props: { srcSet } 
  } = getImageProps({ 
    src, 
    alt, 
    width, 
    height 
  })

  const backgroundImage = getBackgroundImage(srcSet)

  return (
    <div 
      {...divProps}
      style={{
        ...style,
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  )
}