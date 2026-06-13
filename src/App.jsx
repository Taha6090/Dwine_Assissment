import React, { useState } from 'react';
import { INITIAL_CONTACTS } from './data';
import LeftRail from './components/LeftRail';
import RightRail from './components/RightRail';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { useTheme } from './ThemeContext';

export default function App() {
  const { isDark } = useTheme();

  const [selectedContactId, setSelectedContactId] = useState(INITIAL_CONTACTS[0].id);

  const activeContact = INITIAL_CONTACTS.find(c => c.id === selectedContactId) || null;

  return (
    <div className={`w-full h-screen flex flex-col font-sans overflow-hidden select-none transition-colors duration-300 ${isDark ? 'bg-[#0f0f1a] text-[#E8E4DB]' : 'text-[#1A1A1A]'}`} id="applet-dashboard-shell">
      {/* 1. Global Header top-bar */}
      <TopBar />

      {/* 2. Main content panes row */}
      <div className="flex-1 flex min-h-0 w-full" id="dashboard-panes-row">
        {/* Extreme Left Rail */}
        <LeftRail />

        {/* Sidebar Categories Panel */}
        <Sidebar
          contacts={INITIAL_CONTACTS}
        />

        {/* Filters/Contacts List Pane */}
        <ContactList
          contacts={INITIAL_CONTACTS}
          selectedContactId={selectedContactId}
          onSelectContact={setSelectedContactId}
        />

        {/* Selected Contact Details Profile Card */}
        <ContactDetail
          contact={activeContact}
        />

        {/* Extreme Right Rail */}
        <RightRail />
      </div>
    </div>
  );
}
