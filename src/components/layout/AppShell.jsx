import { useState } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import SideNav from './SideNav';
import styles from './AppShell.module.css';

export default function AppShell({ currentPage, onNavigate, pageTitle, children }) {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Header title={pageTitle} onMenuToggle={() => setSideOpen(v => !v)} />

      {sideOpen && (
        <div className={styles.overlay} onClick={() => setSideOpen(false)} />
      )}
      <SideNav
        currentPage={currentPage}
        onNavigate={(id) => { onNavigate(id); setSideOpen(false); }}
        isOpen={sideOpen}
      />

      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}
