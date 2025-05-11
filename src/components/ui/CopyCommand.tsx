"use client";

import React, { useState } from 'react';

interface CopyCommandProps {
  command: string;
  fontClassName: string;
}

export default function CopyCommand({ command, fontClassName }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy command"
      className="relative flex flex-row justify-center items-center px-[47px] py-[15px] gap-[10px] isolation-isolate bg-white border border-[rgba(0,0,0,0.06)] rounded-full cursor-pointer transition-colors duration-150 hover:bg-gray-50 hover:border-[rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <span className={`${fontClassName} text-[17px] antialiased leading-[22px] text-[#4C4C4C] tracking-[-1px]`}>
        {command}
      </span>
      <span className="absolute left-[18px] w-[16px] h-[16px] z-10">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.66667C2.37875 9.66667 2.06812 9.66667 1.82309 9.5652C1.49639 9.42987 1.23682 9.17027 1.10149 8.8436C1 8.59853 1 8.28793 1 7.66667V3.13333C1 2.3866 1 2.01323 1.14533 1.72801C1.27315 1.47713 1.47713 1.27315 1.72801 1.14533C2.01323 1 2.3866 1 3.13333 1H7.66667C8.28793 1 8.59853 1 8.8436 1.10149C9.17027 1.23682 9.42987 1.49639 9.5652 1.82309C9.66667 2.06812 9.66667 2.37875 9.66667 3M7.8 14.3333H12.2C12.9467 14.3333 13.3201 14.3333 13.6053 14.188C13.8562 14.0602 14.0602 13.8562 14.188 13.6053C14.3333 13.3201 14.3333 12.9467 14.3333 12.2V7.8C14.3333 7.05327 14.3333 6.67987 14.188 6.39467C14.0602 6.14379 13.8562 5.93982 13.6053 5.81199C13.3201 5.66667 12.9467 5.66667 12.2 5.66667H7.8C7.05327 5.66667 6.67987 5.66667 6.39467 5.81199C6.14379 5.93982 5.93982 6.14379 5.81199 6.39467C5.66667 6.67987 5.66667 7.05327 5.66667 7.8V12.2C5.66667 12.9467 5.66667 13.3201 5.81199 13.6053C5.93982 13.8562 6.14379 14.0602 6.39467 14.188C6.67987 14.3333 7.05327 14.3333 7.8 14.3333Z" stroke="#4C4C4C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      {copied && <span className="sr-only">Copied!</span>}
    </button>
  );
}
