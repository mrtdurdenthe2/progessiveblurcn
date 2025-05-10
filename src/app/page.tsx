
import { Inter } from "next/font/google";

// Lazy import to prevent SSR issues for WebGL component

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen p-8 gap-[133px]">
      {/* Phone Mockup 1 */}
      <div
        className="relative flex flex-col w-[362px] h-[392px] rounded-[22px] overflow-hidden"
        style={{ backgroundImage: "url('/placeholder-map-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Status Bar */}
        <div className="flex flex-col items-start px-0 pt-[21px] w-full h-[56px]">
          <div className="flex flex-row justify-between items-center w-full h-[22px] px-[25px]"> {/* Added padding for visual spacing of status bar content */}
            {/* Time */}
            <span className={`${inter.className} font-bold text-[17px] leading-[22px] text-black antialiased`}>
              9:41
            </span>
            {/* Status Bar Icons */}
            <div className="flex flex-row justify-center items-center">
              {/* Assuming statusbaricons.svg contains all icons (wifi, signal, battery) */}
              <img src="/statusbaricons.svg" alt="Status Icons" className="h-[13px]" /> {/* Adjusted height, original width might be too large */}
            </div>
          </div>
        </div>
        {/* Progressive Blur Overlay */}

        {/* Rest of the phone content can go here */}
      </div>

      {/* Phone Mockup 2 */}
      <div
        className="flex flex-col w-[362px] h-[392px] rounded-[22px] overflow-hidden"
        style={{ backgroundImage: "url('/placeholder-map-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Status Bar */}
        <div className="flex flex-col items-start px-0 pt-[21px] w-full h-[56px]">
          <div className="flex flex-row justify-between items-center w-full h-[22px] px-[25px]"> {/* Added padding for visual spacing of status bar content */}
            {/* Time */}
            <span className={`${inter.className} font-bold text-[17px] leading-[22px] text-black antialiased`}>
              9:41
            </span>
            {/* Status Bar Icons */}
            <div className="flex flex-row justify-center items-center">
              <img src="/statusbaricons.svg" alt="Status Icons" className="h-[13px]" />
            </div>
          </div>
        </div>
        {/* Rest of the phone content can go here */}
      </div>
    </div>
  );
}
