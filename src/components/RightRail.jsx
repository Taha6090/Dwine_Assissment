import React from 'react';
import { Search, Bell, CheckSquare, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../ThemeContext';

export default function RightRail() {
  const { isDark, toggleTheme } = useTheme();

  const railBg = isDark
    ? 'bg-[#1a1a2e] border-[#2e2e4a] text-slate-400'
    : 'bg-[#EBE7DD] border-[#D0C9BA] text-neutral-600';

  const btnHover = isDark
    ? 'hover:bg-[#2e2e4a] hover:text-slate-100'
    : 'hover:bg-[#D9D2C5]/50 hover:text-[#1A1A1A]';

  return (
    <div
      className={`w-16 h-full border-l gap-4 flex flex-col items-center py-6 select-none shrink-0 ${railBg}`}
      id="right-rail"
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className={`w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition duration-200 border flex items-center justify-center text-lg group relative ${isDark ? 'bg-[#2e2e4a] border-[#3a3a55]' : 'bg-[#FAF9F5] border-[#D0C9BA]'}`}
          title="Language: English (UK)"
          id="country-selector"
        >
          <span>🇬🇧</span>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <button
          className={`p-2 rounded-lg transition duration-200 ${btnHover}`}
          title="Quick Search"
          id="btn-quick-search"
        >
          <Search size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 relative">
        <button
          className={`p-2 rounded-lg transition duration-200 group ${btnHover}`}
          title="Notifications"
          id="btn-notifications"
        >
          <Bell size={18} />
        </button>

        <button
          className={`p-2 rounded-lg transition duration-200 ${btnHover}`}
          title="Tasks"
          id="btn-tasks"
        >
          <CheckSquare size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 mt-auto">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg border transition duration-300 ${
            isDark
              ? 'text-indigo-400 bg-[#2e2e4a] border-[#3a3a55] shadow-[0_0_12px_rgba(99,102,241,0.3)]'
              : 'text-amber-800 bg-[#D9D2C5] border-[#C4BAA9]'
          }`}
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          id="theme-toggle-btn"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Moon size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Sun size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
