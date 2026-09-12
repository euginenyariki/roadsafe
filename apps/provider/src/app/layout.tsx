import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RoadSafe Provider | Dashboard',
  description: 'RoadSafe Provider Dashboard',
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
