'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <div className="embla__slide" style={{   width: '100%', height: '500px', overflow: 'hidden' }}>
            <img
              src="/image1.jpg"
              alt="Description"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="embla__slide">
          <div className="embla__slide" style={{   width: '100%', height: '500px', overflow: 'hidden' }}>
            <img
              src="/image2.jpg"
              alt="Description"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          </div>
        <div className="embla__slide">
          <div className="embla__slide" style={{   width: '100%', height: '500px', overflow: 'hidden' }}>
            <img
              src="/image3.jpg"
              alt="Description"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          </div>
      </div>
    </div>
  )
}
