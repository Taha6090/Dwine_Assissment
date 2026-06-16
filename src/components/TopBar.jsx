import React from 'react';
import { Search, Info, Settings, MoreHorizontal, Plus } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function TopBar() {
  const { isDark } = useTheme();

  const bg = isDark ? 'bg-[#12122a] border-[#2e2e4a]' : 'bg-[#ffffff4d] border-[#D0C9BA]';
  const inputBg = isDark
    ? 'bg-[#1e1e32] border-[#3a3a55] text-[#E8E4DB] placeholder:text-slate-500'
    : 'bg-[#ffffff4d] border-[#D0C9BA] text-muted placeholder:text-muted';
  const badgeBg = isDark
    ? 'bg-[#1e1e32] border-[#3a3a55] text-slate-400'
    : 'bg-[#ffffff4d] border-[#D0C9BA] text-muted';
  const iconColor = isDark ? 'text-slate-400' : 'text-muted';
  const titleColor = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const createBtn = isDark
    ? 'bg-transparent text-blue-500 border border-blue-500'
    : 'bg-[#1A1A1A] text-[#F4F1EA]';
  const separatorColor = isDark ? 'bg-[#2e2e4a]' : 'bg-[#D0C9BA]';
  const searchIconColor = isDark ? 'text-slate-500' : 'text-muted';

  return (
    <div
      className={`h-14 sm:h-16 w-full border-b flex items-center gap-2 px-3 sm:px-6 select-none shrink-0 ${bg}`}
      id="top-bar-module"
    >
      {/* Brand + Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0" id="brand-branding-container">
        <h1
          className={`text-lg sm:text-xl font-bold italic font-serif tracking-tight select-none shrink-0 ${titleColor}`}
          id="brand-app-title"
        >
          Contacts.
        </h1>

        {/* Search bar */}
        <div className="hidden sm:block flex-1 max-w-md mx-2 sm:mx-4 relative" id="search-container">
          <Search size={14} className={`absolute left-3.5 top-3 sm:top-3.5 ${searchIconColor}`} />
          <input
            type="text"
            placeholder="Search Contacts..."
            readOnly
            className={`w-full text-xs pl-10 pr-16 sm:pr-20 py-2 sm:py-2.5 rounded-lg outline-none border ${inputBg}`}
            id="search-input-field"
          />
          <div
            className={`hidden sm:block absolute right-3.5 top-2.5 px-2 py-0.5 rounded-md border text-[10px] font-mono ${badgeBg}`}
            id="search-shortcut"
          >
            Ctrl K
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 sm:gap-4 shrink-0" id="top-bar-right-controls">
        <div className={`hidden sm:flex items-center gap-1 ${iconColor}`}>
          <div className="p-2 rounded-lg" title="System Info Logs" id="btn-info">
            <Info size={16} />
          </div>
          <div className="p-2 rounded-lg" title="Configuration Dashboard" id="btn-settings">
            <Settings size={16} />
          </div>
          <div className="p-2 rounded-lg" title="Additional Features" id="btn-more-options">
            <MoreHorizontal size={16} />
          </div>
        </div>

        <div className={`hidden sm:block w-[1px] h-6 ${separatorColor}`} />

        <div
          className={`flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs uppercase tracking-wider font-semibold shadow-sm leading-none ${createBtn}`}
          id="btn-trigger-create-contact"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Create Contact</span>
          <span className="sm:hidden">New</span>
        </div>

        <div
          className={`w-8 h-8 rounded-full overflow-hidden border ring-2 cursor-default shadow-sm shrink-0 ${isDark ? 'border-[#3a3a55] ring-[#2e2e4a]' : 'border-[#D0C9BA] ring-neutral-300'}`}
          id="user-profile-badge"
        >
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80"
            alt="Current User Profile"
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
