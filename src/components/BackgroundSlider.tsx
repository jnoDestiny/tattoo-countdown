'use client'

import { useState, useEffect } from 'react'

interface BackgroundSliderProps {
  currentIndex: number
  onImageCountUpdate?: (count: number) => void
}

interface ImageInfo {
  url: string
  aspectRatio: number
  backgroundSize: string
  backgroundPosition: string
}

export function BackgroundSlider({ currentIndex, onImageCountUpdate }: BackgroundSliderProps) {
  const [images, setImages] = useState<string[]>([])
  const [imageInfos, setImageInfos] = useState<ImageInfo[]>([])

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Try to load from a static JSON file first
        const response = await fetch('/images.json')
        if (response.ok) {
          const imageList = await response.json()
          console.log('Images loaded from JSON:', imageList)
          setImages(imageList)
          if (onImageCountUpdate) {
            onImageCountUpdate(imageList.length)
          }
          
          // Analyze each image's proportions
          const infos = await Promise.all(
            imageList.map(async (url: string) => {
              return new Promise<ImageInfo>((resolve) => {
                const img = new Image()
                img.onload = () => {
                  const aspectRatio = img.width / img.height
                  let backgroundSize: string
                  let backgroundPosition: string
                  
                  if (aspectRatio > 2.0) {
                    // Very wide panorama - use contain
                    backgroundSize = 'contain'
                    backgroundPosition = 'center center'
                  } else if (aspectRatio > 1.3) {
                    // Wide landscape - use cover
                    backgroundSize = 'cover'
                    backgroundPosition = 'center center'
                  } else if (aspectRatio < 0.6) {
                    // Very tall portrait - use contain
                    backgroundSize = 'contain'
                    backgroundPosition = 'center center'
                  } else if (aspectRatio < 0.8) {
                    // Tall portrait - use cover
                    backgroundSize = 'cover'
                    backgroundPosition = 'center center'
                  } else {
                    // Square-ish - use cover
                    backgroundSize = 'cover'
                    backgroundPosition = 'center center'
                  }
                  
                  resolve({
                    url,
                    aspectRatio,
                    backgroundSize,
                    backgroundPosition
                  })
                }
                img.onerror = () => {
                  // Fallback for failed images
                  resolve({
                    url,
                    aspectRatio: 1,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                  })
                }
                img.src = url
              })
            })
          )
          
          setImageInfos(infos)
          return
        }
      } catch (error) {
        console.log('No images.json found, using default')
      }

      // Fallback: use a simple approach that works
      const defaultImages = [
        '/images/chainsawman1.jpg',
        '/images/chainsawman2.jpg', 
        '/images/chainsawman3.jpg',
        '/images/chainsawman4.jpg',
        '/images/chainsawman5.jpg',
        '/images/chainsawman6.jpg'
      ]
      
      setImages(defaultImages)
      if (onImageCountUpdate) {
        onImageCountUpdate(defaultImages.length)
      }
    }

    loadImages()
  }, [onImageCountUpdate])

  // If no images found, show a default background
  if (images.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-red-800">
        <div className="absolute inset-0 opacity-50 bg-black" />
      </div>
    )
  }

  const currentImageInfo = imageInfos[currentIndex] || {
    url: images[currentIndex],
    aspectRatio: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${currentImageInfo.url})`,
          backgroundSize: currentImageInfo.backgroundSize,
          backgroundPosition: currentImageInfo.backgroundPosition,
          backgroundRepeat: 'no-repeat',
          backgroundColor: currentImageInfo.backgroundSize === 'contain' ? '#000' : 'transparent'
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-40" />
    </div>
  )
} 