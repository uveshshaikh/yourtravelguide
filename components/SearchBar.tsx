import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  clearLabel?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear, clearLabel = 'Clear' }) => {
  const showClear = Boolean(value) && typeof onClear === 'function';

  return (
    <div className="relative max-w-xl mx-auto w-full">
      <div className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/95 px-3 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/60">
        <div className="flex items-center text-slate-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="flex-1 bg-transparent border-none text-base sm:text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-0"
          placeholder="Search anything for your trip..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200"
          >
            {clearLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
