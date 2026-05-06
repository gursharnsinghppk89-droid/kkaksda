import React from 'react'
import { BiMoney } from 'react-icons/bi'
import { FiCreditCard } from 'react-icons/fi'

export default function Offers() {
  return (
    <div className="max-w-[800px] mx-auto shadow-md rounded-[10px] p-4 bg-gray-50 my-8 mx-4">
      <b className="text-[18px] text-[#c41e3a]">Offers for you!!</b>
      <div className="flex items-center mt-5 p-3 bg-white rounded-lg hover:bg-gray-100 cursor-pointer transition">
        <div className="w-[50px] h-[50px] bg-[#c41e3a] rounded-full flex items-center justify-center text-white">
          <BiMoney size={24} />
        </div>
        <div className="ml-3">
          <b className="text-[#c41e3a]">Savings Account</b><br />
          <span className="text-sm text-gray-600">Open Zero Balance Account in 5 minutes</span>
        </div>
      </div>
      <div className="flex items-center mt-4 p-3 bg-white rounded-lg hover:bg-gray-100 cursor-pointer transition">
        <div className="w-[50px] h-[50px] bg-[#f69120] rounded-full flex items-center justify-center text-white">
          <FiCreditCard size={24} />
        </div>
        <div className="ml-3">
          <b className="text-[#c41e3a]">Credit Card</b><br />
          <span className="text-sm text-gray-600">Get up to 5% cashback on spending</span>
        </div>
      </div>
    </div>
  )
}
