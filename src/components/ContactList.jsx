import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function ContactList({
  contacts,
  selectedContactId
}) {
  const { isDark } = useTheme();

  // Static view: show all non-deleted contacts, sorted A→Z
  const filtered = contacts
    .filter(c => !c.isDeleted)
    .sort((a, b) => a.name.localeCompare(b.name));

  const paneBg = isDark ? 'bg-[#111127] border-[#2e2e4a]' : 'bg-[#ffffff4d] border-[#D0C9BA]';
  const headerBorder = isDark ? 'border-[#2e2e4a]' : 'border-[#D0C9BA]';
  const titleColor = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const sortBtn = isDark
    ? 'text-slate-500 hover:text-slate-100 hover:bg-[#2e2e4a]'
    : 'text-muted hover:text-neutral-900 hover:bg-[#ffffff4d]/50';
  const dividerColor = isDark ? 'divide-[#2e2e4a]/40' : 'divide-[#D0C9BA]/40';
  const selectedItem = isDark
    ? 'bg-[#252545] border-r-4 border-indigo-400 text-[#E8E4DB]'
    : 'bg-[#ffffff4d] border-r-4 border-[#1A1A1A] text-[#1A1A1A]';
  const hoverItem = isDark ? 'hover:bg-[#1e1e38]/60 text-slate-300' : 'hover:bg-[#ffffff4d]/30 text-muted';
  const avatarBorder = isDark ? 'border-[#3a3a55]/60' : 'border-[#D0C9BA]/60';
  const subtitleColor = isDark ? 'text-slate-500' : 'text-muted';
  const emptyTitle = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const emptySubtitle = isDark ? 'text-slate-500' : 'text-muted';

  return (
    <div
      className={`w-full md:w-72 lg:w-80 h-full border-r flex flex-col shrink-0 ${paneBg}`}
      id="contact-list-pane"
    >
      {/* Header */}
      <div
        className={`p-4 flex items-center justify-between border-b shrink-0 ${headerBorder}`}
        id="contact-list-header"
      >
        <h3 className={`text-sm font-bold tracking-tight ${titleColor}`}>
          All Contacts
        </h3>
        <div
          className={`p-1.5 rounded-lg transition duration-200 flex items-center gap-1 text-xs ${sortBtn}`}
          title="Sort A to Z"
          id="btn-sort-contacts"
        >
          <span className="font-mono text-[10px] hidden sm:inline">A-Z</span>
          <ArrowUpDown size={14} />
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto" id="contact-list-scrollable">
        {filtered.length > 0 ? (
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
          <div
            className={`h-64 flex flex-col items-center justify-center text-center p-6 ${isDark ? 'text-slate-500' : 'text-neutral-500'}`}
            id="contact-list-empty"
          >
            <p className={`text-xs mb-1 font-bold ${emptyTitle}`}>No Contacts Found</p>
            <p className={`text-[10px] max-w-[180px] ${emptySubtitle}`}>
              This category contains no contacts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
