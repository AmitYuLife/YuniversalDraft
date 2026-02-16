"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface YuCoin {
  id: number;
  x: number;
  y: number;
  size: number;
  rotationStart: number;
  rotationEnd: number;
  duration: number;
  delay: number;
  respawnKey: number; // Force re-render on respawn
}

/**
 * YuCoinBackground - Animated YuCoins floating from right to left
 * 
 * Creates a space-travel effect with randomized YuCoins moving diagonally
 * to simulate the rocket traveling through space while the user is a static observer.
 * Uses two layers for parallax depth effect.
 */
export function YuCoinBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [foregroundCoins, setForegroundCoins] = useState<YuCoin[]>([]);
  const [backgroundCoins, setBackgroundCoins] = useState<YuCoin[]>([]);
  const [collectingCoins, setCollectingCoins] = useState<Set<number>>(new Set());
  
  // Generate randomized YuCoins only on client side to avoid hydration mismatch
  useEffect(() => {
    const generateCoins = (count: number, durationMultiplier: number = 1) => {
      return Array.from({ length: count }, (_, i) => {
        const startRotation = -30 + Math.random() * 60;
        // Add 360-540 degrees (1-1.5 full rotations) for subtle continuous spinning
        const rotationAmount = 360 + Math.random() * 180;
        const endRotation = startRotation + rotationAmount;
        const baseDuration = 10 + Math.random() * 10;
        
        return {
          id: i,
          // Random Y position with more spread (can go beyond viewport for variety)
          y: -10 + Math.random() * 120,
          // Start just off-screen right with varied positions (100-110%)
          x: 100 + Math.random() * 10,
          // 50% smaller: between 24px and 50px
          size: 24 + Math.random() * 26,
          // Start and end rotation for subtle spinning during travel
          rotationStart: startRotation,
          rotationEnd: endRotation,
          // Duration adjusted by multiplier for parallax effect
          duration: baseDuration * durationMultiplier,
          // More varied delays for better dispersion
          delay: Math.random() * 10,
          respawnKey: 0,
        };
      });
    };

    // Foreground layer - slowed down by 87.5% total (1.875x duration)
    setForegroundCoins(generateCoins(16, 1.875));
    
    // Background layer - 25% slower than foreground (1.875 * 1.25 = 2.34375x duration)
    setBackgroundCoins(generateCoins(16, 2.34375));
  }, []);

  // Handle coin collection animation
  const handleCoinClick = (coinId: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    
    // Check if already collecting
    if (collectingCoins.has(coinId)) return;
    
    const coinElement = event.currentTarget;
    
    // Mark as collecting immediately to prevent double-clicks
    setCollectingCoins(prev => new Set(prev).add(coinId));
    
    // Get current computed transform to preserve position
    const computedStyle = window.getComputedStyle(coinElement);
    const matrix = new DOMMatrix(computedStyle.transform);
    
    // Create a timeline for the collection animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Remove from collecting state
        setCollectingCoins(prev => {
          const newSet = new Set(prev);
          newSet.delete(coinId);
          return newSet;
        });
        
        // Respawn coin at the right edge of viewport (visible)
        setForegroundCoins(prevCoins => {
          return prevCoins.map(coin => {
            if (coin.id === coinId) {
              const startRotation = -30 + Math.random() * 60;
              const rotationAmount = 360 + Math.random() * 180;
              return {
                ...coin,
                y: -10 + Math.random() * 120,
                x: 95, // Start at right edge of viewport (visible)
                size: 24 + Math.random() * 26,
                rotationStart: startRotation,
                rotationEnd: startRotation + rotationAmount,
                delay: 0, // Start immediately
                respawnKey: coin.respawnKey + 1, // Increment to force new DOM element
              };
            }
            return coin;
          });
        });
      }
    });
    
    // Set initial state to current animated position
    gsap.set(coinElement, {
      x: matrix.m41,
      y: matrix.m42,
      rotation: 0,
    });
    
    // Disable CSS animation during collection
    coinElement.style.animation = 'none';
    
    // Animate collection: expand, rise, and fade out
    tl.to(coinElement, {
      scale: 1.5,
      y: matrix.m42 - 40,
      opacity: 0,
      rotation: 720,
      duration: 0.8,
      ease: "back.out(1.2)",
      transformOrigin: "center center",
    });
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Background layer - slower movement, semi-transparent */}
      {backgroundCoins.map((coin) => (
        <div
          key={`bg-${coin.id}`}
          className="absolute animate-float-coin"
          style={{
            top: `${coin.y}%`,
            left: `${coin.x}%`,
            width: `${coin.size}px`,
            height: `${coin.size}px`,
            '--rotation-start': `${coin.rotationStart}deg`,
            '--rotation-end': `${coin.rotationEnd}deg`,
            animation: `floatCoin ${coin.duration}s linear ${coin.delay}s infinite`,
            opacity: 0.5,
            zIndex: 1,
          } as React.CSSProperties & { '--rotation-start': string; '--rotation-end': string }}
        >
          <img
            src="/YuniversalDraft/images/yucoin.png"
            alt=""
            className="h-full w-full"
          />
        </div>
      ))}

      {/* Foreground layer - normal speed, full opacity, clickable */}
      {foregroundCoins.map((coin) => {
        const isCollecting = collectingCoins.has(coin.id);
        return (
          <div
            key={`fg-${coin.id}-${coin.respawnKey}`}
            className="absolute animate-float-coin cursor-pointer pointer-events-auto"
            onClick={(e) => handleCoinClick(coin.id, e)}
            style={{
              top: `${coin.y}%`,
              left: `${coin.x}%`,
              width: `${coin.size}px`,
              height: `${coin.size}px`,
              '--rotation-start': `${coin.rotationStart}deg`,
              '--rotation-end': `${coin.rotationEnd}deg`,
              animation: isCollecting ? 'none' : `floatCoin ${coin.duration}s linear ${coin.delay}s infinite`,
              zIndex: isCollecting ? 3 : 2,
            } as React.CSSProperties & { '--rotation-start': string; '--rotation-end': string }}
          >
            <img
              src="/YuniversalDraft/images/yucoin.png"
              alt=""
              className="h-full w-full pointer-events-none"
            />
          </div>
        );
      })}
    </div>
  );
}
