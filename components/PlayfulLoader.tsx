import React from 'react';

interface PlayfulLoaderProps {
  message: string;
}

const loaderIcons = [
  { emoji: '✈️', label: 'Plane icon' },
  { emoji: '🧳', label: 'Baggage icon' },
  { emoji: '🪪', label: 'Travel card icon' },
];

const PlayfulLoader: React.FC<PlayfulLoaderProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/95 px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-2xl" aria-hidden="true">
        {loaderIcons.map((icon, index) => (
          <span
            key={icon.emoji}
            className="animate-bounce"
            style={{ animationDelay: `${index * 0.15}s` }}
            role="img"
            aria-label={icon.label}
          >
            {icon.emoji}
          </span>
        ))}
      </div>
      <p className="text-sm font-semibold text-slate-600">{message}</p>
    </div>
  );
};

export default PlayfulLoader;
