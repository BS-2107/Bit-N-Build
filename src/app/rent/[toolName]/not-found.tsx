import React from 'react';
import Link from 'next/link';
import { Header } from '../../../../components/layout/Header';
import { Button } from '../../../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="modern-card p-12 text-center fade-in">
              <div className="text-8xl mb-6">🔍</div>
              <h1 className="text-4xl font-bold text-gray-100 mb-4">Tool Not Found</h1>
              <p className="text-gray-300 mb-8 text-lg">
                The tool you're looking for doesn't exist or may have been moved.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/browse">
                  <Button variant="primary">
                    🔍 Browse All Tools
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="secondary">
                    🏠 Go Home
                  </Button>
                </Link>
              </div>
              
              {/* Popular Tools Suggestions */}
              <div className="mt-12 text-left">
                <h3 className="text-xl font-semibold text-gray-100 mb-6 text-center">
                  Popular Tools You Might Like
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: 'Adobe Photoshop', price: '₹59/hr' },
                    { name: 'Figma Pro', price: '₹35/hr' },
                    { name: 'ChatGPT Plus', price: '₹29/hr' }
                  ].map((tool, index) => (
                    <Link key={index} href={`/rent/${encodeURIComponent(tool.name)}`}>
                      <div className="modern-card p-4 hover:scale-105 transition-transform cursor-pointer">
                        <h4 className="font-semibold text-gray-100">{tool.name}</h4>
                        <p className="text-accent font-bold">{tool.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
