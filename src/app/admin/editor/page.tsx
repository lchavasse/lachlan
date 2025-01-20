'use client'

import { useState } from 'react'
import Link from 'next/link'
import Block from '../../components/block'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

// Create markdown processor
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypePrettyCode, {
    theme: 'github-dark'
  })
  .use(rehypeStringify)

export default function Editor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [previewContent, setPreviewContent] = useState<string>('')
  
  // Update preview when content changes
  const updatePreview = async (newContent: string) => {
    setContent(newContent)
    try {
      if (!newContent) {
        setPreviewContent('')
        return
      }
      
      const result = await processor.process(newContent)
      setPreviewContent(String(result))
    } catch (error) {
      console.error('Error processing markdown:', error)
      setPreviewContent(`Error: ${(error as Error).message}`)
    }
  }
  
  const handleSave = async () => {
    if (!title || !content) {
      setMessage('Please fill in both title and content')
      return
    }
    
    setIsSaving(true)
    setMessage('')
    
    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      const date = new Date().toISOString().split('T')[0]
      const mdxContent = `export default function Post() {
  return (
    <>
      export const metadata = {
        title: "${title}",
        date: "${date}",
        description: "${content.split('\n')[0]}"
      }

      ${content}
    </>
  )
}`
      
      const response = await fetch('/api/blog/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          content: mdxContent,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to save')
      }
      
      setMessage('Saved successfully!')
      // Don't clear the form to allow for further editing
    } catch (error) {
      setMessage('Error saving post: ' + (error as Error).message)
    } finally {
      setIsSaving(false)
    }
  }
  
  return (
    <div className="min-h-screen relative">
      {/* Gradient background */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 after:absolute after:inset-0 after:bg-white/25"
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
          <div className="flex gap-4">
            <Link
              href="/blog"
              className="text-white hover:opacity-80 transition-opacity"
            >
              View Blog
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded text-white transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </nav>
        
        {/* Main content */}
        <main className="container mx-auto px-6 py-12">
          <Block>
            <div className="space-y-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
                className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Editor */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Editor</h2>
                  <div className="text-sm text-white/70 space-y-2">
                    <p>Write your post in MDX format. Some tips:</p>
                    <ul className="list-disc list-inside">
                      <li>Use # for headings (# H1, ## H2, etc)</li>
                      <li>Use ```language for code blocks (```python, ```typescript)</li>
                      <li>Use * or _ for *italic* and **bold**</li>
                      <li>Use - or * for bullet points</li>
                    </ul>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => updatePreview(e.target.value)}
                    placeholder="Write your post in MDX..."
                    className="w-full h-[500px] px-4 py-2 bg-white/10 backdrop-blur-sm rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 font-mono"
                  />
                </div>
                
                {/* Preview */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Preview</h2>
                  <div className="w-full h-[560px] px-4 py-2 bg-white/10 backdrop-blur-sm rounded text-white overflow-auto">
                    <div className="prose prose-invert max-w-none">
                      <div 
                        className="markdown-body"
                        dangerouslySetInnerHTML={{ __html: previewContent }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {message && (
                <p className={`text-sm ${message.includes('Error') ? 'text-red-300' : 'text-green-300'}`}>
                  {message}
                </p>
              )}
            </div>
          </Block>
        </main>
      </div>
    </div>
  )
} 