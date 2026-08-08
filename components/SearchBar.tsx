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
    <div className="relative max-w-xl mx-auto w-full" role="search">
      <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 shadow-[0_12px_32px_-16px_rgba(15,23,42,0.3)] transition-colors focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/15">
        <div className="flex items-center text-blue-600 flex-shrink-0">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="flex-1 bg-transparent border-none text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
          placeholder="Search anything for your trip..."
          aria-label="Search travel rules"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 flex-shrink-0"
          >
            {clearLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
