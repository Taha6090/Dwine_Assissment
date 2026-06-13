import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Star,
  Users2,
  Building,
  SquarePen,
  CircleMinus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../ThemeContext';

export default function ContactDetail({
  contact,
}) {
  const [copiedField, setCopiedField] = useState(null);
  const { isDark } = useTheme();



  const paneBg = isDark ? 'bg-[#0d0d1f]' : 'bg-[#F4F1EA]';
  const headerBorder = isDark ? 'border-[#2e2e4a]' : 'border-[#D0C9BA]';
  const cardBg = isDark ? 'bg-[#1a1a2e] border-[#2e2e4a]' : 'bg-[#FAF9F5] border-[#D0C9BA]';
  const nameColor = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const roleColor = isDark ? 'text-slate-400' : 'text-neutral-600';
  const pillBg = isDark ? 'bg-[#252545]/80 border-[#3a3a55] text-slate-300' : 'bg-[#EBE7DD]/80 border-[#D0C9BA] text-neutral-700';
  const fieldRowBg = isDark
    ? 'bg-[#1a1a2e] border-[#2e2e4a] hover:border-indigo-500/50'
    : 'bg-[#FAF9F5] border-[#D0C9BA] hover:border-neutral-500';
  const fieldIconBg = isDark ? 'bg-[#252545] text-slate-300 border border-[#3a3a55]' : '';
  const labelColor = isDark ? 'text-slate-500' : 'text-[#1a1a1a]/60';
  const valueColor = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const emptyValueColor = isDark ? 'text-slate-600' : 'text-neutral-400';
  const copyBtnColor = isDark ? 'text-slate-600 hover:text-slate-100 hover:bg-[#252545]/50' : 'text-neutral-400 hover:text-neutral-900 hover:bg-[#EBE7DD]/50';
  const avatarBorder = isDark ? 'border-[#252545]' : 'border-[#EBE7DD]';
  const updateBtn = isDark
    ? 'border-[#3a3a55] text-slate-300 hover:bg-[#252545] hover:text-slate-100'
    : 'border-[#D0C9BA] text-neutral-700 hover:bg-[#FAF9F5]/70 hover:text-[#1A1A1A]';
  const favoriteActiveStyle = isDark
    ? 'bg-amber-900/30 border-amber-600 text-amber-400 hover:bg-amber-900/50'
    : 'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200/50';
  const favoriteInactiveStyle = isDark
    ? 'border-[#3a3a55] text-slate-400 hover:border-slate-400 hover:text-slate-100'
    : 'border-[#D0C9BA] text-neutral-600 hover:border-neutral-900 hover:text-neutral-900';

  if (!contact) {
    return (
      <div className={`flex-1 h-full flex flex-col items-center justify-center p-8 select-none text-center ${paneBg}`} id="contact-detail-empty">
        <Users2 size={64} className={`mb-4 animate-pulse ${isDark ? 'text-slate-700' : 'text-neutral-300'}`} />
        <p className={`text-sm font-bold font-serif ${nameColor}`}>Select a Contact</p>
        <p className={`text-xs max-w-[240px] mt-1 ${isDark ? 'text-slate-500' : 'text-neutral-500'}`}>
          Pick a profile from the list to view telephone logs, roles, and administrative commands.
        </p>
      </div>
    );
  }

  const fields = [
    { id: 'mobilePhone', label: 'Mobile Phone', value: contact.mobilePhone, icon: Phone },
    { id: 'homePhone', label: 'Home Phone', value: contact.homePhone, icon: Phone },
    { id: 'email', label: 'Email Address', value: contact.email, icon: Mail },
    { id: 'message', label: 'Message', value: contact.message, icon: MessageSquare },
  ];

  return (
    <div className={`flex-1 h-full flex flex-col overflow-y-auto ${paneBg}`} id="contact-detail-pane">
      {/* Top Action Header Bar */}
      <div className={`p-4 flex items-center justify-end border-b ${headerBorder}`} id="detail-header-actions">

        {/* Action Controls */}
        <div className="flex gap-2">
          {contact.isDeleted ? (
            <>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition shadow-xs ${isDark ? 'bg-emerald-900/30 border-emerald-700 text-emerald-400 hover:bg-emerald-900/50' : 'border-emerald-300 text-emerald-900 bg-emerald-50 hover:bg-emerald-100/60'}`}
                id="btn-restore-contact"
              >
                <RefreshCw size={14} />
                <span>Restore</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition shadow-xs ${isDark ? 'bg-rose-900/30 border-rose-700 text-rose-400 hover:bg-rose-900/50' : 'border-rose-300 text-rose-900 bg-rose-50 hover:bg-rose-100/65'}`}
                id="btn-delete-perm"
              >
                <Trash2 size={14} />
                <span>Delete Permanently</span>
              </div>
            </>
          ) : (
            <>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs ${updateBtn}`}
                id="btn-update-detail"
              >
                <SquarePen  size={14}/>
                <span>Update</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold  transition shadow-xs ${isDark ? '' : 'border-red-200 text-red-900 bg-red-50 hover:bg-red-100/50 hover:border-red-400'}`}
                id="btn-delete-detail"
              >
                <CircleMinus size={14} />
                <span>Delete</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-6 space-y-6 max-w-xl mx-auto w-full" id="detail-scroller-body">
        <div className={`border rounded-2xl p-8 flex flex-col items-center text-center shadow-xs relative font-sans ${cardBg}`} id="contact-banner-card">
          {contact.group && (
            <span className={`absolute top-4 right-4 border rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-bold ${pillBg}`}>
              {contact.group}
            </span>
          )}

          {contact.avatarUrl ? (
            <img
              src={contact.avatarUrl}
              alt={contact.name}
              referrerPolicy="no-referrer"
              className={`w-28 h-28 rounded-full object-cover border-4 shadow-md mb-4 hover:scale-105 transition-all duration-300 ${avatarBorder}`}
              id="detail-card-avatar-img"
            />
          ) : (
            <div
              className={`w-28 h-28 rounded-full border-4 flex items-center justify-center font-bold text-3xl shadow-md mb-4 ${avatarBorder} ${contact.avatarBg || (isDark ? 'bg-[#2e2e4a]' : 'bg-[#D9D2C5]')} ${isDark ? 'text-slate-200' : 'text-neutral-800'}`}
              id="detail-card-avatar-initials"
            >
              {contact.name ? contact.name.slice(0, 2).toUpperCase() : '?'}
            </div>
          )}

          {/* Name & Title */}
          <h2 className={`text-2xl font-bold font-serif italic tracking-tight ${nameColor}`} id="detail-card-name">
            {contact.name || 'Anonymous Profile'}
          </h2>
          <p className={`text-xs font-medium italic mt-2 flex items-center gap-1.5 justify-center max-w-full font-serif ${roleColor}`} id="detail-card-role">
            <Building size={12} className="shrink-0 text-stone-500" />
            <span className="truncate">
              {contact.jobTitle}
              {contact.company ? `, ${contact.company}` : ''}
            </span>
          </p>
        </div>

        <div className="space-y-4 font-sans" id="detail-card-fields">
          {fields.map((field) => {
            const FieldIconComponent = field.icon;
            const hasValue = !!field.value;
            const isCopied = copiedField === field.id;

            return (
              <div
                key={field.id}
                className={`flex items-center justify-between p-3.5 border rounded-xl transition duration-150 ${fieldRowBg}`}
                id={`field-row-${field.id}`}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Left circular icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-[#252545] text-slate-300 border border-[#3a3a55]' : 'bg-[#FAF9F5] text-stone-800 border border-[#D0C9BA]'}`}
                    id={`field-icon-${field.id}`}
                  >
                    <FieldIconComponent size={16} />
                  </div>

                  {/* Internal Labels */}
                  <div className="min-w-0 pr-2">
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${labelColor}`} id={`field-label-${field.id}`}>
                      {field.label}
                    </p>
                    <p
                      className={`text-xs mt-0.5 font-mono truncate ${hasValue ? valueColor : emptyValueColor + ' italic'}`}
                      id={`field-valText-${field.id}`}
                    >
                      {field.value || 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Floating clipboard trigger */}
                {hasValue && (
                  <div className="relative shrink-0" id={`field-copy-container-${field.id}`}>
                    <div
                      className={`p-2 rounded-lg transition duration-150 ${copyBtnColor}`}
                      title={`Copy ${field.label}`}
                      id={`field-btn-copy-${field.id}`}
                    >
                      {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </div>

                    {/* Copied alert confirmation bubble */}
                    <AnimatePresence>
                      {isCopied && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: -25, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          className="absolute bottom-8 right-[-10px] bg-emerald-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap z-30"
                          id={`field-toast-${field.id}`}
                        >
                          <span className="flex items-center gap-1">
                            <CheckCircle2 size={10} /> Copied!
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
