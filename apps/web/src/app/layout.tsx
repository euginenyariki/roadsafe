import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RoadSafe | Roadside Assistance',
  description: 'Get verified roadside assistance near you, see the price, track the provider and pay securely.',
  keywords: ['roadside assistance', 'Kenya', 'mechanic', 'towing', 'fuel delivery', 'battery'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
