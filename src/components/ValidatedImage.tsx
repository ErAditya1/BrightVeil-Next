'use client'
import { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from './ui/skeleton';

// Spinner Component
const Spinner = ({ size = 8, color = 'blue-500' }: { size?: number; color?: string }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-t-transparent border-${color}`}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    ></div>
  );
};

// ValidatedImage Component
type ValidatedImageProps = ImageProps & {
  loaderSize?: number; // Optional: size of the loader spinner
  loaderColor?: string; // Optional: color of the loader spinner
};

function ValidatedImage({
  loaderSize = 8,
  loaderColor = 'blue-500',
  src,
  alt,
  ...rest
}: ValidatedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSrcValid, setIsSrcValid] = useState(false);
  // Validate if the src exists

  useEffect(() => {
    setIsSrcValid(!!src)
  }, [src])

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Show Loader if src is invalid or image is loading */}

      {/* Render Image only if src is valid */}
      {isSrcValid ? (
        <Image
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 opacity-100 h-full w-full`}
          {...rest} // Pass all additional props to the Image component
        />
      )
        :
        
          <Skeleton className="h-full w-full "/>
       
      }
    </div>
  );
}

export default ValidatedImage;
