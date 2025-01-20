import type { MDXComponents } from 'mdx/types'
import { ComponentProps } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override pre and code blocks for syntax highlighting
    pre: (props: ComponentProps<'pre'>) => (
      <pre {...props} className="my-4 rounded-lg overflow-hidden" />
    ),
    code: (props: ComponentProps<'code'>) => {
      const language = props.className?.replace('language-', '') || 'text'
      return (
        <code
          {...props}
          className={`language-${language} p-4 bg-white/10 backdrop-blur-sm overflow-x-auto block`}
        />
      )
    },
    // Add Notion-like styling for other elements
    h1: (props: ComponentProps<'h1'>) => (
      <h1 {...props} className="text-3xl font-bold text-white mt-8 mb-4" />
    ),
    h2: (props: ComponentProps<'h2'>) => (
      <h2 {...props} className="text-2xl font-semibold text-white mt-6 mb-3" />
    ),
    h3: (props: ComponentProps<'h3'>) => (
      <h3 {...props} className="text-xl font-semibold text-white mt-4 mb-2" />
    ),
    p: (props: ComponentProps<'p'>) => (
      <p {...props} className="text-white/80 mb-4 leading-relaxed" />
    ),
    ul: (props: ComponentProps<'ul'>) => (
      <ul {...props} className="list-disc list-inside text-white/80 mb-4 space-y-2" />
    ),
    ol: (props: ComponentProps<'ol'>) => (
      <ol {...props} className="list-decimal list-inside text-white/80 mb-4 space-y-2" />
    ),
    li: (props: ComponentProps<'li'>) => (
      <li {...props} className="text-white/80" />
    ),
    blockquote: (props: ComponentProps<'blockquote'>) => (
      <blockquote
        {...props}
        className="border-l-4 border-white/20 pl-4 my-4 text-white/70 italic"
      />
    ),
    ...components,
  }
} 