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
        
        {/* Header Section with Black Background */}
        <div className="relative">
          <div className="bg-black/90 backdrop-blur-md border-y border-white/10">
            <div className="container mx-auto px-6 py-16 max-w-7xl text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Thoughts on Product, Technology, and Building the Future
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="container mx-auto px-6 py-16 max-w-7xl">
          {/* Section divider */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full max-w-md"></div>
            <div className="mx-4 text-white/60 text-sm font-medium">Latest Posts</div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full max-w-md"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="bg-black/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30">
                  {/* Featured Image or Gradient */}
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <>
                        <img 
                          src={post.image} 
                          alt={post.imageAlt || post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-600/20 flex items-center justify-center">
                        <div className="text-4xl opacity-30">📝</div>
                      </div>
                    )}
                    
                    {/* Reading time badge */}
                    {post.readingTime && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                        {post.readingTime}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <time className="text-white/60 text-sm font-medium">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mt-2 mb-3 leading-tight group-hover:text-orange-400 transition-colors">
                      {post.title}
                    </h2>
                    
                    {/* Description */}
                    {post.description && (
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                    )}
                    
                    {/* Keywords/Tags */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.keywords.slice(0, 3).map((keyword: string, i: number) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded-md border border-white/10"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Hover arrow indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 text-white/80">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
            
            {posts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-white/80 text-lg italic">
                  No blog posts yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 