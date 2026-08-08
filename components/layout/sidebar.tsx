'use client'; // This is a client component

import { 
  BarChart3, 
  Bookmark, 
  CloudSun, 
  Compass, 
  House, 
  Newspaper,
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  {
    label: 'Dashboard',
    icon: House,
    href: '/',
  },
  {
    label: 'Discover',
    icon: Compass,
    href: '/discover',
  },
  {
    label: 'Technology',
    icon: Newspaper,
    href: '/technology',
  },
  {
    label: 'Locations',
    icon: CloudSun,
    href: '/locations',
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
  },
  {
    label: 'Bookmarks',
    icon: Bookmark,
    href: '/bookmarks',
  },
];

export function Sidebar() {
  // Get the current pathname using the usePathname hook
  const pathname = usePathname();

  return (
    <aside className='hidden w-64 border-r border-slate-200 bg-white md:block'>
      <div className='p-6'>
        <h1 className='text-xl font-bold text-slate-900'>
          SignalBoard
        </h1>
      </div>

      <nav aria-label="Primary navigation" className='px-3'>
        {navigation.map((item) => {
          const { label, icon, href } = item;
          const Icon = icon;

          const isActive = pathname === href;

          return (
            <Link 
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive 
                ? 'bg-slate-900 font-medium text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              <Icon size={18} className='w-5 h-5 text-slate-500' />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};