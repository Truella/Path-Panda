'use client';
import DocsSidebar from "../../../../components/docs/DocsSidebar";
import OnThisPageSidebar from "../../../../components/docs/OnThisPageSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-12">
        {/* Left Sidebar - Main Navigation */}
        <aside className="col-span-2 p-8 border-r">
          <div className="sticky top-8">
            <DocsSidebar />
          </div>
        </aside>

        {/* Center - Main Content */}
        <main className="col-span-8 p-8">
          {children}
        </main>

        {/* Right Sidebar - On This Page */}
        <aside className="col-span-2 p-8 border-l">
          <div className="sticky top-8">
            <OnThisPageSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}
