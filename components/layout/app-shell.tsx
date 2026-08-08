import type { ReactNode } from 'react';
import { Sidebar } from './sidebar';


// Define the props types for the AppShell component
interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ 
  children, 
}: AppShellProps) {
  return (
    <div className='flex min-h-screen bg-slate-50'>
      <Sidebar />

      {/* The main content takes up the remaining space */}
      <main className='flex-1'>
        {children}
      </main>
    </div>
  );
}