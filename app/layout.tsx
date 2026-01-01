import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dhruv Ghosh | Math + AI @ CMU',
  description: 'Personal portfolio of Dhruv Ghosh - Mathematics and Artificial Intelligence student at Carnegie Mellon University. Interested in AI/ML, Quantitative Finance, and Software Engineering.',
  keywords: ['Dhruv Ghosh', 'CMU', 'Carnegie Mellon', 'AI', 'Machine Learning', 'Quantitative Finance', 'Software Engineering', 'Portfolio'],
  authors: [{ name: 'Dhruv Ghosh' }],
  openGraph: {
    title: 'Dhruv Ghosh | Math + AI @ CMU',
    description: 'Mathematics and Artificial Intelligence student at Carnegie Mellon University',
    url: 'https://dhruvghosh.com',
    siteName: 'Dhruv Ghosh',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhruv Ghosh | Math + AI @ CMU',
    description: 'Mathematics and Artificial Intelligence student at Carnegie Mellon University',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body className="font-satoshi bg-primary text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}

