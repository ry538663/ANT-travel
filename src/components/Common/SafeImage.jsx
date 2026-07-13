import React, { useState } from 'react';
import { Truck, Car, Compass, User } from 'lucide-react';

const SafeImage = ({ src, alt, className, type = 'bus' }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-indigo-550/10 from-indigo-50 to-indigo-100/50 text-indigo-600 border border-slate-100 ${className}`}
        style={{ minHeight: 'inherit' }}
      >
        {type === 'car' && (
          <Car className="h-8 w-8 text-orange-500 stroke-[1.5]" />
        )}
        {type === 'route' && (
          <Compass className="h-8 w-8 text-indigo-600 stroke-[1.5] animate-spin-slow" style={{ animationDuration: '20s' }} />
        )}
        {type === 'bus' && (
          <Truck className="h-8 w-8 text-indigo-650 text-indigo-600 stroke-[1.5]" />
        )}
        {type === 'avatar' && (
          <User className="h-5 w-5 text-slate-400 stroke-[2]" />
        )}
        
        {type !== 'avatar' && (
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 mt-2 px-3 text-center line-clamp-1">
            {alt}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
