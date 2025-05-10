import React from 'react';

interface ProgressiveBlurProps {
  className?: string;
  direction?: string;
  overlayColor?: string;
  intensity?: number;
  curve?: 'linear' | 'smooth' | 'exponential';
}

export function ProgressiveBlur({ className = '', direction = 'to top', overlayColor = 'transparent', intensity = 1, curve = 'linear' }: ProgressiveBlurProps) {
  const layers = [
    { blur: 0.25, stops: ['0%', '10%', '30%', '40%'] },
    { blur: 0.5, stops: ['10%', '20%', '40%', '50%'] },
    { blur: 0.75, stops: ['15%', '30%', '50%', '60%'] },
    { blur: 1, stops: ['20%', '40%', '60%', '70%'] },
    { blur: 2, stops: ['40%', '60%', '80%', '90%'] },
    { blur: 2.76, stops: ['60%', '80%'] },
    { blur: 6, stops: ['70%', '100%'] },
  ];

  // Determine maximum blur from base layers
  const maxBlur = Math.max(...layers.map(l => l.blur));
  // Curve mapping: linear, smoothstep, or exponential ease-in
  const applyCurve = (t: number): number => {
    if (curve === 'smooth') {
      // smoothstep: 3t^2 - 2t^3
      return t * t * (3 - 2 * t);
    }
    if (curve === 'exponential') {
      // exponential ease-in
      return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
    }
    // default linear
    return t;
  };

  return (
    <div className={`relative pointer-events-none overflow-hidden ${className}`}>
      {layers.map((layer, idx) => {
        const maskGradient =
          layer.stops.length === 4
            ? `linear-gradient(${direction}, rgba(0,0,0,0) ${layer.stops[0]}, rgba(0,0,0,1) ${layer.stops[1]}, rgba(0,0,0,1) ${layer.stops[2]}, rgba(0,0,0,0) ${layer.stops[3]})`
            : `linear-gradient(${direction}, rgba(0,0,0,0) ${layer.stops[0]}, rgba(0,0,0,1) ${layer.stops[1]})`;
        // apply curve to normalized blur value
        const relative = layer.blur / maxBlur;
        const blurAmount = applyCurve(relative) * maxBlur * intensity;

        return (
          <div
            key={idx}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
              WebkitMaskImage: maskGradient,
              maskImage: maskGradient
            }}
          />
        );
      })}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(${direction}, transparent, ${overlayColor})` }}
      />
    </div>
  );
}
