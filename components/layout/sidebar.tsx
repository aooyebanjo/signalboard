import { 
  BarChart3, 
  Bookmark, 
  CloudSun, 
  Compass, 
  House, 
  Newspaper,
} from 'lucide-react';

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
  return (
    <aside className='w-64 border-r border-slate-200 bg-white'>
      <div className='p-6'>
        <h1 className='text-xl font-bold text-slate-900'>
          SignalBoard
        </h1>
      </div>

      <nav className='px-3'>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <a 
              key={item.href}
              href={item.href}
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950'
            >
              <Icon className='w-5 h-5 text-slate-500' />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};