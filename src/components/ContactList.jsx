import React from 'react';
import { ArrowUpDown, AlertCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function ContactList({
  contacts,
  selectedContactId,
  onSelectContact
}) {
  const { isDark } = useTheme();

  // Static view defaults
  const activeTab = 'all';
  const searchQuery = '';
  const sortOrder = 'asc';

  // Get active heading label
  const getHeaderLabel = () => {
    if (activeTab === 'all') return 'All Contacts';
    if (activeTab.startsWith('group:')) return activeTab.replace('group:', '');
    return 'Contacts';
  };

  // 1. First layer filter: isDeleted state
  const isDeletedView = activeTab === 'deleted';
  let filtered = contacts.filter((c) => (isDeletedView ? c.isDeleted : !c.isDeleted));

  // 2. Second layer filter: Category
  if (activeTab === 'favorites') {
    filtered = filtered.filter((c) => c.favorite);
  } else if (activeTab === 'frequently') {
    filtered = filtered.filter((c) => c.frequentlyContacted);
  } else if (activeTab.startsWith('group:')) {
    const groupName = activeTab.replace('group:', '');
    filtered = filtered.filter((c) => c.group === groupName);
  }

  // Find duplicates if tab is 'duplicates'
  let duplicatesList = [];
  if (activeTab === 'duplicates') {
    const emailMap = new Map();
    const phoneMap = new Map();
    const seenPairs = new Set();

    filtered.forEach((c) => {
      if (c.email && c.email.trim()) {
        const emailKey = c.email.toLowerCase().trim();
        if (emailMap.has(emailKey)) {
          const main = emailMap.get(emailKey);
          const pairKey = [main.id, c.id].sort().join('-');
          if (!seenPairs.has(pairKey)) {
            seenPairs.add(pairKey);
            duplicatesList.push({ primary: main, duplicate: c, reason: `Matching Email: ${c.email}` });
          }
        } else {
          emailMap.set(emailKey, c);
        }
      }
      if (c.mobilePhone && c.mobilePhone.trim()) {
        const phoneKey = c.mobilePhone.replace(/[\s-().]/g, '');
        if (phoneKey) {
          if (phoneMap.has(phoneKey)) {
            const main = phoneMap.get(phoneKey);
            const pairKey = [main.id, c.id].sort().join('-');
            if (!seenPairs.has(pairKey)) {
              seenPairs.add(pairKey);
              duplicatesList.push({ primary: main, duplicate: c, reason: `Matching Phone: ${c.mobilePhone}` });
            }
          } else {
            phoneMap.set(phoneKey, c);
          }
        }
      }
    });
  }

 

  const paneBg = isDark ? 'bg-[#111127] border-[#2e2e4a]' : 'bg-[#FAF9F5] border-[#D0C9BA]';
  const headerBorder = isDark ? 'border-[#2e2e4a]' : 'border-[#D0C9BA]';
  const titleColor = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const sortBtn = isDark
    ? 'text-slate-500 hover:text-slate-100 hover:bg-[#2e2e4a]'
    : 'text-neutral-500 hover:text-neutral-900 hover:bg-[#D9D2C5]/50';
  const dividerColor = isDark ? 'divide-[#2e2e4a]/40' : 'divide-[#D0C9BA]/40';
  const selectedItem = isDark
    ? 'bg-[#252545] border-r-4 border-indigo-400 text-[#E8E4DB]'
    : 'bg-[#EBE7DD] border-r-4 border-[#1A1A1A] text-[#1A1A1A]';
  const hoverItem = isDark ? 'hover:bg-[#1e1e38]/60 text-slate-300' : 'hover:bg-[#EBE7DD]/30 text-neutral-800';
  const avatarBorder = isDark ? 'border-[#3a3a55]/60' : 'border-[#D0C9BA]/60';
  const subtitleColor = isDark ? 'text-slate-500' : 'text-neutral-500';
  const emptyTitle = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const emptySubtitle = isDark ? 'text-slate-500' : 'text-neutral-500';
  const dupCardBg = isDark ? 'bg-[#1e1e32] border-[#3a3a55]' : 'bg-[#FAF9F5] border-[#D0C9BA]';
  const compareBtn = isDark
    ? 'bg-[#2e2e4a] hover:bg-[#3a3a55] border-[#3a3a55] text-slate-200'
    : 'bg-white hover:bg-[#EBE7DD]/40 border-[#D0C9BA] text-neutral-750';
  const mergeBtn = isDark ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F5]';

  return (
    <div className={`w-80 h-full border-r flex flex-col shrink-0 ${paneBg}`} id="contact-list-pane">
      {/* Header and Sorting */}
      <div className={`p-4 flex items-center justify-between border-b shrink-0 ${headerBorder}`} id="contact-list-header">
        <h3 className={`text-sm font-bold tracking-tight truncate max-w-[200px] ${titleColor}`} title={getHeaderLabel()}>
          {getHeaderLabel()}
        </h3>
        <div
          className={`p-1.5 rounded-lg transition duration-200 flex items-center gap-1 text-xs ${sortBtn}`}
          title={`Sort current set ${sortOrder === 'asc' ? 'A to Z' : 'Z to A'}`}
          id="btn-sort-contacts"
        >
          <span className="font-mono text-[10px] hidden sm:inline">{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
          <ArrowUpDown size={14} className={sortOrder === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
        </div>
      </div>

      {/* Content Scroller container */}
      <div className="flex-1 overflow-y-auto" id="contact-list-scrollable">
        {activeTab === 'duplicates' && duplicatesList.length > 0 ? (
          <div className="p-3 space-y-4" id="duplicates-view-list">
            <div className={`border rounded-lg p-2.5 text-[11px] flex gap-2 items-start ${isDark ? 'bg-amber-950/40 border-amber-800/50 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
              <AlertCircle size={14} className="shrink-0 mt-0.5 text-amber-500" />
              <span>We detected duplicate entries. Merge them to compile clean profiles without data loss.</span>
            </div>

            {duplicatesList.map((item, index) => (
              <div
                key={`dup-${index}`}
                className={`border rounded-lg p-3 text-xs space-y-3 shadow-sm ${dupCardBg}`}
                id={`duplicate-item-${index}`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>
                  <Sparkles size={11} />
                  <span>{item.reason}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {item.primary.avatarUrl ? (
                      <img className={`w-8 h-8 rounded-full border-2 object-cover shadow-sm ${isDark ? 'border-[#1e1e32]' : 'border-[#FAF9F5]'}`} src={item.primary.avatarUrl} alt="" referrerPolicy="no-referrer" />
                    ) : (
                      <div className={`w-8 h-8 rounded-full ${item.primary.avatarBg || 'bg-stone-500'} text-white border-2 font-bold flex items-center justify-center text-[10px] ${isDark ? 'border-[#1e1e32]' : 'border-[#FAF9F5]'}`}>
                        {item.primary.name.charAt(0)}
                      </div>
                    )}
                    {item.duplicate.avatarUrl ? (
                      <img className={`w-8 h-8 rounded-full border-2 object-cover shadow-sm ${isDark ? 'border-[#1e1e32]' : 'border-[#FAF9F5]'}`} src={item.duplicate.avatarUrl} alt="" referrerPolicy="no-referrer" />
                    ) : (
                      <div className={`w-8 h-8 rounded-full ${item.duplicate.avatarBg || 'bg-stone-600'} text-white border-2 font-bold flex items-center justify-center text-[10px] ${isDark ? 'border-[#1e1e32]' : 'border-[#FAF9F5]'}`}>
                        {item.duplicate.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 truncate">
                    <p className={`font-semibold truncate ${titleColor}`}>{item.primary.name}</p>
                    <p className={`text-[10px] truncate font-mono ${subtitleColor}`}>{item.primary.email || item.primary.mobilePhone}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div
                    className={`flex-1 border font-bold py-1.5 rounded-lg text-[11px] transition text-center ${compareBtn}`}
                    id={`btn-view-colliding-${index}`}
                  >
                    Compare
                  </div>
                  <div
                    className={`flex-1 font-bold py-1.5 rounded-lg text-[11px] transition shadow-xs text-center ${mergeBtn}`}
                    id={`btn-merge-colliding-${index}`}
                  >
                    Merge Profile
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className={`divide-y ${dividerColor}`} id="contacts-regular-list">
            {filtered.map((contact) => {
              const isSelected = selectedContactId === contact.id;
              const hasAvatar = !!contact.avatarUrl;

              return (
                <div
                  key={contact.id}
                  id={`contact-item-${contact.id}`}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 select-none transition duration-150 ${isSelected ? selectedItem : hoverItem}`}
                >
                  {hasAvatar ? (
                    <img
                      src={contact.avatarUrl}
                      alt={contact.name}
                      referrerPolicy="no-referrer"
                      className={`w-10 h-10 rounded-full object-cover shrink-0 border ${avatarBorder}`}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${avatarBorder} ${contact.avatarBg || (isDark ? 'bg-[#2e2e4a]' : 'bg-[#D9D2C5]')} ${isDark ? 'text-slate-200' : 'text-neutral-800'}`}
                    >
                      {contact.name ? contact.name.charAt(0) : '?'}
                    </div>
                  )}

                  <div className="flex-1 min-w-0 pr-1">
                    <p className={`text-xs font-bold truncate ${isSelected ? titleColor : (isDark ? 'text-slate-200' : 'text-neutral-900')}`}>
                      {contact.name || 'Anonymous Contact'}
                    </p>
                    <p className={`text-[9px] uppercase tracking-wider truncate font-mono mt-0.5 ${subtitleColor}`}>
                      {contact.email || contact.mobilePhone || 'No correspondence info'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`h-64 flex flex-col items-center justify-center text-center p-6 ${isDark ? 'text-slate-500' : 'text-neutral-500'}`} id="contact-list-empty">
            <p className={`text-xs mb-1 font-bold ${emptyTitle}`}>No Contacts Found</p>
            <p className={`text-[10px] max-w-[180px] ${emptySubtitle}`}>
              {searchQuery ? `No results match "${searchQuery}"` : 'This category contains index-zero contacts.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
