import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lachlan.xyz'
  
  // Get all blog posts
  const blogPostsDirectory = path.join(process.cwd(), 'src/app/blog/posts')
  const blogFileNames = fs.readdirSync(blogPostsDirectory)
  
  const blogPosts = blogFileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const fullPath = path.join(blogPostsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        url: `${baseUrl}/blog/${fileName.replace(/\.mdx$/, '')}`,
        lastModified: new Date(data.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })

  // Get all tutorial posts
  const tutorialsDirectory = path.join(process.cwd(), 'src/app/tutorials/posts')
  const tutorialCategories = fs.readdirSync(tutorialsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const tutorialPosts: MetadataRoute.Sitemap = []
  
  tutorialCategories.forEach(category => {
    const categoryDirectory = path.join(tutorialsDirectory, category)
    const tutorialFileNames = fs.readdirSync(categoryDirectory)
    
    tutorialFileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .forEach(fileName => {
        const fullPath = path.join(categoryDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        tutorialPosts.push({
          url: `${baseUrl}/tutorials/${category}/${fileName.replace(/\.mdx$/, '')}`,
          lastModified: new Date(data.date),
          changeFrequency: 'monthly' as const,
          priority: 0.8, // Tutorials get slightly higher priority
        })
      })
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
    ...tutorialPosts,
  ]
}
