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
      { title: 'Options', href: '/docs/configuration', icon: Sliders },
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

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav>
      {navigation.map((section) => (
        <div key={section.title} className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {section.title}
          </h4>
          <ul className="space-y-2">
            {section.links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link href={link.href} className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-amber-100 text-amber-700 font-semibold'
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
