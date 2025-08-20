import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts')
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
        description: metadata.description || '',
        readingTime: metadata.readingTime || '',
        keywords: metadata.keywords || [],
        author: metadata.author || '',
        image: metadata.image || '',
        imageAlt: metadata.imageAlt || '',
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
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
              Blog:
            </h1>
            
            <div className="space-y-8">
              {posts.map(post => (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="p-6 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <h2 className="text-xl @md:text-2xl font-semibold text-white mb-2">
                      {post.title}
                    </h2>
                    <p className="text-white/80 text-sm mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      {post.readingTime && (
                        <span className="ml-2 text-white/60">• {post.readingTime}</span>
                      )}
                    </p>
                    {post.description && (
                      <p className="text-white/80 italic">
                        {post.description}
                      </p>
                    )}
                  </article>
                </Link>
              ))}
              
              {posts.length === 0 && (
                <p className="text-white/80 italic">
                  No blog posts yet. Check back soon!
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 