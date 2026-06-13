import React from 'react';
import { Search, Info, Settings, MoreHorizontal, Plus } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function TopBar() {
  const { isDark } = useTheme();

  const bg = isDark ? 'bg-[#12122a] border-[#2e2e4a]' : 'bg-[#EBE7DD] border-[#D0C9BA]';
  const inputBg = isDark ? 'bg-[#1e1e32] border-[#3a3a55] text-[#E8E4DB] focus:border-indigo-500 placeholder:text-slate-500' : 'bg-[#FAF9F5] border-[#D0C9BA] text-[#1A1A1A] focus:border-[#1A1A1A] placeholder:text-neutral-400';
  const badgeBg = isDark ? 'bg-[#1e1e32] border-[#3a3a55] text-slate-400' : 'bg-[#EBE7DD] border-[#D0C9BA] text-neutral-600';
  const iconColor = isDark ? 'text-slate-400' : 'text-neutral-600';
  const btnHover = isDark ? 'hover:bg-[#2e2e4a] hover:text-slate-100' : 'hover:bg-[#D9D2C5]/60 hover:text-[#1A1A1A]';
  const titleColor = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const createBtn = isDark ? 'bg-transparent  text-blue-500 border border-blue-500' : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#F4F1EA]';
  const separatorColor = isDark ? 'bg-[#2e2e4a]' : 'bg-[#D0C9BA]';
  const searchIconColor = isDark ? 'text-slate-500' : 'text-neutral-500';

  return (
    <div className={`h-16 w-full border-b flex items-center justify-between px-6 select-none shrink-0 ${bg}`} id="top-bar-module">
      <div className="flex items-center gap-3 shrink-0" id="brand-branding-container">
        <h1 className={`text-xl font-bold italic font-serif tracking-tight select-none ${titleColor}`} id="brand-app-title">
          Contacts.
        </h1>
      <div className="flex-1 max-w-md mx-6 shrink relative" id="search-container">
        <Search size={14} className={`absolute left-3.5 top-3.5 ${searchIconColor}`} />
        <input
          type="text"
          placeholder="Search Contacts..."
          className={`w-full text-xs pl-10 pr-20 py-2.5 rounded-lg outline-none border transition duration-150 ${inputBg}`}
          id="search-input-field"
        />
        <div className={`absolute right-3.5 top-2.5 px-2 py-0.5 rounded-md border text-[10px] font-mono ${badgeBg}`} id="search-shortcut">
          Ctrl K
        </div>
      </div>
      </div>


      <div className="flex items-center gap-4 shrink-0" id="top-bar-right-controls">
        <div className={`flex items-center gap-1.5 ${iconColor}`}>
          <button
            className={`p-2 rounded-lg transition duration-150 ${btnHover}`}
            title="System Info Logs"
            id="btn-info"
          >
            <Info size={16} />
          </button>
          <button
            className={`p-2 rounded-lg transition duration-150 ${btnHover}`}
            title="Configuration Dashboard"
            id="btn-settings"
          >
            <Settings size={16} />
          </button>
          <button
            className={`p-2 rounded-lg transition duration-150 ${btnHover}`}
            title="Additional Features"
            id="btn-more-options"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>

        <div className={`w-[1px] h-6 ${separatorColor}`} />

        <button
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition duration-150 shadow-sm transform leading-none ${createBtn}`}
          id="btn-trigger-create-contact"
        >
          <Plus size={14} />
          <span>Create Contact</span>
        </button>

        <div
          className={`w-8 h-8 rounded-full overflow-hidden border ring-2 cursor-default shadow-sm relative group ${isDark ? 'border-[#3a3a55] ring-[#2e2e4a]' : 'border-[#D0C9BA] ring-neutral-300'}`}
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
