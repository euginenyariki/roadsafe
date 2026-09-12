import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RoadSafe Admin | Dashboard',
  description: 'RoadSafe Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
