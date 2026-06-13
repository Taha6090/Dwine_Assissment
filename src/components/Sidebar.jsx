import React from 'react';
import {
  Users,
  Star,
  Sparkles,
  CopyMinus,
  Trash2,
  FolderLock,
  Briefcase,
  Heart,
  Layers,
  UserX,
  FileDown,
  FileUp,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Sidebar({
  contacts
}) {
  const { isDark } = useTheme();
  const activeTab = 'all'; // Default for static dashboard

  // Calculate counts dynamically
  const activeContacts = contacts.filter(c => !c.isDeleted);
  const totalCount = activeContacts.length;
  const favoritesCount = activeContacts.filter(c => c.favorite).length;
  const frequentlyCount = activeContacts.filter(c => c.frequentlyContacted).length;
  const deletedCount = contacts.filter(c => c.isDeleted).length;

  // Calculate duplicates count (number of contacts with shared email or mobile phone)
  const getDuplicatesCount = () => {
    const emails = new Map();
    const phones = new Map();

    activeContacts.forEach(c => {
      if (c.email && c.email.trim()) {
        const e = c.email.toLowerCase().trim();
        if (!emails.has(e)) emails.set(e, []);
        emails.get(e).push(c.id);
      }
      if (c.mobilePhone && c.mobilePhone.trim()) {
        const p = c.mobilePhone.replace(/[\s-().]/g, '');
        if (p) {
          if (!phones.has(p)) phones.set(p, []);
          phones.get(p).push(c.id);
        }
      }
    });

    const duplicateContactIds = new Set();
    emails.forEach(ids => {
      if (ids.length > 1) ids.forEach(id => duplicateContactIds.add(id));
    });
    phones.forEach(ids => {
      if (ids.length > 1) ids.forEach(id => duplicateContactIds.add(id));
    });

    return duplicateContactIds.size;
  };

  const duplicatesCount = getDuplicatesCount();

  // Group counts
  const groupCounts = {
    'Most Important': activeContacts.filter(c => c.group === 'Most Important').length,
    'Work': activeContacts.filter(c => c.group === 'Work').length,
    'Family': activeContacts.filter(c => c.group === 'Family').length,
    'Projects': activeContacts.filter(c => c.group === 'Projects').length,
    'Recent Leads': activeContacts.filter(c => c.group === 'Recent Leads').length,
  };

  const mainTabs = [
    { id: 'all', label: 'All Contacts', icon: Users, count: totalCount, color: 'text-neutral-500' },
    { id: 'favorites', label: 'Favorites', icon: Star, count: favoritesCount, color: 'text-amber-500' },
    { id: 'frequently', label: 'Frequently Contacted', icon: Sparkles, count: frequentlyCount, color: 'text-emerald-500' },
    { id: 'duplicates', label: 'Duplicates', icon: CopyMinus, count: duplicatesCount, color: 'text-orange-500' },
    { id: 'deleted', label: 'Deleted Contacts', icon: Trash2, count: deletedCount, color: 'text-rose-500' },
  ];

  const groupTabs = [
    { id: 'group:Most Important', label: 'Most Important', icon: FolderLock, color: isDark ? 'text-indigo-400' : 'text-indigo-800' },
    { id: 'group:Work', label: 'Work', icon: Briefcase, color: isDark ? 'text-blue-400' : 'text-blue-800' },
    { id: 'group:Family', label: 'Family', icon: Heart, color: isDark ? 'text-pink-400' : 'text-pink-800' },
    { id: 'group:Projects', label: 'Projects', icon: Layers, color: isDark ? 'text-teal-400' : 'text-teal-800' },
    { id: 'group:Recent Leads', label: 'Recent Leads', icon: UserX, color: isDark ? 'text-rose-400' : 'text-rose-800' },
  ];

  const sidebarBg = isDark ? 'bg-[#15152b] border-[#2e2e4a]' : 'bg-[#EBE7DD] border-[#D0C9BA]';
  const sectionHeader = isDark ? 'text-slate-500' : 'text-neutral-500';
  const activeTabStyle = isDark
    ? 'bg-[#252545] text-[#E8E4DB] border-l-2 border-indigo-400 shadow-sm'
    : 'bg-[#FAF9F5] text-[#1A1A1A] border-l-2 border-[#1A1A1A] shadow-sm';
  const inactiveTabStyle = isDark
    ? 'text-slate-400 hover:bg-[#252545]/60 hover:text-slate-100 font-medium'
    : 'text-neutral-600 hover:bg-[#FAF9F5]/50 hover:text-neutral-900 font-medium';
  const activeBadge = isDark ? 'bg-indigo-600 text-white' : 'bg-[#1A1A1A] text-[#FAF9F5]';
  const inactiveBadge = isDark ? 'bg-[#2e2e4a] text-slate-400' : 'bg-[#D9D2C5] text-neutral-700';
  const footerBorder = isDark ? 'border-[#2e2e4a]' : 'border-[#D0C9BA]';
  const footerText = isDark ? 'text-slate-600' : 'text-neutral-500';
  const actionHover = isDark ? 'text-slate-400 hover:bg-[#252545]/60 hover:text-slate-100' : 'text-neutral-600 hover:bg-[#FAF9F5]/60 hover:text-neutral-900';
  const chevronColor = isDark ? 'text-slate-600' : 'text-neutral-400';

  return (
    <div className={`w-68 h-full border-r flex flex-col justify-between py-6 select-none shrink-0 ${sidebarBg}`} id="contacts-sidebar">
      <div className="space-y-6 overflow-y-auto px-4 font-sans">
        {/* SECTION 1: My Contacts */}
        <div>
          <h2 className={`text-[10px] font-bold tracking-widest uppercase mb-2 px-3 ${sectionHeader}`} id="header-my-contacts">
            My Contacts
          </h2>
          <div className="space-y-1">
            {mainTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition duration-150 ${isActive ? activeTabStyle : inactiveTabStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={15} className={`${tab.color} ${isActive ? 'scale-110' : ''}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count > 0 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? activeBadge : inactiveBadge}`}>
                      {tab.count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Groups */}
        <div>
          <h2 className={`text-[10px] font-bold tracking-widest uppercase mb-2 px-3 ${sectionHeader}`} id="header-groups">
            Groups
          </h2>
          <div className="space-y-1">
            {groupTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              const groupName = tab.label;
              const count = groupCounts[groupName] || 0;

              return (
                <div
                  key={tab.id}
                  id={`tab-group-${groupName.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition duration-150 ${isActive ? activeTabStyle : inactiveTabStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={15} className={tab.color} />
                    <span>{tab.label}</span>
                  </div>
                  {count > 0 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? activeBadge : inactiveBadge}`}>
                      {count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Actions */}
        <div>
          <h2 className={`text-[10px] font-bold tracking-widest uppercase mb-2 px-3 ${sectionHeader}`} id="header-actions">
            Actions
          </h2>
          <div className="space-y-1">
            <div
              id="action-btn-import"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${actionHover}`}
            >
              <div className="flex items-center gap-3">
                <FileUp size={15} className="text-emerald-500" />
                <span>Import</span>
              </div>
              <ChevronRight size={12} className={chevronColor} />
            </div>

            <div
              id="action-btn-export"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${actionHover}`}
            >
              <div className="flex items-center gap-3">
                <FileDown size={15} className="text-amber-500" />
                <span>Export</span>
              </div>
              <ChevronRight size={12} className={chevronColor} />
            </div>

            <div
              id="action-btn-print"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${actionHover}`}
            >
              <div className="flex items-center gap-3">
                <Printer size={15} className="text-purple-500" />
                <span>Print</span>
              </div>
              <ChevronRight size={12} className={chevronColor} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Statement */}
      <div className={`px-6 text-[10px] select-none border-t pt-4 mt-2 ${footerBorder} ${footerText}`}>
        <p className="font-mono text-[9px] uppercase tracking-wider">Local Persistence: Active</p>
        <p className={`text-[9px] whitespace-nowrap uppercase tracking-wider ${isDark ? 'text-slate-700' : 'text-neutral-400'}`}>System Version 2.0</p>
      </div>
    </div>
  );
}
