'use client'

import Link from 'next/link'
import Block from '../../components/block'
import { MDXProvider } from '@mdx-js/react'
import components from '../posts/mdx-components'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { createElement, Fragment, useEffect, useState } from 'react'

interface BlogPostClientProps {
  metadata: {
    title: string
    date: string
  }
  content: string
  slug: string
}

export default function BlogPostClient({ metadata, content, slug }: BlogPostClientProps) {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    async function compileMDX() {
      try {
        const { default: Content } = await evaluate(content, {
          ...runtime,
          useMDXComponents: () => components
        })
        setMDXContent(() => Content)
      } catch (error) {
        console.error('Error compiling MDX:', error)
      }
    }
    
    compileMDX()
  }, [content])

  if (!MDXContent) {
    return <div>Loading...</div>
  }
  
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
          <Link
            href="/tutorials"
            className="text-white hover:opacity-80 transition-opacity"
          >
            Back to Tutorials
          </Link>
        </nav>
        
        {/* Main content */}
        <main className="container mx-auto px-6 py-12 max-w-4xl">
          <Block>
            <article className="prose prose-invert max-w-none">
              <h1 className="text-3xl @md:text-5xl font-bold italic text-white mb-4">
                {metadata.title}
              </h1>
              <p className="text-white/80 text-sm mb-8">
                {new Date(metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              
              <MDXProvider components={components}>
                <MDXContent />
              </MDXProvider>
            </article>
          </Block>
        </main>
      </div>
    </div>
  )
} 