'use client'

import Link from 'next/link'
import Image from 'next/image'
import Block from './components/block'
import Social, { icons } from './components/social'
import { useState, useEffect } from 'react'

// Hook to check if we're on mobile
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const maxSize = 192 // w-48 = 192px
  const minSize = 80 // 20px padding on each side = 80px total
  const scrollThreshold = 10 // how many pixels to scroll before reaching min size
  
  const size = Math.max(
    minSize,
    maxSize - (scrollY / scrollThreshold) * (maxSize - minSize)
  )
  const innerSize = size - 16 // 8px padding on each side

  const maxSpacing = 88 // 12 * 4 = 48px (space-y-12)
  const minSpacing = 20 // slight overlap
  const spacing = Math.max(
    minSpacing,
    maxSpacing - (scrollY / scrollThreshold) * (maxSpacing - minSpacing)
  )

  // Calculate opacity for descriptive text
  const textOpacity = Math.min(1, scrollY / scrollThreshold)

  return (
    <div className="min-h-screen relative">
      {/* Gradient background with parallax effect */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 after:absolute after:inset-0 after:bg-white/25"
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
          {/*}
          <div className="flex gap-6">
            <Link href="/work" className="text-white hover:opacity-80 transition-opacity">
              Work
            </Link>
            <Link href="/about" className="text-white hover:opacity-80 transition-opacity">
              About
            </Link>
          </div>
          */}
        </nav>

        {/* Main content */}
        <main className="container flex flex-col items-center mx-auto px-6 py-2 pb-12">
          <div className="min-w-[80%] max-w-[80%]">
            {/* Profile Picture */}
            <div 
              className="mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-200 relative z-10"
              style={{ 
                width: size, 
                height: size,
              }}
            >
              <div 
                className="rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden transition-all duration-200"
                style={{ width: innerSize, height: innerSize }}
              >
                <Image
                  src="/me.png"
                  alt="Lachlan Chavasse"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            {/* Content wrapper with dynamic spacing */}
            <div style={{ marginTop: spacing - 48 }} className="space-y-12">
              {/* Hero section */}
              <Block>
                <h1 className="text-3xl @md:text-5xl font-bold italic text-white mb-4 font-sans">
                  {"Hello, I'm Lachlan."}
                </h1>
                <div 
                  className="transition-all duration-500 ease-out overflow-hidden"
                  style={{ 
                    opacity: isDesktop ? 1 : textOpacity,
                    transform: isDesktop ? 'none' : `translateY(${(1 - textOpacity) * -20}px)`,
                    maxHeight: isDesktop ? 'none' : `${textOpacity * 220}px`,
                    visibility: textOpacity === 0 && !isDesktop ? 'hidden' : 'visible'
                  }}
                >
                  <p className="text-white/80 font-bold">
                    Operator. Creator. Innovator.
                  </p>
                  <p className="text-white/80 italic">
                    Curating choice in the age of AI @ daily. <br />
                    Building custom AI tools to help individuals and businesses.
                  </p>
                </div>
              </Block>

              {/* Social Icons */}
              <div className="flex justify-center gap-6">
                <Social link="https://linkedin.com/in/lchavasse">{icons.linkedin}</Social>
                <Social link="https://medium.com/@lachlan.chavasse">{icons.medium}</Social>
                <Social link="mailto:lachlan.chavasse@gmail.com">{icons.mail}</Social>
                <Social link="/cv.pdf" className="hidden md:flex">{icons.cv}</Social>
              </div>

              {/* Daily */}
              <Block>
                <a href="https://daily.lachlan.xyz/" target="_blank" rel="noopener noreferrer">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">daily.</h2>
                  <p className="text-white/80 italic">
                    An AI powered diary that helps you reflect, learn, and grow.
                  </p>
                </a>
              </Block>

              {/* Review */}
              <Block>
                <a href="https://review-analyzer.lachlan.xyz/" target="_blank" rel="noopener noreferrer">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Review Analyzer</h2>
                  <p className="text-white/80 italic">
                    An simple tool to scrape and filter app store reviews and analyze with AI.
                  </p>
                </a>
              </Block>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}