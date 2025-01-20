import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogPostClient from './client'

async function getPost(slug: string) {
  const fullPath = path.join(process.cwd(), 'src/app/tutorials/posts', `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    metadata: data,
    content
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/app/tutorials/posts')
  const fileNames = fs.readdirSync(postsDirectory)
  
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => ({
      slug: fileName.replace(/\.mdx$/, ''),
    }))
}

interface PostMetadata {
  title: string;
  date: string;
  description?: string;
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)
  return <BlogPostClient 
    metadata={post.metadata as PostMetadata} 
    content={post.content}
    slug={params.slug} 
  /> }