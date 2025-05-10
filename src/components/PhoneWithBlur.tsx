'use client'

import { Inter } from 'next/font/google'
import { ProgressiveBlur } from './ui/progressblur'


const inter = Inter({ subsets: ['latin'] })

export default function PhoneWithBlur() {
  return (
    <div
      className="relative flex flex-col w-[362px] h-[392px] rounded-[22px] overflow-hidden"
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
            <img src="/statusbaricons.svg" alt="Status Icons" className="h-[13px]" />
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-full h-[90px]">
        <ProgressiveBlur intensity={2} curve="smooth" overlayColor="transparent" direction="to top" className="absolute left-0 top-0 w-full h-[90px] z-1" />
      </div>
      {/* Rest of the phone content can go here */}
    </div>
  )
}
