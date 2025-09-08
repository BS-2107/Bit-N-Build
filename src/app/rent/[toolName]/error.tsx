'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../../../components/layout/Header';
import { Button } from '../../../../components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="modern-card p-12 text-center fade-in">
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="text-4xl font-bold text-gray-100 mb-4">Something went wrong!</h1>
              <p className="text-gray-300 mb-8 text-lg">
                We encountered an error while loading this tool. Please try again.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={reset} variant="primary">
                  Try Again
                </Button>
                <Link href="/browse">
                  <Button variant="secondary">
                    ← Browse All Tools
                  </Button>
                </Link>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-8 text-left bg-red-50 p-4 rounded-lg">
                  <summary className="cursor-pointer font-semibold text-red-700">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 text-sm text-red-600 whitespace-pre-wrap">
                    {error.message}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
