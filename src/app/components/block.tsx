'use client'

import { motion } from 'framer-motion'

interface BlockProps {
  children: React.ReactNode;
}

export default function Block({ children }: BlockProps) {
  return <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-black/80 backdrop-blur-md p-8 rounded-xl border-2 border-transparent 
             transition-all duration-300 ease-in-out
             text-lg md:text-xl
             hover:scale-120
             hover:shadow-[0_0_15px_rgba(0,100,255,0.7)]  hover:border-blue-400
             @container"
  >
    {children}
  </motion.div>
}