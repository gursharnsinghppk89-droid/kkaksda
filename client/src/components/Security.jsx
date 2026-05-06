import React from 'react'
import { BiShield, BiHeart } from 'react-icons/bi'
import { FiLock } from 'react-icons/fi'

export default function Security() {
  return (
    <div className="bg-[#fff5f0] py-10 text-center px-4">
      <h2 className="text-[#c41e3a] text-[20px] font-bold">
        WE TAKE YOUR BANKING <br />
        <span className="text-[#f69120] text-[24px]">SECURITY</span> SERIOUSLY!
      </h2>
      <p className="text-gray-600 text-[14px] max-w-[600px] mx-auto mt-4">
        Peace of mind for you as we have the most advanced technology & protection
      </p>
      <div className="flex justify-center flex-wrap mt-8 max-w-[900px] mx-auto gap-6">
        <div className="min-w-[150px]">
          <div className="w-[60px] h-[60px] bg-[#c41e3a] rounded-full flex items-center justify-center mx-auto mb-3">
            <BiShield size={28} className="text-white" />
          </div>
          <p className="text-[12px] font-medium text-gray-700">2 Factor Authentication</p>
        </div>
        <div className="min-w-[150px]">
          <div className="w-[60px] h-[60px] bg-[#f69120] rounded-full flex items-center justify-center mx-auto mb-3">
            <FiLock size={28} className="text-white" />
          </div>
          <p className="text-[12px] font-medium text-gray-700">256-bit Encryption</p>
        </div>
        <div className="min-w-[150px]">
          <div className="w-[60px] h-[60px] bg-[#c41e3a] rounded-full flex items-center justify-center mx-auto mb-3">
            <BiHeart size={28} className="text-white" />
          </div>
          <p className="text-[12px] font-medium text-gray-700">Safe & Secure Banking</p>
        </div>
      </div>
    </div>
  )
}
