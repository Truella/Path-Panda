import '../../globals.css'; // Import global CSS relative to app directory

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
