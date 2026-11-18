import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  containerClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  containerClassName = '',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#141418] via-[#0B0B0E] to-[#1A140D] border border-white/10 text-[#A89F91] p-6 text-center ${containerClassName || className}`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="w-6 h-6 text-[#C89B5E] mb-3 opacity-80" />
        <span className="font-display text-lg uppercase tracking-wider text-[#F5F3EE]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={`${className} transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-90'
      }`}
      {...rest}
    />
  );
};
