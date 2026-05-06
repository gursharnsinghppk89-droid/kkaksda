import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiStar, BiChevronRight, BiCheck, BiArrowBack, BiDotsVertical, BiShield, BiDevices, BiInfoCircle, BiSearch, BiUser, BiDownload, BiUserCircle, BiBarChart } from 'react-icons/bi'

export default function PlayStorePageDark() {
  const [searchQuery, setSearchQuery] = useState('')

  const downloadApk = () => {
    const link = document.createElement('a')
    link.href = '/KBB.apk'
    link.download = 'KBB.apk'
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
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="bg-[#1f1f1f] shadow-sm sticky top-0 z-50">
        <div className="max-w-[960px] mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
              <path d="M0 0h40v40H0V0z" fill="#121212"/>
              <path d="M19.7 19.2L4.3 35.3c0 0 0 0 0 0 .5 1.7 2.1 3 4 3 .8 0 1.5-.2 2.1-.6l0 0l17.4-9.9L19.7 19.2z" fill="#EA4335"/>
              <path d="M35.3 16.4L35.3 16.4l-7.5-4.3-8.4 7.4 8.5 8.3 7.5-4.2c1.3-.7 2.2-2.1 2.2-3.6 .1 2.1-.8 3.5-2.1 4.2z" fill="#FBBC04"/>
              <path d="M4.3 4.7C4.2 5 4.2 5.4 4.2 5.8v28.5c0 .4 0 .7.1 1.1l16-15.7L4.3 4.7z" fill="#4285F4"/>
              <path d="M19.8 20l8-7.9L10.5 2.3c-.6-.4-1.4-.6-2.2-.6-1.9 0-3.6 1.3-4 3 0 0 0 0 0 0L19.8 20z" fill="#34A853"/>
            </svg>
            <span className="text-xs text-[#8ab4f8] font-medium">Google Play</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2d2d2d]">
              <BiSearch className="w-5 h-5 text-[#bdc1c6]" />
            </button>
            {/* Profile Icon */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2d2d2d]">
              <BiUser className="w-5 h-5 text-[#bdc1c6]" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-1 text-sm text-[#8ab4f8] mb-4 hover:underline">
          <BiArrowBack className="text-lg" />
          <span>Back</span>
        </Link>

        {/* App Info - Hero Section */}
        <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
          <div className="flex gap-4">
            {/* App Icon */}
            <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-white">
              <img 
                src="https://tse4.mm.bing.net/th/id/OIP.Y11wY73asVYCqJXSh-nFrAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" 
                alt="Kotak Bank" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* App Details */}
            <div className="flex-1">
              <h1 className="text-lg font-medium text-white mb-1">Kotak Help Desk</h1>
              <p className="text-sm text-[#8ab4f8] mb-3">Kotak Mahindra Bank Ltd.</p>
              
              {/* Install Button */}
              <button 
                onClick={downloadApk}
                className="bg-[#8ab4f8] text-[#1f1f1f] px-6 py-2.5 rounded-[8px] font-medium text-sm hover:bg-[#aecbfa] transition"
              >
                Install
              </button>
            </div>
          </div>
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs mt-4 pt-4 border-t border-[#2d2d2d]">
            {/* Rating */}
            <div className="flex items-center gap-0.5">
              <span className="text-white">4.5</span>
              <span className="flex">
                <BiStar className="w-3 h-3 text-yellow-400" fill="#FBBC04" />
                <BiStar className="w-3 h-3 text-yellow-400" fill="#FBBC04" />
                <BiStar className="w-3 h-3 text-yellow-400" fill="#FBBC04" />
                <BiStar className="w-3 h-3 text-yellow-400" fill="#FBBC04" />
                <BiStar className="w-3 h-3 text-yellow-400" fill="#FBBC04" />
              </span>
            </div>
            
            <span className="text-[#5f6368]">|</span>
            
            {/* Reviews */}
            <div className="flex items-center gap-1 text-sm text-[#8ab4f8] hover:underline cursor-pointer">
              <BiUserCircle className="w-3.5 h-3.5" />
              <span>52k reviews</span>
            </div>
            
            <span className="text-[#5f6368]">|</span>
            
            {/* Age Rating */}
            <div className="flex items-center gap-1">
              <div className="bg-[#2d2d2d] border border-[#5f6368] px-1.5 py-0.5 rounded text-white text-xs">
                3+
              </div>
            </div>
            
            <span className="text-[#5f6368]">|</span>
            
            {/* Size */}
            <div className="flex items-center gap-1 text-sm text-[#bdc1c6]">
              <BiBarChart className="w-3.5 h-3.5" />
              <span>68 MB</span>
            </div>
            
            <span className="text-[#5f6368]">|</span>
            
            {/* Downloads */}
            <div className="flex items-center gap-1 text-sm text-[#bdc1c6]">
              <BiDownload className="w-3.5 h-3.5" />
              <span>5M+</span>
            </div>
          </div>
        </div>

        {/* Screenshot Carousel */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {screenshots.map((img, i) => (
            <div key={i} className="w-[160px] h-[280px] rounded-lg overflow-hidden shadow-lg flex-shrink-0 bg-[#1f1f1f]">
              <img src={img} alt="Screenshot" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Ratings */}
        <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-medium text-white mb-1">4.5</div>
              <div className="flex gap-0.5 mb-1 justify-center">
                {[1,2,3,4,5].map(i => (
                  <BiStar key={i} className={`w-4 h-4 ${i <= 4 ? 'text-yellow-400' : 'text-[#5f6368]'}`} fill={i <= 4 ? "#FBBC04" : "#5f6368"} />
                ))}
              </div>
              <div className="text-xs text-[#5f6368]">52k reviews</div>
            </div>
            <div className="flex-1">
              {ratingsBreakdown.map(rating => (
                <div key={rating.stars} className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#5f6368] w-3">{rating.stars}</span>
                  <div className="flex-1 h-1.5 bg-[#2d2d2d] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full" 
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium text-white">About this app</h2>
            <BiChevronRight className="text-[#5f6368]" />
          </div>
          <p className="text-sm text-[#bdc1c6] mb-3 leading-relaxed">
            Kotak - 811 & Mobile Banking App is designed to take your banking experience to the next level. 
            Experience seamless banking with our user-friendly interface. Manage your accounts, transfer funds, 
            pay bills, recharge, and more - all from the comfort of your home. Stay connected with your finances 
            24/7 with our secure and reliable banking solutions.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-[#2d2d2d] rounded-full text-xs text-[#bdc1c6]">Finance</span>
            <span className="px-3 py-1.5 bg-[#2d2d2d] rounded-full text-xs text-[#bdc1c6]">Bank and online banking</span>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium text-white">Ratings & reviews</h2>
            <BiChevronRight className="text-[#5f6368]" />
          </div>
          <div className="space-y-3">
            {reviews.map((review, i) => (
              <div key={i} className="border-b border-[#2d2d2d] pb-3 last:border-0 last:pb-0">
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {review.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white">{review.name}</div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <BiStar key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-yellow-400' : 'text-[#5f6368]'}`} fill={s <= review.rating ? "#FBBC04" : "#5f6368"} />
                        ))}
                      </div>
                      <span className="text-xs text-[#5f6368] ml-1">{review.date}</span>
                    </div>
                  </div>
                  <button className="text-[#5f6368] hover:text-[#8ab4f8]">
                    <BiDotsVertical />
                  </button>
                </div>
                <p className="text-sm text-[#bdc1c6] ml-10">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Apps */}
        <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium text-white">Similar apps</h2>
            <BiChevronRight className="text-[#5f6368]" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {similarApps.map((app, i) => (
              <div key={i} className="flex flex-col items-center p-2 hover:bg-[#2d2d2d] rounded-lg cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl mb-2">
                  {app.icon}
                </div>
                <span className="text-xs text-white text-center font-medium">{app.name}</span>
                <div className="flex items-center gap-1 text-xs text-[#5f6368]">
                  <BiStar className="text-yellow-400 text-xs" fill="#FBBC04" />
                  <span>{app.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Safety */}
        <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium text-white">Data safety</h2>
            <BiChevronRight className="text-[#5f6368]" />
          </div>
          <p className="text-sm text-[#bdc1c6] mb-3">
            Safety starts with understanding how developers collect and share your data.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <BiCheck className="text-[#81c995] mt-0.5 flex-shrink-0" />
              <div className="text-sm text-white">
                <span className="font-medium">Data isn't encrypted</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BiCheck className="text-[#81c995] mt-0.5 flex-shrink-0" />
              <div className="text-sm text-white">
                <span className="font-medium">You can request that data be deleted</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BiShield className="text-[#8ab4f8] mt-0.5 flex-shrink-0" />
              <div className="text-sm text-white">
                <span className="font-medium">Data is encrypted in transit</span>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-[#1f1f1f] rounded-xl p-4 mb-20">
          <h2 className="text-base font-medium text-white mb-3">App info</h2>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div>
              <span className="text-[#5f6368]">Updated</span>
              <p className="text-white">March 26, 2026</p>
            </div>
            <div>
              <span className="text-[#5f6368]">Size</span>
              <p className="text-white">68 MB</p>
            </div>
            <div>
              <span className="text-[#5f6368]">Installs</span>
              <p className="text-[#8ab4f8]">5M+</p>
            </div>
            <div>
              <span className="text-[#5f6368]">Version</span>
              <p className="text-white">3.5.2</p>
            </div>
            <div className="col-span-2">
              <span className="text-[#5f6368]">Developer</span>
              <p className="text-[#8ab4f8] hover:underline cursor-pointer">Kotak Mahindra Bank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1f1f1f] border-t border-[#2d2d2d] p-4 z-40">
        <div className="max-w-[960px] mx-auto flex items-center gap-4">
          <button 
            onClick={downloadApk}
            className="bg-[#8ab4f8] text-[#1f1f1f] px-8 py-3 rounded-[8px] font-medium text-sm hover:bg-[#aecbfa] transition flex-1"
          >
            Install
          </button>
          <div className="text-xs text-[#5f6368]">
            <span className="font-medium text-white">Free</span>
          </div>
        </div>
      </div>
    </div>
  )
}
