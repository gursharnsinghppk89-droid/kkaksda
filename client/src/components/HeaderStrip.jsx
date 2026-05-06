import React, { useState } from 'react'
import { BiX } from 'react-icons/bi'

export default function HeaderStrip() {
  const [show, setShow] = useState(true)

  if (!show) return null

  return (
    <div className="bg-[#fce8d8] px-4 py-2 flex items-center justify-center">
      <span className="text-[#c41e3a] text-[13px] font-medium">
        Get 7.75% p.a. on Savings Account | Limited Period Offer
      </span>
      <button onClick={() => setShow(false)} className="ml-2 text-gray-500 hover:text-gray-700">
        <BiX />
      </button>
    </div>
  )
}
