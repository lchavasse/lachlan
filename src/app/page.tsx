import Link from 'next/link'
import Block from './components/block'
import Social, { icons } from './components/social'
export default function Component() {
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
        <main className="container flex flex-col items-center mx-auto px-6 py-4 md:py-8">
          <div className="min-w-[60%] max-w-[80%] space-y-12">
            {/* Hero section */}
            <Block>
              <h1 className="text-3xl @md:text-5xl font-bold text-white mb-4 font-sans">
                {"Hello, I'm Lachlan."}
              </h1>
              <p className="text-white/80 font-bold">
                Operator. Creator. Innovator.
              </p>
              <p className="text-white/80 italic">
                Enhancing user experiences by developing user-centric products and leveraging cutting-edge technologies.
              </p>
            </Block>

            {/* Social Icons */}
            <div className="flex justify-center gap-6">
              <Social link="https://linkedin.com/in/lchavasse">{icons.linkedin}</Social>
              <Social link="https://medium.com/@lachlan.chavasse">{icons.medium}</Social>
              <Social link="mailto:lachlan.chavasse@gmail.com">{icons.mail}</Social>
              <Social link="/cv.pdf" className="hidden md:block">{icons.cv}</Social>
            </div>

            {/* Daily */}
            <Block>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">daily.</h2>
              <p className="text-white/80 italic">
                An AI powered diary that helps you reflect, learn, and grow.
              </p>
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
        </main>
      </div>
    </div>
  )
}