'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Block from '../../components/block'
import { MDXProvider } from '@mdx-js/react';
import { useMDXComponents } from '../../../mdx-components';

interface BlogPostClientProps {
  metadata: {
    title: string
    date: string
  }
  slug: string
}

export default function BlogPostClient({ metadata, slug }: BlogPostClientProps) {
  const components = useMDXComponents({});
  const [PostContent, setPostContent] = useState<any>(null);

  useEffect(() => {
    import(`../posts/${slug}.mdx`)
      .then((module) => {
        setPostContent(() => module.default);
      })
      .catch((err) => {
        console.error('Error loading post:', err);
      });
  }, [slug]);

  return (
    <div className="min-h-screen relative">
      {/* Gradient background */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 after:absolute after:inset-0 after:bg-white/40"
        style={{
          transform: 'translateZ(0)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center">
          <Link href="/" className="text-white hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center">
              △
            </div>
          </Link>
        </nav>

        {/* Main content */}
        <main className="container mx-auto px-6 py-4 max-w-4xl">
          <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl border-2 border-transparent relative">
            <Link
              href="/tutorials"
              className="absolute top-6 right-6 text-white/80 w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-white/10 transition-colors text-2xl"
              aria-label="Back to tutorials"
            >
              ←
            </Link>
            <h1 className="text-3xl @md:text-5xl font-bold text-white mb-4">
                {metadata.title}
              </h1>
              <p className="text-white/80 text-sm mb-8">
                {new Date(metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            <hr className="my-4 border-t border-white/50 w-full" />
            <article className="prose prose-invert max-w-none">
              <MDXProvider components={components}>
                {PostContent && <PostContent />}
              </MDXProvider>
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}
