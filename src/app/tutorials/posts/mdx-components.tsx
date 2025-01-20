import { ComponentProps } from 'react'

const components = {
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
  pre: ({ children, ...props }: ComponentProps<'pre'>) => (
    <pre
      {...props}
      className="my-4 rounded-lg overflow-x-auto bg-[#0d1117] p-4 text-sm"
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }: ComponentProps<'code'>) => {
    // If it's a code block (has className from rehype-pretty-code)
    if (className) {
      return (
        <code {...props} className={className}>
          {children}
        </code>
      )
    }
    // If it's an inline code block
    return (
      <code {...props} className="font-mono text-white/90 bg-white/10 rounded px-1">
        {children}
      </code>
    )
  },
}

export default components 