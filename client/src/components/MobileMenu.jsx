import React, { useState } from 'react'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'

const MenuItems = [
  { name: 'Accounts', submenu: ['Savings Account', 'Current Account', 'Salary Account', 'Fixed Deposit'] },
  { name: 'Deposits', submenu: ['Fixed Deposit', 'Recurring Deposit', 'NRE/NRO Deposits'] },
  { name: 'Cards', submenu: ['Credit Cards', 'Debit Cards', 'Forex Card', 'FASTag'] },
  { name: 'Loans', submenu: ['Home Loan', 'Personal Loan', 'Car Loan', 'Gold Loan'] },
  { name: 'Invest', submenu: ['Mutual Funds', 'Demat Account', 'IPO', 'National Pension System'] },
  { name: 'Insurance', submenu: ['Life Insurance', 'Health Insurance', 'Vehicle Insurance', 'Travel Insurance'] },
]

export default function MobileMenu({ menuOpen }) {
  const [expandedItem, setExpandedItem] = useState(null)

  const toggleSubmenu = (index) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  return (
    <div 
      className={`fixed top-[60px] left-0 w-full bg-white z-[9999] shadow-xl overflow-y-auto max-h-[calc(100vh-60px)] ${menuOpen ? 'block' : 'hidden'}`}
    >
      {MenuItems.map((item, index) => (
        <div key={index}>
          <div 
            className="h-[50px] leading-[50px] text-left pl-4 border-b border-gray-100 text-[15px] font-medium text-[#c41e3a] hover:bg-[#fff5f0] cursor-pointer flex justify-between items-center pr-4"
            onClick={() => toggleSubmenu(index)}
          >
            {item.name}
            {expandedItem === index ? (
              <BiChevronDown className="text-gray-400" />
            ) : (
              <BiChevronRight className="text-gray-400" />
            )}
          </div>
          {expandedItem === index && (
            <div className="bg-gray-50">
              {item.submenu.map((subitem, subindex) => (
                <div 
                  key={subindex}
                  className="h-[44px] leading-[44px] text-left pl-8 border-b border-gray-100 text-[14px] text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {subitem}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
