import React, { useState } from 'react';
import {
  Compass,
  Users,
  FolderOpen,
  Mail,
  Calendar,
  ShieldCheck,
  HelpCircle,
  CircleUser,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function LeftRail() {
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const railBg = isDark
    ? 'bg-[#12122a] border-[#2e2e4a]'
    : 'bg-[#f4f1ea] border-[#D0C9BA]';

  const btnBase = isDark
    ? 'text-slate-500 hover:bg-[#2e2e4a] hover:text-slate-100'
    : 'text-neutral-500 hover:bg-[#D9D2C5]/50 hover:text-neutral-900';

  const activeBtn = isDark
    ? 'bg-[#2e2e4a] text-slate-100 border border-[#3a3a55]'
    : 'bg-[#D9D2C5] text-[#1A1A1A] border border-[#C4BAA9]';

  const activeIndicator = isDark ? 'bg-indigo-400' : 'bg-[#1A1A1A]';
  const separatorColor = isDark ? 'bg-[#2e2e4a]' : 'bg-[#D0C9BA]';
  const headerColor = isDark ? 'text-slate-600' : 'text-neutral-500';
  const gridBg = isDark ? 'bg-[#1e1e32] border-[#3a3a55] hover:border-slate-400 text-slate-300' : 'bg-[#FAF9F5] border-[#D0C9BA] hover:border-neutral-500 hover:text-neutral-900 text-neutral-700';

  const sections = [
    {
      title: "Dashboards",
      items: [
        { id: 'overview', label: 'Overview', icon: Compass, isActive: false },
        { id: 'contacts', label: 'Contacts', icon: Users, isActive: true },
        { id: 'archives', label: 'Archives', icon: FolderOpen, isActive: false },
      ]
    },
    {
      title: "Application Views",
      items: [
        {
          id: 'user',
          label: 'User',
          icon: CircleUser,
          isDropdown: true,
          isOpen: isUserMenuOpen,
          onToggle: () => setIsUserMenuOpen(!isUserMenuOpen),
          children: [
            { id: 'profile', label: 'Profile' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'connection', label: 'Connection' },
          ]
        },
        { id: 'mailbox', label: 'Mailbox', icon: Mail, isActive: false, hasNotification: true },
        { id: 'calendar', label: 'Calendar', icon: Calendar, isActive: false },
        { id: 'security', label: 'Security', icon: ShieldCheck, isActive: false },
        { id: 'help', label: 'Help Center', icon: HelpCircle, isActive: false },
      ]
    }
  ];

  return (
    <div
      className="h-full w-14 relative z-99"
      id="left-rail-anchor"
    >
      <div
        className={`h-full border-r flex flex-col py-6 justify-between select-none shrink-0 transition-all duration-300 ease-in-out absolute inset-y-0 left-0 shadow-2xl ${isExpanded ? 'w-64 px-3 items-stretch' : 'w-14 px-0 items-center'
          } ${railBg}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        id="left-rail"
      >
      <div className={`flex flex-col gap-6 w-full ${isExpanded ? 'items-stretch' : 'items-center'}`}>
        {/* Top Application Selector (Keep original) */}
        <div
          className={`h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-300 shadow-sm group relative mx-auto ${isExpanded ? 'w-full px-3 justify-start' : 'w-10'
            } ${gridBg}`}
          title="App Suite"
          id="app-grid-selector"
        >
          {isExpanded ? (
            <div className="flex items-center gap-3 w-full">
              <div className="grid grid-cols-2 gap-1 p-0.5 group-hover:scale-105 transition duration-300 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
              </div>
              <span className="text-sm font-bold tracking-wide">Workspace</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 p-1 group-hover:scale-110 transition duration-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-orange-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
            </div>
          )}
        </div>

        {/* Vertical Separator */}
        <div className={`h-[1px] transition-all duration-300 mx-auto ${isExpanded ? 'w-full' : 'w-8'} ${separatorColor}`} />

        {/* Navigation Sections */}
        <div className="flex flex-col gap-8 w-full overflow-y-auto custom-scrollbar no-scrollbar-hidden">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              {isExpanded && (
                <h2 className={`px-3 text-[10px] font-bold uppercase tracking-widest ${headerColor}`}>
                  {section.title}
                </h2>
              )}
              <div className="flex flex-col gap-1 w-full">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.isActive;
                  const btnClass = isActive ? activeBtn : btnBase;

                  return (
                    <div key={item.id} className="flex flex-col gap-1 w-full text-start">
                      <button
                        className={`rounded-xl transition duration-200 relative flex items-center overflow-hidden mx-auto ${isExpanded ? 'w-full px-3 py-2.5 gap-3 justify-start' : 'w-10 h-10 justify-center'
                          } ${btnClass}`}
                        onClick={() => item.isDropdown && isExpanded && item.onToggle()}
                        title={item.label}
                      >
                        <Icon size={18} className="shrink-0" />
                        {isExpanded && (
                          <span className="text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis flex-1 text-start">
                            {item.label}
                          </span>
                        )}

                        {/* Indicators & Toggles */}
                        {!isExpanded && isActive && <span className={`absolute left-[-2px] inset-y-1/4 w-[3px] rounded-r ${activeIndicator}`} />}
                        {isExpanded && isActive && <span className={`absolute left-0 inset-y-2 w-[3px] rounded-r ${activeIndicator}`} />}

                        {item.hasNotification && !isExpanded && <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />}
                        {item.hasNotification && isExpanded && <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />}

                        {item.isDropdown && isExpanded && (
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 opacity-50 ${item.isOpen ? 'rotate-180' : ''}`}
                          />
                        )}
                      </button>

                      {/* Dropdown sub-items */}
                      {item.isDropdown && isExpanded && item.isOpen && (
                        <div className="flex flex-col gap-1 ml-10 border-l border-slate-700/50 pl-2 mb-2 animate-in slide-in-from-top-1 duration-200">
                          {item.children.map(child => (
                            <button
                              key={child.id}
                              className={`text-left py-1.5 px-2 text-[12px] font-medium rounded-lg transition-colors ${btnBase} hover:text-indigo-400`}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
