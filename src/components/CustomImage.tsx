// components/CustomImage.tsx
import Image from 'next/image'
import { useState } from 'react'

export default function CustomImage({ src, alt, ...props }: any) {
  const [isLoading, setLoading] = useState(true)

  const isExternal = src.startsWith('http')
  const imageSrc = isExternal ? src : `/images/${src}`

  return (
    <div className="image-container">
      <Image
        src={imageSrc}
        alt={alt}
        {...props}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setLoading(false)}
        layout="responsive"
        width={700}
        height={475}
      />
    </div>
  )
}