import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MobileBanking() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleDownload = () => {
    setLoading(true)
    setTimeout(() => {
      navigate('/app-dark')
    }, 800)
  }

  return (
    <div className="bg-[#f5f5f5] py-10 text-center my-8 px-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <h2 className="text-[#c41e3a] text-[22px] font-bold mb-6">MOBILE BANKING</h2>
      <img 
        src="https://mir-s3-cdn-cf.behance.net/projects/404/b7f382151402405.Y3JvcCw4MTMsNjM1LDAsNDI.png" 
        alt="Mobile Banking" 
        className="max-w-[300px] mx-auto mb-6"
      />
      <button 
        onClick={handleDownload}
        disabled={loading}
        className="bg-[#c41e3a] text-white rounded-[30px] w-[220px] h-[50px] text-[16px] font-medium hover:bg-[#a31830] transition inline-flex items-center justify-center disabled:opacity-70"
      >
        {loading ? 'Loading...' : 'Download App'}
      </button>
    </div>
  )
}
