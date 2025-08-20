/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogPostClient from './client'
import type { Metadata } from 'next'

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
  description?: string;
  keywords?: string[];
  author?: string;
  readingTime?: string;
  image?: string;
  imageAlt?: string;
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const filePath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents) as unknown as { data: Frontmatter }

  const title = `${data.title} | Lachlan Chavasse`
  const description = data.description || 'A blog post by Lachlan Chavasse'
  const image = data.image ? `https://lachlanchavasse.com${data.image}` : undefined

  return {
    title,
    description,
    keywords: data.keywords,
    authors: [{ name: data.author || 'Lachlan Chavasse' }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: data.date,
      authors: [data.author || 'Lachlan Chavasse'],
      images: image ? [{ url: image, alt: data.imageAlt || data.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: `https://lachlan.xyz/blog/${slug}`,
    },
  }
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
