'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Heading {
  id: string;
  text: string;
  tagName: string; // To differentiate between h2, h3, etc.
}

export default function OnThisPageSidebar() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    // Wrap in a timeout to avoid synchronous setState error during render
    const timeoutId = setTimeout(() => {
      const headingElements = Array.from(
        document.querySelectorAll('main h2, main h3') // Query for h2 and h3
      ) as HTMLHeadingElement[];

      const headingData = headingElements.map((heading) => ({
        id: heading.id,
        text: heading.innerText,
        tagName: heading.tagName,
      }));

      setHeadings(headingData);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <nav>
        <h3 className="font-semibold text-lg mb-4 text-[#2d2d2f]">On This Page</h3>
        <ul className="space-y-2">
            {headings.map((heading) => (
            <li key={heading.id}>
                <Link
                  href={`#${heading.id}`}
                  className={`block text-sm text-gray-500 hover:text-amber-700 transition-colors duration-200 ${
                    heading.tagName === 'H3' ? 'ml-4' : '' 
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
