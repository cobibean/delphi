'use client';

import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';

interface NFTPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  backButtonUrl?: string;
}

export function NFTPageLayout({
  children,
  title,
  description,
  showBackButton = false,
  backButtonUrl = '/',
}: NFTPageLayoutProps) {
  return (
    <main className="bg-oracle-black min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            {showBackButton && (
              <Link 
                href={backButtonUrl}
                className="inline-flex items-center text-oracle-white hover:text-oracle-orange transition-colors mb-6"
              >
                <FiChevronLeft className="mr-2" />
                <span>Back</span>
              </Link>
            )}
            
            <h1 className="font-heading text-4xl text-oracle-orange mb-3">{title}</h1>
            {description && (
              <p className="text-oracle-white/70 max-w-2xl">{description}</p>
            )}
          </header>
          
          {/* Content */}
          {children}
        </div>
      </div>
    </main>
  );
} 