'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Play, Sliders, LayoutDashboard, HelpCircle, MessageSquare } from 'lucide-react';

const navigation = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Installation', href: '/docs/installation', icon: Download },
      { title: 'Initialization', href: '/docs/initialization', icon: Play },
    ],
  },
  {
    title: 'Configuration',
    links: [
      { title: 'Using the Dashboard', href: '/docs/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Guides',
    links: [
      { title: 'Troubleshooting', href: '/docs/troubleshooting', icon: HelpCircle },
      { title: 'Developer FAQ', href: '/docs/faq', icon: MessageSquare },
    ],
  },
];

export default function DocsSidebar({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="pt-4">
      {navigation.map((section) => (
        <div key={section.title} className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-3">
            {section.title}
          </h4>
          <ul className="space-y-2 border-l border-gray-200 ml-3">
            {section.links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    onClick={onLinkClick}
                    className={`flex items-center gap-2 px-3 py-2 rounded-r-lg transition-colors duration-200 -ml-[1px] ${
                      isActive
                        ? 'bg-amber-100 text-amber-700 font-semibold border-l-4 border-amber-500' // Added left border for active state
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}>
                      {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-amber-700' : 'text-gray-400'}`} />}
                      {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
