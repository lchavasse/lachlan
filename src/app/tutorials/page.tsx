import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function getBlogPosts(folder: string) {
  const postsDirectory = path.join(process.cwd(), `src/app/tutorials//posts/${folder}`)
  const fileNames = fs.readdirSync(postsDirectory)
  
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Use gray-matter to parse frontmatter
      const { data: metadata } = matter(fileContents)
      
      return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: metadata.title,
        date: metadata.date,
        description: metadata.description,
      }
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  return posts
}

export default async function BlogPage() {
  const langgraphPosts = await getBlogPosts('langgraph')
  
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
        <main className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl border-2 border-transparent 
             transition-all duration-300 ease-in-out
             text-lg md:text-xl">
            <h1 className="text-3xl @md:text-5xl font-bold pl-6 text-white mb-8">
              LangGraph Tutorial:
            </h1>
            <p className="text-white/60 pl-6 mb-6">
            An introduction to building agentic systems in Python with LangGraph and LiveKit.<br />
            The course:
            </p>
            
            <div className="space-y-2 flex flex-col gap-2 max-w-2xl ml-6">
              {langgraphPosts.map((post, index) => (
                <Link 
                  key={post.slug}
                  href={`/tutorials/langgraph/${post.slug}`}
                  className="block group"
                >
                  <article className="pl-4 p-1 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors border border-white/10 flex gap-6 items-bottom">
                    <div className="text-white/50 font-mono text-sm pt-1">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h2 className="text-xl @md:text-2xl font-semibold text-white mb-2">
                        {post.title}
                      </h2>
                      {/*
                      <p className="text-white/60">
                        {post.description}
                      </p>
                      */}
                    </div>
                  </article>
                </Link>
              ))}
              
              {langgraphPosts.length === 0 && (
                <p className="text-white/80 italic">
                  No tutorials yet. Check back soon!
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 