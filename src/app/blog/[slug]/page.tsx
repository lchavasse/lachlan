/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogPostClient from './client'

// Generate static parameters for pre-rendering
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts')
  const fileNames = fs.readdirSync(postsDirectory)

  // Extract slugs from file names
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx$/, ''), // Remove the `.mdx` extension
    }))
}

// Ensure dynamic params are disabled for full static generation
export const dynamicParams = false

interface Frontmatter {
  title: string;
  date: string;
}

// The page component for rendering a specific post
export default async function Page(props: any) {
  const params = await props.params
  const slug = params.slug
  const filePath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')

  // Use `gray-matter` to parse frontmatter and content
  const { data } = matter(fileContents) as unknown as { data: Frontmatter }

  return (
    <div>
      <BlogPostClient metadata={data} slug={slug} />
    </div>
  )
}
