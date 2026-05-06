import React, { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-red-600 z-[99999999] flex items-center justify-center">
      <img 
        src="https://www.kotak.bank.in/content/dam/Kotak/svg-icons/navigation/kmbl-logo.svg" 
        alt="Kotak Bank" 
        className="h-[60px] drop-shadow-lg animate-pulse"
      />
    </div>
  )
}
