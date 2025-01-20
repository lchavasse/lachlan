import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json()
    
    if (!slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Ensure the blog directory exists
    const blogDir = path.join(process.cwd(), 'src/app/blog/posts')
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true })
    }
    
    // Write the file
    const filePath = path.join(blogDir, `${slug}.mdx`)
    fs.writeFileSync(filePath, content)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving blog post:', error)
    return NextResponse.json(
      { error: 'Failed to save blog post' },
      { status: 500 }
    )
  }
} 