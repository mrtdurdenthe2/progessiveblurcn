import { Inter } from "next/font/google";
import PhoneWithBlur from "@/components/PhoneWithBlur";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center max-h-screen max-w-screen min-h-screen min-w-screen p-8 gap-[133px]">
      {/* Phone Mockup 1 (with Progressive Blur) */}
      <PhoneWithBlur/>

      {/* Phone Mockup 2 */}
      <div
        className="relative flex flex-col w-[362px] h-[392px] rounded-[22px] overflow-hidden"
        style={{ backgroundImage: "url('/placeholder-map-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Status Bar */}
        <div className="relative z-10 flex flex-col items-start px-0 pt-[21px] w-full h-[56px]">
          <div className="flex flex-row justify-between items-center w-full h-[22px] px-[25px]"> {/* Added padding for visual spacing of status bar content */}
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
        {/* Top Blur Mask */}
        <div
          className="absolute left-0 top-0 w-full h-[90px] z-0 pointer-events-none overflow-hidden"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            WebkitMaskImage: 'linear-gradient(to top, transparent, black)',
            maskImage: 'linear-gradient(to top, transparent, black)'
          }}
        />

      </div>
    </div>
  );
}
