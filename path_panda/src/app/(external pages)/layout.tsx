import Header from './components/Header';
import '../globals.css';
import Footer from './components/Footer';

export const metadata = {
  title: 'PathPanda External Pages',
  description: 'Landing and info pages',
};

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
