import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

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

  // Validate if the src exists
  const isSrcValid = !!src;

  return (
    <div className="relative flex items-center justify-center">
      {/* Show Loader if src is invalid or image is loading */}
      {(!isSrcValid || isLoading) && (
        <div className="absolute">
          <Spinner size={loaderSize} color={loaderColor} />
        </div>
      )}

      {/* Render Image only if src is valid */}
      {isSrcValid && (
        <Image
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          {...rest} // Pass all additional props to the Image component
        />
      )}
    </div>
  );
}

export default ValidatedImage;
