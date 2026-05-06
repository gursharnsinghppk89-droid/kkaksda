import React from 'react'
import { BiCreditCard, BiMoney, BiHome, BiLineChart, BiShield } from 'react-icons/bi'
import { FiCreditCard } from 'react-icons/fi'

export default function QuickLinks() {
  const links = [
    { name: 'Accounts', icon: BiCreditCard },
    { name: 'Deposits', icon: BiMoney },
    { name: 'Cards', icon: FiCreditCard },
    { name: 'Loans', icon: BiHome },
    { name: 'Invest', icon: BiLineChart },
    { name: 'Insurance', icon: BiShield }
  ]

  return (
    <div className="flex justify-between sm:justify-center gap-2 sm:gap-8 py-4 bg-[#f5f5f5] overflow-x-auto px-2 sm:px-4">
      {links.map((item, index) => (
        <div key={index} className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform min-w-[50px] sm:min-w-[60px] flex-1 sm:flex-none">
          <div className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] bg-[#c41e3a] rounded-full flex items-center justify-center text-white mb-1">
            <item.icon size={18} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-gray-700 text-center">{item.name}</span>
        </div>
      ))}
    </div>
  )
}
