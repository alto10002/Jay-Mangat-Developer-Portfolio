import React, { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

const LiquidBackground = () => {
  const theme = useTheme();
  const blobColor = theme.palette.primary.main;

  const blobs = useMemo(() => (
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: `${150 + Math.random() * 150}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 15}s`,
      movement: Math.random() > 0.5 ? 'movement_one' : 'movement_two',
    }))
  ), []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      background: theme.palette.background.default,
      overflow: 'hidden', zIndex: -1,
    }}>
      {blobs.map(blob => (
        <div key={blob.id}
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            background: blobColor,
            borderRadius: '40% 50% 30% 40%',
            opacity: 0.7,
            left: blob.left,
            top: blob.top,
            filter: 'blur(10px)',
            animation: `transform 15s ease-in-out infinite alternate, ${blob.movement} ${blob.duration} ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes transform {
          0%,100% { border-radius: 33% 67% 70% 30% / 30% 40% 70% 70%; }
          20% { border-radius: 37% 63% 51% 49% / 37% 35% 35% 63%; }
          40% { border-radius: 36% 64% 64% 36% / 64% 48% 52% 26%; }
          60% { border-radius: 37% 63% 51% 49% / 30% 30% 70% 73%; }
          80% { border-radius: 40% 60% 42% 58% / 51% 51% 49% 59%; }
        }
        @keyframes movement_one {
          0%,100% { transform: none; }
          50% { transform: translate(100%, 50%) scale(1.5); }
        }
        @keyframes movement_two {
          0%,100% { transform: none; }
          50% { transform: translate(-100%, -50%) scale(1.25); }
        }
      `}</style>
    </div>
  );
};

export default LiquidBackground;
