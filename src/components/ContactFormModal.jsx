import React, { useState, useEffect } from 'react';
import { X, Sparkles, User, Mail, Phone, Briefcase, Tag, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../ThemeContext';

// Preset avatar photos for professional look
const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', // Curly dark hair lady (Andre)
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', // Smile lady (Allion)
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', // Curly hair guy (Boris)
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', // Beard smile (Carmen)
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', // Auburn hair (Carroll)
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', // Glasses woman (Elbert)
];

const INITIAL_BG_PRESETS = [
  { class: 'bg-[#152e4d]', label: 'Default Navy' },
  { class: 'bg-emerald-600', label: 'Emerald' },
  { class: 'bg-orange-500', label: 'Orange' },
  { class: 'bg-blue-600', label: 'Blue' },
  { class: 'bg-indigo-600', label: 'Indigo' },
  { class: 'bg-pink-600', label: 'Pink' },
];

const GROUPS_PRESET = ['Most Important', 'Work', 'Family', 'Projects', 'Recent Leads'];

export default function ContactFormModal({
  isOpen,
  onClose,
  onSubmit,
  contact = null
}) {
  const { isDark } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [message, setMessage] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [group, setGroup] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [frequentlyContacted, setFrequentlyContacted] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarBg, setAvatarBg] = useState('bg-[#152e4d]');
  const [avatarType, setAvatarType] = useState('initials');

  const [validationError, setValidationError] = useState('');

  // Load contact values when editing
  useEffect(() => {
    if (contact) {
      setName(contact.name || '');
      setEmail(contact.email || '');
      setMobilePhone(contact.mobilePhone || '');
      setHomePhone(contact.homePhone || '');
      setMessage(contact.message || '');
      setJobTitle(contact.jobTitle || '');
      setCompany(contact.company || '');
      setGroup(contact.group || '');
      setFavorite(contact.favorite || false);
      setFrequentlyContacted(contact.frequentlyContacted || false);
      setAvatarUrl(contact.avatarUrl || '');
      setAvatarBg(contact.avatarBg || 'bg-[#152e4d]');
      setAvatarType(contact.avatarUrl ? 'photo' : 'initials');
    } else {
      // Clear for new creation
      setName('');
      setEmail('');
      setMobilePhone('');
      setHomePhone('');
      setMessage('');
      setJobTitle('');
      setCompany('');
      setGroup('');
      setFavorite(false);
      setFrequentlyContacted(false);
      setAvatarUrl('');
      setAvatarBg('bg-[#152e4d]');
      setAvatarType('initials');
    }
    setValidationError('');
  }, [contact, isOpen]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError('Full Name is required.');
      return;
    }

    // Submit payload
    onSubmit({
      id: contact?.id, // passed optionally
      name: name.trim(),
      email: email.trim(),
      mobilePhone: mobilePhone.trim(),
      homePhone: homePhone.trim(),
      message: message.trim(),
      jobTitle: jobTitle.trim() || 'Professional Partner',
      company: company.trim() || 'Independent',
      group: group || undefined,
      favorite,
      frequentlyContacted,
      avatarUrl: avatarType === 'photo' ? avatarUrl : undefined,
      avatarBg: avatarType === 'initials' ? avatarBg : undefined,
    });

    onClose();
  };

  if (!isOpen) return null;

  const backdrop = 'fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs select-none';
  const modalBg = isDark ? 'bg-[#1a1a2e] border-[#2e2e4a]' : 'bg-[#FAF9F5] border-[#D0C9BA]';
  const headerBg = isDark ? 'bg-[#12122a] border-[#2e2e4a]' : 'bg-[#EBE7DD] border-[#D0C9BA]';
  const titleColor = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const closeBtn = isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-[#2e2e4a]' : 'text-neutral-500 hover:text-neutral-900 hover:bg-[#D9D2C5]/50';
  const inputStyle = isDark
    ? 'text-[#E8E4DB] bg-[#0d0d1f] border-[#3a3a55] focus:border-indigo-500 placeholder:text-slate-600'
    : 'text-[#1A1A1A] bg-white border-[#D0C9BA] focus:border-[#1A1A1A] placeholder:text-neutral-400';
  const labelStyle = isDark ? 'text-slate-500' : 'text-neutral-500';
  const sectionBg = isDark ? 'bg-[#252545]/40 border-[#3a3a55]' : 'bg-[#EBE7DD]/40 border-[#D0C9BA]';
  const sectionLabel = isDark ? 'text-slate-400' : 'text-neutral-600';
  const radioBg = isDark ? 'text-slate-300' : 'text-neutral-700';
  const pillActive = isDark ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#1A1A1A] text-[#FAF9F5] border-[#1A1A1A]';
  const pillInactive = isDark ? 'bg-[#1e1e32] text-slate-400 border-[#3a3a55] hover:text-slate-100 hover:border-slate-500' : 'bg-[#FAF9F5] text-neutral-600 border-[#D0C9BA] hover:text-neutral-900 hover:border-neutral-700';
  const toggleRow = isDark ? 'bg-[#0d0d1f] border-[#3a3a55] text-slate-300' : 'bg-white border-[#D0C9BA] text-neutral-700';
  const footerBg = isDark ? 'bg-[#12122a] border-[#2e2e4a]' : 'bg-[#EBE7DD] border-[#D0C9BA]';
  const cancelBtn = isDark ? 'bg-[#1e1e32] hover:bg-[#2e2e4a] border-[#3a3a55] text-slate-300' : 'bg-white hover:bg-[#EBE7DD]/50 border-[#D0C9BA] text-neutral-700';
  const submitBtn = isDark ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F5]';
  const iconColor = isDark ? 'text-slate-500' : 'text-neutral-400';

  return (
    <div className={backdrop} id="contact-form-backdrop">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`border rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh] ${modalBg}`}
        id="contact-form-modal-container"
      >
        {/* Header bar */}
        <div className={`p-4 border-b flex justify-between items-center rounded-t-xl shrink-0 ${headerBg}`} id="contact-form-header">
          <div className="flex items-center gap-2">
            <Sparkles className={isDark ? 'text-indigo-400' : 'text-amber-800'} size={16} />
            <h3 className={`text-sm font-bold font-serif italic tracking-tight ${titleColor}`}>
              {contact ? 'Update Contact Profile' : 'Create New Contact'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition cursor-pointer ${closeBtn}`}
            id="btn-close-form"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable form */}
        <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto p-6 space-y-5" id="profile-edit-form">
          {validationError && (
            <div className={`border rounded-lg p-2.5 text-xs flex gap-2 items-center ${isDark ? 'bg-rose-900/30 border-rose-700 text-rose-300' : 'bg-red-50 border-red-200 text-red-900'}`} id="validation-error-alert">
              <AlertCircle size={15} className="shrink-0 text-red-500" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Section: Basic info */}
          <div className="space-y-3 font-sans">
            <label className={`text-[10px] font-bold uppercase tracking-widest block ${labelStyle}`}>NAME & CORRESPONDENCE</label>
            
            {/* Input Name */}
            <div className="relative">
              <User size={14} className={`absolute left-3.5 top-3 ${iconColor}`} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name (e.g., Andre Allison) *"
                className={`w-full text-xs border rounded-lg pl-10 pr-4 py-2.5 outline-none transition ${inputStyle}`}
                id="input-name"
                required
              />
            </div>

            {/* Input Email */}
            <div className="relative">
              <Mail size={14} className={`absolute left-3.5 top-2.5 ${iconColor}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address (e.g., mail@allison.hn)"
                className={`w-full text-xs border rounded-lg pl-10 pr-4 py-2.5 outline-none transition ${inputStyle}`}
                id="input-email"
              />
            </div>
          </div>

          {/* Section: Phone logs */}
          <div className="space-y-3 font-sans">
            <label className={`text-[10px] font-bold uppercase tracking-widest block ${labelStyle}`}>PHONES & NETWORKS</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <Phone size={14} className={`absolute left-3 top-2.5 ${iconColor}`} />
                <input
                  type="text"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  placeholder="Mobile (e.g., 303-570-0941)"
                  className={`w-full text-xs border rounded-lg pl-9 pr-3 py-2.5 outline-none transition ${inputStyle}`}
                  id="input-mobile-phone"
                />
              </div>

              <div className="relative">
                <Phone size={14} className={`absolute left-3 top-2.5 ${iconColor}`} />
                <input
                  type="text"
                  value={homePhone}
                  onChange={(e) => setHomePhone(e.target.value)}
                  placeholder="Home (e.g., 543-769-0002)"
                  className={`w-full text-xs border rounded-lg pl-9 pr-3 py-2.5 outline-none transition ${inputStyle}`}
                  id="input-home-phone"
                />
              </div>
            </div>

            {/* Message handle */}
            <div className="relative">
              <span className={`absolute left-3 top-2 text-xs font-mono font-bold ${iconColor}`}>@</span>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value.startsWith('@') ? e.target.value : '@' + e.target.value)}
                placeholder="Social Handle (e.g., @andreallison)"
                className={`w-full text-xs border rounded-lg pl-9 pr-3 py-2.5 outline-none transition font-mono ${inputStyle}`}
                id="input-message"
              />
            </div>
          </div>

          {/* Section: Job and Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
            <div className="space-y-1.5">
              <label className={`text-[10px] font-bold uppercase tracking-widest block ${labelStyle}`}>Job Designation</label>
              <div className="relative">
                <Briefcase size={14} className={`absolute left-3 top-2.5 ${iconColor}`} />
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Implementation Analyst"
                  className={`w-full text-xs border rounded-lg pl-9 pr-3 py-2.5 outline-none transition ${inputStyle}`}
                  id="input-job-title"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-[10px] font-bold uppercase tracking-widest block ${labelStyle}`}>Company name</label>
              <div className="relative">
                <Briefcase size={14} className={`absolute left-3 top-2.5 ${iconColor}`} />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Harvey Inc"
                  className={`w-full text-xs border rounded-lg pl-9 pr-3 py-2.5 outline-none transition ${inputStyle}`}
                  id="input-company"
                />
              </div>
            </div>
          </div>

          {/* Section: Avatar Settings */}
          <div className={`space-y-2 border rounded-xl p-3 font-sans ${sectionBg}`}>
            <label className={`text-[10px] font-bold uppercase tracking-widest block ${sectionLabel}`}>AVATAR IDENTITY DESIGN</label>
            <div className="flex gap-4 text-xs mb-3">
              <label className={`flex items-center gap-1.5 cursor-pointer select-none font-medium ${radioBg}`}>
                <input
                  type="radio"
                  name="avatarType"
                  checked={avatarType === 'initials'}
                  onChange={() => setAvatarType('initials')}
                  className="accent-[#1A1A1A]"
                  id="radio-avatar-initials"
                />
                <span>Initials Symbol</span>
              </label>

              <label className={`flex items-center gap-1.5 cursor-pointer select-none font-medium ${radioBg}`}>
                <input
                  type="radio"
                  name="avatarType"
                  checked={avatarType === 'photo'}
                  onChange={() => setAvatarType('photo')}
                  className="accent-[#1A1A1A]"
                  id="radio-avatar-photo"
                />
                <span>Professional Portrait URL</span>
              </label>
            </div>

            {avatarType === 'photo' ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Paste Image URL (or select preset below)"
                  className={`w-full text-xs border rounded-lg px-3 py-2 outline-none transition ${inputStyle}`}
                  id="input-avatar-url"
                />
                <div className="flex gap-2.5 items-center flex-wrap pt-1">
                  <span className="text-[10px] text-neutral-500">Presets:</span>
                  {AVATAR_PRESETS.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      onClick={() => setAvatarUrl(p)}
                      referrerPolicy="no-referrer"
                      alt=""
                      className={`w-7.5 h-7.5 rounded-full object-cover cursor-pointer border hover:scale-110 transition ${
                        avatarUrl === p ? 'border-amber-800 scale-105' : 'border-[#D0C9BA]'
                      }`}
                      id={`preset-avatar-${i}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-[10px] text-neutral-500">Color themes:</span>
                {INITIAL_BG_PRESETS.map((p, i) => {
                  let bgClassForPreset = p.class;
                  // If color presets contain dark blues let's make them warm tones (stone, bronze, charcoal, sienna)
                  if (bgClassForPreset === 'bg-[#152e4d]') {
                    bgClassForPreset = 'bg-stone-500';
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatarBg(bgClassForPreset)}
                      className={`w-6 h-6 rounded-full ${bgClassForPreset} border hover:scale-110 transition flex items-center justify-center cursor-pointer`}
                      title={p.label}
                      id={`preset-bg-${i}`}
                    >
                      {avatarBg === bgClassForPreset && <span className="text-white text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: Groups Pill Picker */}
          <div className="space-y-2 font-sans">
            <label className={`text-[10px] font-bold uppercase tracking-widest block flex items-center gap-1 ${sectionLabel}`}>
              <Tag size={12} />
              <span>Assign Group Badge</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setGroup('')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  group === '' ? pillActive : pillInactive
                }`}
                id="group-pill-none"
              >
                None
              </button>
              {GROUPS_PRESET.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    group === g ? pillActive : pillInactive
                  }`}
                  id={`group-pill-${g.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Toggles */}
          <div className={`flex justify-between items-center border rounded-xl p-3 font-sans ${toggleRow}`}>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="accent-indigo-500 w-4 h-4 rounded cursor-pointer"
                id="checkbox-favorite"
              />
              <span>Star as Favorite</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={frequentlyContacted}
                onChange={(e) => setFrequentlyContacted(e.target.checked)}
                className="accent-indigo-500 w-4 h-4 rounded cursor-pointer"
                id="checkbox-frequent"
              />
              <span>Mark as Frequently Contacted</span>
            </label>
          </div>
        </form>

        {/* Footer actions bar */}
        <div className={`p-4 border-t flex justify-end gap-3 rounded-b-xl shrink-0 font-sans ${footerBg}`} id="contact-form-footer">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 border rounded-lg text-xs font-bold transition cursor-pointer ${cancelBtn}`}
            id="btn-cancel-submit"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitForm}
            className={`px-5 py-2 font-bold rounded-full text-xs transition shadow-xs cursor-pointer ${submitBtn}`}
            id="btn-submit-contact"
          >
            {contact ? 'Save Changes' : 'Create Contact'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
