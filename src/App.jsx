import React from 'react';
import { INITIAL_CONTACTS } from './data';
import LeftRail from './components/LeftRail';
import RightRail from './components/RightRail';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { useTheme } from './ThemeContext';

const selectedContactId = INITIAL_CONTACTS[1].id;
const activeContact = INITIAL_CONTACTS.find(c => c.id === selectedContactId) || null;

export default function App() {
  const { isDark } = useTheme();

  return (
    <div
      className={`w-full h-screen flex flex-col font-sans overflow-hidden select-none transition-colors duration-300 ${isDark ? 'bg-[#0f0f1a] text-[#E8E4DB]' : 'text-[#1A1A1A]'}`}
      id="applet-dashboard-shell"
    >
      {/* Global Header */}
      <TopBar />

      {/* Main content panes */}
      <div className="flex-1 flex min-h-0 w-full" id="dashboard-panes-row">
        {/* Left Rail — hidden on small screens */}
        <div className="hidden md:block">
          <LeftRail />
        </div>

        {/* Sidebar — hidden on small screens */}
        <div className="hidden md:block">
          <Sidebar contacts={INITIAL_CONTACTS} />
        </div>

        {/* Contact List */}
        <ContactList
          contacts={INITIAL_CONTACTS}
          selectedContactId={selectedContactId}
        />

        {/* Contact Detail */}
        <ContactDetail contact={activeContact} />

        {/* Right Rail — hidden on small/medium screens */}
        <div className="hidden lg:block">
          <RightRail />
        </div>
      </div>
    </div>
  );
}
