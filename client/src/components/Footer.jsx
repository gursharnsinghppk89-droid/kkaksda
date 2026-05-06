import React from 'react'
import { BiChevronDown } from 'react-icons/bi'

const FooterLinks = [
  'About Us', 'Investor Relations', 'Tools & Calculators', 'Regulatory Information',
  'Customer Service', 'Popular Products & Services', 'Ways to Bank',
  'Kotak Group Websites', 'Explore', 'Other'
]

export default function Footer() {
  return (
    <div className="bg-[#fff5f0] py-4 px-4">
      {FooterLinks.map((link, index) => (
        <div key={index} className="max-w-[900px] mx-auto border-b border-gray-300 py-3 text-left text-[13px] font-bold text-[#c41e3a] flex justify-between items-center cursor-pointer hover:text-[#f69120]">
          {link}
          <BiChevronDown className="text-gray-500" />
        </div>
      ))}
      <div className="max-w-[900px] mx-auto border-b border-gray-300 py-3 text-left text-[13px] font-bold text-[#c41e3a] flex justify-between items-center">
        <span>Customer Care</span>
        <span className="font-normal text-gray-600 text-[12px]">Get Social</span>
      </div>
      <div className="max-w-[900px] mx-auto py-6 text-center border-t border-gray-300 mt-4">
        <p className="text-[11px] text-gray-500">
          Terms and conditions | Disclaimer | Privacy Policy | Code of Commitment | Copyright
        </p>
        <p className="text-[11px] text-gray-400 mt-2">
          Copyright 2024. All Rights Reserved
        </p>
      </div>
    </div>
  )
}
