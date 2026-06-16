import React, { useState } from 'react';
import { X, FileUp, FileDown, Printer, Copy, Check, Sparkles, Plus, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../ThemeContext';

// Preset templates for import
const IMPORT_PRESET_TEMPLATES = [
  {
    name: 'Sample Corp',
    data: `Full Name,Email,Mobile,Job,Company\nDavid Beckham,david@brandbeckham.com,310-999-0012,Managing Director,Beckham Ltd\nMaria Sharapova,maria@courtplay.hn,310-444-5555,Professional Tennis Athlete,Nike Inc\nKimi Raikkonen,iceman@suzuka-gp.com,303-123-9999,Lead Test Driver,Alfa Romeo`
  },
  {
    name: 'Family Members',
    data: `Full Name,Email,Mobile,Job,Company\nAmelia Watson,amelia@watson.com,510-555-0100,Pediatric Doctor,Mercy Health\nOliver Smith,oliver.smith@gmail.com,415-333-2211,Software Architect,Independent`
  }
];

export default function UtilityModals({
  importOpen,
  importClose,
  onImportContacts,
  exportOpen,
  exportClose,
  contacts,
  printOpen,
  printClose,
}) {
  const { isDark } = useTheme();

  // Theme helpers
  const modalBg = isDark ? 'bg-[#1a1a2e] border-[#2e2e4a]' : 'bg-[#ffffff4d] border-[#D0C9BA]';
  const headerBg = isDark ? 'bg-[#12122a] border-[#2e2e4a]' : 'bg-[#ffffff4d] border-[#D0C9BA]';
  const titleColor = isDark ? 'text-[#E8E4DB]' : 'text-[#1A1A1A]';
  const closeBtn = isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-[#2e2e4a]' : 'text-muted hover:text-neutral-900 hover:bg-[#ffffff4d]/50';
  const inputStyle = isDark ? 'text-[#E8E4DB] bg-[#0d0d1f] border-[#3a3a55] focus:border-indigo-500 placeholder:text-slate-600' : 'text-[#1A1A1A] bg-[#ffffff4d] border-[#D0C9BA] focus:border-[#1A1A1A]';
  const labelStyle = isDark ? 'text-slate-500' : 'text-muted';
  const presetBtn = isDark ? 'bg-[#1e1e32] text-slate-300 border-[#3a3a55] hover:bg-[#2e2e4a]' : 'bg-[#ffffff4d] text-muted border-[#D0C9BA] hover:bg-[#ffffff4d]/50';
  const cancelBtn = isDark ? 'bg-[#1e1e32] hover:bg-[#2e2e4a] border-[#3a3a55] text-slate-300' : 'bg-[#ffffff4d] hover:bg-[#ffffff4d]/50 border-[#D0C9BA] text-muted';
  const submitBtn = isDark ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F5]';
  const tabBorderColor = isDark ? 'border-[#2e2e4a]' : 'border-[#D0C9BA]';
  const activeTab = isDark ? 'border-indigo-400 text-[#E8E4DB]' : 'border-[#1A1A1A] text-[#1A1A1A]';
  const inactiveTab = isDark ? 'border-transparent text-slate-500 hover:text-slate-300' : 'border-transparent text-muted hover:text-neutral-800';
  const copyBtnStyle = isDark ? 'bg-[#2e2e4a] hover:bg-[#3a3a55] text-slate-200 border-[#3a3a55]' : 'bg-[#ffffff4d] hover:bg-[#ffffff4d]/60 text-[#1A1A1A] border-[#D0C9BA]';
  const errBg = isDark ? 'bg-rose-900/30 border-rose-700 text-rose-300' : 'bg-red-50 border-red-200 text-red-900';
  const successBg = isDark ? 'text-emerald-400' : 'text-emerald-950';

  // Import states
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState('idle');
  const [errorText, setErrorText] = useState('');

  // Export states
  const [exportType, setExportType] = useState('csv');
  const [isCopied, setIsCopied] = useState(false);

  // Generate exported code
  const getExportString = () => {
    const activeContacts = contacts.filter(c => !c.isDeleted);
    if (exportType === 'json') {
      return JSON.stringify(activeContacts, null, 2);
    } else {
      // CSV format
      const header = 'Name,Email,Mobile Phone,Home Phone,Job Title,Company,Message\n';
      const rows = activeContacts.map(c => {
        const safeVal = (val) => {
          if (!val) return '';
          return `"${val.replace(/"/g, '""')}"`;
        };
        return `${safeVal(c.name)},${safeVal(c.email)},${safeVal(c.mobilePhone)},${safeVal(c.homePhone)},${safeVal(c.jobTitle)},${safeVal(c.company)},${safeVal(c.message)}`;
      }).join('\n');
      return header + rows;
    }
  };

  const handleCopyExport = () => {
    navigator.clipboard.writeText(getExportString());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Import handler logic
  const handleImportSubmit = () => {
    if (!importText.trim()) {
      setErrorText('Please enter or select some CSV data to import.');
      setImportStatus('error');
      return;
    }

    try {
      const lines = importText.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) {
        setErrorText('CSV file must contain a header and at least one contact row.');
        setImportStatus('error');
        return;
      }

      // Read Header
      const headerValues = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
      const parsedContacts = [];

      for (let i = 1; i < lines.length; i++) {
        // Simple comma split, stripping quotes
        const rowValues = lines[i].split(',').map(r => r.trim().replace(/^"|"$/g, ''));
        
        let name = '';
        let email = '';
        let mobile = '';
        let job = 'Professional Associate';
        let company = 'Independent';

        headerValues.forEach((header, colIndex) => {
          const val = rowValues[colIndex] || '';
          if (header.includes('name') || header.includes('full')) name = val;
          else if (header.includes('email') || header.includes('mail')) email = val;
          else if (header.includes('phone') || header.includes('mobile') || header.includes('number')) mobile = val;
          else if (header.includes('job') || header.includes('title') || header.includes('position')) job = val;
          else if (header.includes('company') || header.includes('org')) company = val;
        });

        if (name) {
          parsedContacts.push({
            name,
            email,
            mobilePhone: mobile,
            homePhone: '',
            message: '@' + name.toLowerCase().replace(/\s+/g, ''),
            jobTitle: job,
            company,
            favorite: false,
            frequentlyContacted: false,
          });
        }
      }

      if (parsedContacts.length === 0) {
        setErrorText('No valid contacts detected. Ensure the CSV header contains "Name".');
        setImportStatus('error');
        return;
      }

      onImportContacts(parsedContacts);
      setImportStatus('success');
      setImportText('');
      setTimeout(() => {
        importClose();
        setImportStatus('idle');
      }, 1500);

    } catch (e) {
      setErrorText('Formatting error: ' + e.message);
      setImportStatus('error');
    }
  };

  const activeContactsPrint = contacts.filter(c => !c.isDeleted);

  return (
    <>
      {/* 1. IMPORT MODAL */}
      <AnimatePresence>
        {importOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs select-none" id="import-backdrop">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-xl w-full max-w-lg shadow-xl flex flex-col ${modalBg}`}
              id="import-container"
            >
              <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${headerBg}`}>
                <div className="flex items-center gap-2 animate-pulse">
                  <FileUp className={isDark ? 'text-indigo-400' : 'text-stone-800'} size={16} />
                  <span className={`text-sm font-bold font-serif italic tracking-tight ${titleColor}`}>Import Contacts (CSV Format)</span>
                </div>
                <button onClick={importClose} className={`p-1.5 rounded-lg transition cursor-pointer ${closeBtn}`}>
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-4 font-sans">
                {importStatus === 'success' ? (
                  <div className={`p-8 text-center space-y-2 font-sans ${successBg}`} id="import-success-block">
                    <Check className="w-12 h-12 bg-emerald-100 rounded-full border border-emerald-400 p-2 mx-auto animate-bounce text-emerald-800" />
                    <p className={`text-sm font-bold font-serif italic ${titleColor}`}>Successfully Parsed!</p>
                    <p className={`text-xs ${labelStyle}`}>Appending contacts to local database logs...</p>
                  </div>
                ) : (
                  <>
                    {importStatus === 'error' && (
                      <div className={`border rounded-lg p-3 text-xs flex gap-2 items-center ${errBg}`} id="import-error-block">
                        <AlertCircle size={15} className="shrink-0 text-red-500" />
                        <span>{errorText}</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <p className={`text-[9px] font-bold uppercase tracking-widest ${labelStyle}`}>PRESET TEMPLATES</p>
                      <div className="flex gap-2">
                        {IMPORT_PRESET_TEMPLATES.map((tmpl, idx) => (
                          <button
                            key={idx}
                            onClick={() => { setImportText(tmpl.data); setImportStatus('idle'); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${presetBtn}`}
                            id={`btn-load-preset-csv-${idx}`}
                          >
                            <FileSpreadsheet size={13} className={isDark ? 'text-indigo-400' : 'text-[#1A1A1A]'} />
                            <span>{tmpl.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className={`text-[9px] font-bold uppercase tracking-widest ${labelStyle}`}>PASTE DIRECT CSV</p>
                      <textarea
                        value={importText}
                        onChange={(e) => { setImportText(e.target.value); if (importStatus === 'error') setImportStatus('idle'); }}
                        placeholder={`Full Name,Email,Mobile,Job,Company
David Miller,david@miller.com,555-123-4567,Solutions Rep,Miller Corp`}
                        rows={6}
                        className={`w-full text-xs font-mono border rounded-lg p-3 outline-none transition resize-none ${inputStyle}`}
                        id="textarea-import-csv"
                      />
                    </div>

                    <p className={`text-[10px] italic font-medium leading-relaxed ${labelStyle}`}>
                      Note: The CSV parser maps column headers named "Name", "Email", "Mobile", "Job" and "Company" directly. Multiple rows are imported in sequence safely.
                    </p>

                    <div className="flex justify-end gap-3 pt-2">
                      <button onClick={importClose} className={`px-4 py-2 border rounded-lg text-xs font-bold transition cursor-pointer ${cancelBtn}`}>Cancel</button>
                      <button onClick={handleImportSubmit} className={`px-5 py-2 font-bold rounded-full text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer ${submitBtn}`} id="btn-trigger-import">
                        <Plus size={14} />
                        Import Data
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. EXPORT MODAL */}
      <AnimatePresence>
        {exportOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs select-none" id="export-backdrop">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-xl w-full max-w-lg shadow-xl flex flex-col ${modalBg}`}
              id="export-container"
            >
              <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${headerBg}`}>
                <div className="flex items-center gap-2">
                  <FileDown className={isDark ? 'text-amber-400' : 'text-amber-800'} size={16} />
                  <span className={`text-sm font-bold font-serif italic tracking-tight ${titleColor}`}>Export Contacts Database</span>
                </div>
                <button onClick={exportClose} className={`p-1.5 rounded-lg transition cursor-pointer ${closeBtn}`}>
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-4 font-sans">
                {/* Export choice format toggles */}
                <div className={`flex gap-4 border-b pb-3 ${tabBorderColor}`}>
                  <button
                    onClick={() => setExportType('csv')}
                    className={`flex items-center gap-1.5 pb-2 border-b-2 text-xs font-bold transition cursor-pointer ${
                      exportType === 'csv' ? activeTab : inactiveTab
                    }`}
                    id="btn-export-csv-tab"
                  >
                    <span>CSV Code Block</span>
                  </button>
                  <button
                    onClick={() => setExportType('json')}
                    className={`flex items-center gap-1.5 pb-2 border-b-2 text-xs font-bold transition cursor-pointer ${
                      exportType === 'json' ? activeTab : inactiveTab
                    }`}
                    id="btn-export-json-tab"
                  >
                    <span>JSON Object Array</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    readOnly
                    value={getExportString()}
                    className={`w-full text-[10px] font-mono border rounded-xl p-3 outline-none outline-0 select-text resize-none ${inputStyle}`}
                    rows={10}
                    id="textarea-exported-code"
                  />
                  <button
                    onClick={handleCopyExport}
                    className={`absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition ${copyBtnStyle}`}
                    id="btn-copy-export"
                  >
                    {isCopied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={exportClose} className={`px-5 py-2 border rounded-lg text-xs font-bold transition cursor-pointer ${cancelBtn}`} id="btn-close-export">
                    Close Panel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. PRINT PREVIEW MODAL */}
      <AnimatePresence>
        {printOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-xs select-none" id="print-backdrop">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF9F5] text-neutral-900 rounded-xl w-full max-w-3xl shadow-xl flex flex-col max-h-[85vh] select-text border border-[#D0C9BA]"
              id="print-container"
            >
              {/* Header bar controls */}
              <div className="p-4 border-b border-[#D0C9BA] flex justify-between items-center bg-[#EBE7DD] rounded-t-xl select-none">
                <div className="flex items-center gap-2">
                  <Printer className="text-neutral-800" size={17} />
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#1A1A1A]">Contacts Directory Printout Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F5] rounded-full text-xs font-bold shadow-xs transition cursor-pointer"
                    id="btn-trigger-hardware-print"
                  >
                    Print Document
                  </button>
                  <button onClick={printClose} className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-[#D9D2C5]/50 transition cursor-pointer">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Printable Table scroll */}
              <div className="flex-1 overflow-y-auto p-8 font-serif" id="print-sheet-scrollable">
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="text-center border-b pb-4 space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] font-serif italic">Business Contacts Directory</h1>
                    <p className="text-xs text-neutral-600 italic font-sans uppercase tracking-widest text-[9px] font-bold">Total Records: {activeContactsPrint.length} • Generated on {new Date().toLocaleDateString()}</p>
                  </div>

                  <table className="w-full text-xs text-left border-collapse" id="table-print">
                    <thead>
                      <tr className="border-b-2 border-neutral-800 font-sans text-neutral-600">
                        <th className="py-2.5 font-bold uppercase tracking-wider text-[10px]">Name</th>
                        <th className="py-2.5 font-bold uppercase tracking-wider text-[10px]">Designation & Org</th>
                        <th className="py-2.5 font-bold uppercase tracking-wider text-[10px]">Email Address</th>
                        <th className="py-2.5 font-bold uppercase tracking-wider text-[10px]">Channels</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D0C9BA] font-serif">
                      {activeContactsPrint.map((c) => (
                        <tr key={c.id} className="align-top hover:bg-neutral-50">
                          <td className="py-3 pr-2 font-bold font-serif text-[#1A1A1A] italic text-sm">{c.name}</td>
                          <td className="py-3 pr-2 text-[11px] font-sans">
                            <p className="font-semibold text-neutral-800">{c.jobTitle}</p>
                            <p className="text-neutral-500">{c.company}</p>
                          </td>
                          <td className="py-3 pr-2 font-mono text-[11px] text-neutral-700">{c.email || 'N/A'}</td>
                          <td className="py-3 text-[11px] text-neutral-650 font-sans">
                            {c.mobilePhone && <p><span className="font-semibold text-[10px] text-neutral-500 uppercase">Mob:</span> {c.mobilePhone}</p>}
                            {c.homePhone && <p><span className="font-semibold text-[10px] text-neutral-500 uppercase">Home:</span> {c.homePhone}</p>}
                            {c.message && <p><span className="font-semibold text-[10px] text-neutral-500 uppercase">Msg:</span> {c.message}</p>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="pt-8 border-t text-[10px] text-neutral-405 text-neutral-400 text-center font-sans tracking-widest uppercase select-none font-semibold">
                    Security Policy: Local Offline Sandbox Cache. Do Not Leave Unattended.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
