/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogPostClient from './client'

// Generate static parameters for pre-rendering
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/app/tutorials/posts')
  const folders = fs.readdirSync(postsDirectory)
  
  const params = []
  for (const folder of folders) {
    const folderPath = path.join(postsDirectory, folder)
    if (fs.statSync(folderPath).isDirectory()) {
      const fileNames = fs.readdirSync(folderPath)
      params.push(...fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => ({
          slug: [folder, fileName.replace(/\.mdx$/, '')],
        })))
    }
  }
  
  return params
}

// Ensure dynamic params are disabled for full static generation
export const dynamicParams = false

interface Frontmatter {
  title: string;
  date: string;
}

// The page component for rendering a specific post
export default async function Page({ params }: { params: { slug: string[] } }) {
  const [folder, slug] = params.slug
  const filePath = path.join(process.cwd(), `src/app/tutorials/posts/${folder}/${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')

  // Use `gray-matter` to parse frontmatter and content
  const { data } = matter(fileContents) as unknown as { data: Frontmatter }

  return (
    <div>
      <BlogPostClient metadata={data} slug={slug} folder={folder} />
    </div>
  )
} 