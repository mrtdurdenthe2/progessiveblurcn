'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ProgressiveBlur } from './ui/progressblur'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

const inter = Inter({ subsets: ['latin'] })

export default function PhoneWithBlur() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [blurIntensity, setBlurIntensity] = useState(2)
  const [curve, setCurve] = useState<'linear' | 'smooth' | 'exponential'>('smooth')
  return (
    <div
      className="relative flex flex-col w-[362px] h-[392px] rounded-[22px] overflow-hidden outline outline-1 outline-black/6"
      style={{ backgroundImage: "url('/placeholder-map-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Status Bar */}
      <div className="flex flex-col items-start px-0 pt-[21px] w-full h-[56px] z-2">
        <div className="flex flex-row justify-between items-center w-full h-[22px] px-[25px]">
          {/* Time */}
          <span className={`${inter.className} font-medium text-[17px] leading-[22px] text-black antialiased`}>
            9:41
          </span>
          {/* Status Bar Icons */}
          <div className="flex flex-row justify-center items-center">
            <Image src="/statusbaricons.svg" alt="Status Icons" width={20} height={13} className="h-[13px]" />
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-full h-[90px]">
        <ProgressiveBlur intensity={blurIntensity} curve={curve} overlayColor="transparent" direction="to top" className="absolute left-0 top-0 w-full h-[90px] z-1" />
      </div>
      {/* Bottom Label */}
      <div className="absolute bottom-0 left-0 w-full h-[84px] bg-white rounded-b-[22px] z-1 flex justify-center items-center">
        <button
          type="button"
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-label="Settings"
          className="group absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors duration-150"
        >
          <Cog6ToothIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-600 transition-colors duration-150" aria-hidden="true" />
        </button>
        <span className={`${inter.className} font-bold text-[17px] leading-[22px] text-black w-[147px] h-[22px] flex items-center justify-center`}>
          Progressiveblurcn
        </span>
        <AnimatePresence>
          {settingsOpen && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-[320px] p-4 bg-white rounded-lg shadow-lg z-10"
            >
              <label className="flex flex-col gap-1 mb-2">
                <span className="text-sm font-medium">Blur Intensity</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.1}
                  value={blurIntensity}
                  onChange={(e) => setBlurIntensity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">Blur Curve</span>
                <select
                  value={curve}
                  onChange={(e) => setCurve(e.target.value as 'linear' | 'smooth' | 'exponential')}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  <option value="linear">Linear</option>
                  <option value="smooth">Smooth</option>
                  <option value="exponential">Exponential</option>
                </select>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Rest of the phone content can go here */}
    </div>
  )
}
