import React, { useState } from 'react'
import { BiBell, BiX } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLoginClick = () => {
    setLoading(true)
    setTimeout(() => {
      navigate('/login')
    }, 800)
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <header className="h-[60px] bg-white w-full fixed top-0 left-0 flex items-center px-[10px] shadow-md z-[1000]">
      <div 
        className="w-[40px] h-[40px] flex flex-col justify-center cursor-pointer z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <BiX className="text-[#c41e3a] text-[28px]" />
        ) : (
          <div className="space-y-1.5">
            <span className="block w-[25px] h-[3px] bg-[#c41e3a] rounded"></span>
            <span className="block w-[25px] h-[3px] bg-[#c41e3a] rounded"></span>
            <span className="block w-[25px] h-[3px] bg-[#c41e3a] rounded"></span>
          </div>
        )}
      </div>

      <a href="https://www.kotak.com" target="_blank" rel="noopener noreferrer">
        <img 
          src="https://www.kotak.bank.in/content/dam/Kotak/svg-icons/navigation/kmbl-logo.svg" 
          alt="Kotak Bank" 
          className="h-[40px] ml-2"
        />
      </a>

      <div className="absolute right-[10px] top-0 flex items-center h-full">
        <button onClick={handleLoginClick} className="bg-[#c41e3a] text-white rounded-full h-[28px] px-4 text-[12px] font-medium mr-3 hover:bg-[#a31830] transition flex items-center">
          Login 
        </button>
        <BiBell className="text-[#c41e3a] text-[22px]" />
      </div>
    </header>
    </>
  )
}
