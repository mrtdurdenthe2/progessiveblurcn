import { Inter, Roboto_Mono } from "next/font/google";
import PhoneWithBlur from "@/components/PhoneWithBlur";
import Image from "next/image";
import CopyCommand from "@/components/ui/CopyCommand";


const inter = Inter({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen max-h-screen max-w-screen p-8 gap-[50px]">
      <div className="flex flex-row items-center justify-center gap-[133px]">
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
                <Image src="/statusbaricons.svg" alt="Status Icons" width={20} height={13} className="h-[13px]" />
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
      {/* Command Line Container */}
      <div className="flex flex-col items-center w-[858px] h-[43px] px-[88px] gap-[10px]">
        <CopyCommand
          command="npx shadcn@latest http://localhost:3000/r/progressiveblur.json"
          fontClassName={robotoMono.className}
        />
      </div>
    </div>
  );
}
