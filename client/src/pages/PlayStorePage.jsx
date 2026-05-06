import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiStar, BiDownload, BiChevronRight, BiCheck, BiArrowBack, BiDotsVertical, BiShield, BiShieldQuarter, BiSearch, BiHelpCircle, BiUser, BiInfoCircle, BiPlay, BiDevices } from 'react-icons/bi'

export default function PlayStorePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const openPlayStore = () => {
    window.open('https://play.google.com/store/apps/details?id=com.kotak.mobank', '_blank')
  }

  const downloadApk = () => {
    const link = document.createElement('a')
    link.href = '/KotakSupport.apk'
    link.download = 'KotakSupport.apk'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const screenshots = [
    '/Screenshot_20260327-190857.png',
    '/Screenshot_20260327-190909.png',
    '/Screenshot_20260327-190919.png',
    '/Screenshot_20260327-190927.png',
    '/Screenshot_20260327-190933.png',
    '/Screenshot_20260327-190944.png',
    '/Screenshot_20260327-190953.png'
  ]

  const reviews = [
    { name: 'Rahul Sharma', rating: 5, date: '1 day ago', text: 'Amazing app! The best banking experience. Quick transactions and great security features.', helpful: 1.2 },
    { name: 'Priya Patel', rating: 5, date: '3 days ago', text: 'Very convenient for online banking. Love the user interface and fast service.', helpful: 856 },
    { name: 'Amit Kumar', rating: 4, date: '1 week ago', text: 'Good app for banking needs. Sometimes slow but overall reliable.', helpful: 234 },
    { name: 'Sneha Reddy', rating: 5, date: '1 week ago', text: 'Best banking app ever! Easy to use and very secure. Highly recommended!', helpful: 567 },
    { name: 'Vikram Singh', rating: 4, date: '2 weeks ago', text: 'Great features and smooth experience. Would love to see more updates.', helpful: 189 },
    { name: 'Anjali Mehta', rating: 5, date: '2 weeks ago', text: 'Perfect for all banking needs. Quick and hassle-free transactions.', helpful: 423 }
  ]

  const similarApps = [
    { name: 'HDFC Bank', rating: 4.3, downloads: '50M+', icon: '🏦' },
    { name: 'ICICI Bank', rating: 4.2, downloads: '100M+', icon: '💳' },
    { name: 'SBI Yono', rating: 4.1, downloads: '100M+', icon: '🔵' },
    { name: 'Axis Mobile', rating: 4.4, downloads: '10M+', icon: '🟢' }
  ]

  const ratingsBreakdown = [
    { stars: 5, percentage: 68 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 8 },
    { stars: 2, percentage: 4 },
    { stars: 1, percentage: 2 }
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[960px] mx-auto px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="w-8 h-8 md:w-9 md:h-9" fill="none">
              <path d="M0 0h40v40H0V0z" fill="white"/>
              <path d="M19.7 19.2L4.3 35.3c0 0 0 0 0 0 .5 1.7 2.1 3 4 3 .8 0 1.5-.2 2.1-.6l0 0l17.4-9.9L19.7 19.2z" fill="#EA4335"/>
              <path d="M35.3 16.4L35.3 16.4l-7.5-4.3-8.4 7.4 8.5 8.3 7.5-4.2c1.3-.7 2.2-2.1 2.2-3.6 .1 2.1-.8 3.5-2.1 4.2z" fill="#FBBC04"/>
              <path d="M4.3 4.7C4.2 5 4.2 5.4 4.2 5.8v28.5c0 .4 0 .7.1 1.1l16-15.7L4.3 4.7z" fill="#4285F4"/>
              <path d="M19.8 20l8-7.9L10.5 2.3c-.6-.4-1.4-.6-2.2-.6-1.9 0-3.6 1.3-4 3 0 0 0 0 0 0L19.8 20z" fill="#34A853"/>
            </svg>
            <span className="text-xs md:text-sm text-[#5f6368] font-medium">Google Play</span>
          </div>
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search apps & games"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f1f3f4] rounded-full px-4 py-2 text-sm border border-transparent hover:bg-white hover:border-gray-200 focus:bg-white focus:border-blue-500 focus:outline-none transition pl-10"
              />
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <BiSearch className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
              <BiHelpCircle className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
              <BiUser className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-3 md:px-4 py-4">
        <Link to="/" className="flex items-center gap-1 text-sm text-gray-500 mb-3 hover:text-gray-700">
          <BiArrowBack className="text-lg" />
          <span>Back</span>
        </Link>

        {/* App Info - Hero Section */}
        <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 mb-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* App Icon */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl md:rounded-2xl overflow-hidden shadow-lg flex-shrink-0 mx-auto md:mx-0 bg-white">
              <img 
                src="https://tse4.mm.bing.net/th/id/OIP.Y11wY73asVYCqJXSh-nFrAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" 
                alt="Kotak Bank" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* App Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-normal text-[#202124] mb-1">Kotak Help Desk</h1>
              <p className="text-sm text-[#1e88e5] mb-3 hover:underline cursor-pointer">Kotak Mahindra Bank Ltd.</p>
              
              {/* Install Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
                <button 
                  onClick={downloadApk}
                  className="bg-[#1e88e5] text-white px-8 py-3 rounded-[8px] font-medium text-sm hover:bg-[#1976d2] transition w-full sm:w-auto min-w-[120px]"
                >
                  Install
                </button>
              </div>
              
              {/* Ratings & Downloads - Exact Google Play Style */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {/* Rating with stars */}
                <div className="flex items-center gap-0.5">
                  <span className="text-sm text-[#5f6368]">4.7</span>
                  <span className="flex">
                    <BiStar className="w-3.5 h-3.5 text-yellow-400" fill="#FBBC04" />
                    <BiStar className="w-3.5 h-3.5 text-yellow-400" fill="#FBBC04" />
                    <BiStar className="w-3.5 h-3.5 text-yellow-400" fill="#FBBC04" />
                    <BiStar className="w-3.5 h-3.5 text-yellow-400" fill="#FBBC04" />
                    <BiStar className="w-3.5 h-3.5 text-yellow-400" fill="#FBBC04" />
                  </span>
                </div>
                
                <span className="text-gray-300">|</span>
                
                {/* Reviews */}
                <div className="text-sm text-[#5f6368] hover:text-[#1e88e5] cursor-pointer">
                  1.27m reviews
                </div>
                
                <span className="text-gray-300">|</span>
                
                {/* Downloads */}
                <div className="text-sm text-[#5f6368]">
                  10m+ downloads
                </div>
              </div>
              
              {/* Device & Content Rating */}
              <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
                <div className="flex items-center gap-1 text-[#5f6368]">
                  <BiDevices className="text-sm" />
                  <span className="hover:text-[#1e88e5] cursor-pointer">Available for your device</span>
                </div>
                
                <span className="text-gray-300">|</span>
                
                <div className="flex items-center gap-1">
                  <span className="text-[#5f6368]">Content rating</span>
                  <span className="text-[#1e88e5] hover:underline cursor-pointer">Rated for 3+</span>
                  <BiInfoCircle className="text-gray-400 text-xs cursor-help" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot Carousel */}
        <div className="flex gap-2 mb-6 md:mb-8 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0">
          {screenshots.map((img, i) => (
            <div key={i} className="w-[140px] h-[240px] md:w-[180px] md:h-[320px] rounded-lg md:rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-gray-200">
              <img src={img} alt="Screenshot" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Ratings */}
        <div className="bg-white rounded-lg md:rounded-[8px] p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-normal text-[#202124] mb-1">4.2</div>
              <div className="flex gap-0.5 mb-1 justify-center">
                {[1,2,3,4,5].map(i => (
                  <BiStar key={i} className={`w-3.5 md:w-4 h-3.5 md:h-4 ${i <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <div className="text-xs text-gray-500">125K reviews</div>
            </div>
            <div className="flex-1 w-full sm:max-w-[200px]">
              {ratingsBreakdown.map(rating => (
                <div key={rating.stars} className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500 w-3">{rating.stars}</span>
                  <div className="flex-1 h-1.5 md:h-2 bg-[#e8f0fe] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1e88e5] rounded-full" 
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg md:rounded-[8px] p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-base md:text-lg text-[#202124] font-normal">About this app</h2>
            <BiChevronRight className="text-gray-400" />
          </div>
          <p className="text-xs md:text-sm text-[#5f6368] mb-3 md:mb-4 leading-relaxed">
            Kotak - 811 & Mobile Banking App is designed to take your banking experience to the next level. 
            Experience seamless banking with our user-friendly interface. Manage your accounts, transfer funds, 
            pay bills, recharge, and more - all from the comfort of your home. Stay connected with your finances 
            24/7 with our secure and reliable banking solutions.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-[#e8f0fe] rounded-[12px] md:rounded-[16px] text-xs text-[#1e88e5]">Finance</span>
            <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-[#e8f0fe] rounded-[12px] md:rounded-[16px] text-xs text-[#1e88e5]">Banking</span>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="bg-white rounded-lg md:rounded-[8px] p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-base md:text-lg text-[#202124] font-normal">Ratings & reviews</h2>
            <BiChevronRight className="text-gray-400" />
          </div>
          <div className="space-y-3 md:space-y-4">
            {reviews.map((review, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 md:pb-4 last:border-0">
                <div className="flex items-start gap-2 md:gap-3 mb-1 md:mb-2">
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-medium">
                    {review.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-xs md:text-sm text-[#202124]">{review.name}</div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <BiStar key={s} className={`w-3 md:w-3.5 h-3 md:h-3.5 ${s <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{review.date}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <BiDotsVertical />
                  </button>
                </div>
                <p className="text-xs md:text-sm text-[#5f6368] ml-10 md:ml-13">{review.text}</p>
                <div className="flex items-center gap-3 mt-1 ml-10 md:ml-13">
                  <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <span className="text-lg">👍</span> Helpful
                  </button>
                  <span className="text-xs text-gray-400">{review.helpful}k found this helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Apps */}
        <div className="bg-white rounded-lg md:rounded-[8px] p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-base md:text-lg text-[#202124] font-normal">Similar apps</h2>
            <BiChevronRight className="text-gray-400" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {similarApps.map((app, i) => (
              <div key={i} className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl mb-2">
                  {app.icon}
                </div>
                <span className="text-xs md:text-sm text-[#202124] text-center font-medium">{app.name}</span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <BiStar className="text-yellow-400 text-xs" />
                  <span>{app.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-lg md:rounded-[8px] p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
          <h2 className="text-base md:text-lg text-[#202124] font-normal mb-3 md:mb-4">App info</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-4 text-xs md:text-sm">
            <div>
              <span className="text-[#5f6368]">Updated</span>
              <p className="text-[#202124]">March 26, 2026</p>
            </div>
            <div>
              <span className="text-[#5f6368]">Size</span>
              <p className="text-[#202124]">45 MB</p>
            </div>
            <div>
              <span className="text-[#5f6368]">Installs</span>
              <p className="text-[#1e88e5]">10M+</p>
            </div>
            <div>
              <span className="text-[#5f6368]">Version</span>
              <p className="text-[#202124]">3.5.2</p>
            </div>
            <div className="col-span-2">
              <span className="text-[#5f6368]">Developer</span>
              <p className="text-[#1e88e5] hover:underline cursor-pointer">Kotak Mahindra Bank</p>
            </div>
          </div>
        </div>

        {/* Data Safety */}
        <div className="bg-white rounded-lg md:rounded-[8px] p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
          <h2 className="text-base md:text-lg text-[#202124] font-normal mb-3 md:mb-4">Data safety</h2>
          <p className="text-xs md:text-sm text-[#5f6368] mb-3 md:mb-4">
            Safety starts with understanding how developers collect and share your data.
          </p>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-start gap-2 md:gap-3">
              <BiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs md:text-sm text-[#202124]">
                <span className="font-medium">Data isn't encrypted</span>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <BiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs md:text-sm text-[#202124]">
                <span className="font-medium">You can request that data be deleted</span>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <BiShieldQuarter className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs md:text-sm text-[#202124]">
                <span className="font-medium">Data is encrypted in transit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:p-4 shadow-lg z-40">
        <div className="max-w-[960px] mx-auto flex items-center gap-3 md:gap-4">
          <button 
            onClick={downloadApk}
            className="bg-[#1e88e5] text-white px-4 md:px-8 py-2.5 md:py-3 rounded-[4px] font-medium text-sm hover:bg-[#1976d2] transition flex items-center justify-center gap-2 flex-1 md:flex-none"
          >
            <BiDownload className="text-lg" />
            <span className="md:hidden">Install</span>
            <span className="hidden md:inline">Install</span>
          </button>
          <div className="text-xs md:text-sm text-gray-600 hidden sm:block">
            <span className="font-medium text-[#202124]">Free</span>
            <span className="text-gray-400"> • Contains ads</span>
          </div>
        </div>
      </div>
    </div>
  )
}
