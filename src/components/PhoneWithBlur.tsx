'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ProgressiveBlur } from './ui/progressblur'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ArrowUpLeftIcon,
  ArrowDownRightIcon,
  ArrowDownLeftIcon,
} from '@heroicons/react/20/solid'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

// Custom SVG Icons for Blur Curve
const LinearCurveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "w-5 h-5"}>
    <line x1="4" y1="20" x2="20" y2="4" />
  </svg>
);

const SmoothCurveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "w-5 h-5"}>
    <path d="M4 12s4-8 8-8 8 8 8 8" />
  </svg>
);

const ExponentialCurveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "w-5 h-5"}>
    <path d="M4 20c8 0 10-16 16-16" />
  </svg>
);

export default function PhoneWithBlur() {
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [blurIntensity, setBlurIntensity] = useState(2)
  const [showIntensityTooltip, setShowIntensityTooltip] = useState(false)
  type CurveType = 'linear' | 'smooth' | 'exponential';
  const [curve, setCurve] = useState<CurveType>('smooth')
  type BlurDirectionType = 'to top' | 'to bottom' | 'to left' | 'to right' | 'to top right' | 'to top left' | 'to bottom right' | 'to bottom left';
  const [blurDirection, setBlurDirection] = useState<BlurDirectionType>('to top')
  const [snippetShown, setSnippetShown] = useState(false)

  const directionOptions: BlurDirectionType[] = [
    'to top', 'to bottom', 'to left', 'to right',
    'to top right', 'to top left', 'to bottom right', 'to bottom left',
  ]

  const curveOptions: CurveType[] = ['linear', 'smooth', 'exponential'];

  const directionIconMap: Record<BlurDirectionType, React.ElementType> = {
    'to top': ArrowUpIcon,
    'to bottom': ArrowDownIcon,
    'to left': ArrowLeftIcon,
    'to right': ArrowRightIcon,
    'to top right': ArrowUpRightIcon,
    'to top left': ArrowUpLeftIcon,
    'to bottom right': ArrowDownRightIcon,
    'to bottom left': ArrowDownLeftIcon,
  };

  const curveIconMap: Record<CurveType, React.ElementType> = {
    linear: LinearCurveIcon,
    smooth: ExponentialCurveIcon,
    exponential: SmoothCurveIcon,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsOpen &&
        panelRef.current && !panelRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [settingsOpen])

  useEffect(() => {
    const handlePointerUp = () => setShowIntensityTooltip(false)
    document.addEventListener('pointerup', handlePointerUp)
    return () => document.removeEventListener('pointerup', handlePointerUp)
  }, [])

  return (
    <div className="relative">
      {/* Main Phone Structure */}
      <div
        className="relative flex flex-col w-[90vw] max-w-[362px] aspect-[362/392] rounded-[22px] overflow-hidden outline-2 outline-black/6"
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
              <Image src="/statusbaricons.svg" alt="Status Icons" width={70} height={22} />
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full h-[90px]">
          <ProgressiveBlur intensity={blurIntensity} curve={curve} direction={blurDirection} className="absolute left-0 top-0 w-full h-[90px] z-1" />
        </div>
        {/* Prop Snippet */}
        <AnimatePresence>
          {snippetShown && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-[95px] left-1/2 transform -translate-x-1/2 p-3 rounded-md bg-white/70 backdrop-blur-sm outline-1 outline-black/6 z-10"
            >
              <code className="text-xs font-mono text-gray-600">
                {`intensity={${blurIntensity}} curve='${curve}' direction='${blurDirection}'`}
              </code>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Bottom Label */}
        <div className="absolute bottom-0 left-0 w-full h-[84px] bg-white rounded-b-[22px] px-12 z-1 flex flex-col justify-center items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                ref={buttonRef}
                onClick={() => setSettingsOpen(!settingsOpen)}
                aria-label="Settings"
                className={`group absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none transition-colors duration-150 ${settingsOpen ? 'bg-gray-100 outline-1 outline-black/6' : 'hover:bg-gray-100'}`}
              >
                <Cog6ToothIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-600 transition-colors duration-150" aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
          <span className={`${inter.className} font-bold text-[17px] leading-[22px] text-black w-[147px] h-[22px] flex items-center justify-center`}>
            Progressiveblurcn
          </span>
        </div>
        {/* Rest of the phone content can go here */}
      </div>

      {/* Settings Panel - Moved outside the phone div with overflow-hidden */}
      <AnimatePresence>
        {settingsOpen && (
          <TooltipProvider delayDuration={900}>
            <motion.div ref={panelRef}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute top-full left-1/2 mt-2 w-[90vw] max-w-[320px] transform -translate-x-1/2 bg-white rounded-xl shadow-lg z-43 overflow-hidden outline-1 outline-black/6 md:top-[350px] md:left-auto md:right-full md:mt-0 md:mr-2 md:-translate-y-1/2 md:translate-x-0 md:w-[320px]"
            >
              {/* Blur Intensity Row */}
              <div className="flex justify-between items-center px-4 py-3 min-h-[44px] border-b border-gray-200">
                <span className="text-sm text-gray-800 font-medium">Blur Intensity</span>
                <div className="flex items-center w-1/2 ml-4 relative">
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={blurIntensity}
                    onChange={(e) => { setBlurIntensity(parseFloat(e.target.value)); setSnippetShown(true); }}
                    onPointerDown={() => setShowIntensityTooltip(true)}
                    className="flex-1 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                  />
                  {showIntensityTooltip && (
                    <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-800 bg-white outline-1 outline-black/6 rounded-full px-2 py-1">
                      {blurIntensity}
                    </div>
                  )}
                </div>
              </div>

              {/* Blur Curve Row */}
              <div className="flex justify-between items-center px-4 py-3 min-h-[44px] border-b border-gray-200">
                <span className="text-sm text-gray-800 font-medium">Blur Curve</span>
                <div className="flex gap-1.5">
                  {curveOptions.map((curveOpt) => {
                    const Icon = curveIconMap[curveOpt];
                    return (
                      <Tooltip key={curveOpt}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => { setCurve(curveOpt); setSnippetShown(true); }}
                            className={`p-1.5 rounded-lg transition-colors duration-150 ${
                              curve === curveOpt
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                            aria-label={`Set curve to ${curveOpt}`}
                          >
                            <Icon className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Blur Curve: {curveOpt}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>

              {/* Blur Direction Row */}
              <div className="px-4 py-3 min-h-[44px]">
                <span className="block text-sm text-gray-800 font-medium mb-2">Blur Direction</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {directionOptions.map((dirOpt) => {
                    const Icon = directionIconMap[dirOpt];
                    const isDiagonal = ['to top right','to top left','to bottom right','to bottom left'].includes(dirOpt);
                    return (
                      <Tooltip key={dirOpt}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => { setBlurDirection(dirOpt); setSnippetShown(true); }}
                            className={`p-1.5 rounded-lg transition-colors duration-150 flex justify-center items-center ${
                              blurDirection === dirOpt
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                            aria-label={`Set direction to ${dirOpt}`}
                          >
                            <Icon className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side={isDiagonal ? 'bottom' : undefined}>
                          <p>Blur Direction: {dirOpt}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </TooltipProvider>
        )}
      </AnimatePresence>
    </div>
  )
}
