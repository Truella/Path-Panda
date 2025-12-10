'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Heading {
  id: string;
  text: string;
  tagName: string;
}

export default function OnThisPageSidebar({ onLinkClick }: { onLinkClick?: () => void }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      const headingElements = Array.from(
        document.querySelectorAll('main h2, main h3') 
      ) as HTMLHeadingElement[];

      const headingData = headingElements
        .map((heading) => ({
          id: heading.id,
          text: heading.innerText,
          tagName: heading.tagName,
        }))
        .filter((heading) => heading.text !== 'On This Page');

      setHeadings(headingData);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <nav className="pt-4">
        <h3 className="font-semibold text-lg mb-4 pl-2 text-[#2d2d2f]">On This Page</h3>
        <ul className="space-y-2 border-l border-gray-200 ml-3">
            {headings.map((heading) => (
            <li key={heading.id}>
                <Link
                  href={`#${heading.id}`}
                  onClick={onLinkClick}
                  className={`block px-3 py-1 text-sm transition-colors duration-200 -ml-[1px] ${
                    heading.tagName === 'H3' ? 'ml-3' : '' 
                  }
                  ${
                    window.location.hash === `#${heading.id}`
                      ? 'text-amber-700 font-semibold border-l-4 border-amber-500' 
                      : 'text-gray-600 hover:text-amber-700 hover:border-l-4 hover:border-gray-300' 
                  }`}
                >
                    {heading.text}
                </Link>
            </li>
            ))}
        </ul>
    </nav>
  );
}
