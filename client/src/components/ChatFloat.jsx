import React from 'react'
import { BiMessageDetail } from 'react-icons/bi'

export default function ChatFloat() {
  return (
    <div className="fixed bottom-4 right-5 z-[100] cursor-pointer hover:scale-110 transition-transform">
      <div className="w-[50px] h-[50px] bg-[#c41e3a] rounded-full flex items-center justify-center shadow-lg">
        <BiMessageDetail size={24} className="text-white" />
      </div>
    </div>
  )
}
