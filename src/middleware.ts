import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a simple password protection.
// In a production environment, you'd want to use a proper authentication system.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-secure-password'

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      })
    }
    
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')
    
    if (password !== ADMIN_PASSWORD) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 