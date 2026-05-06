import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BiLock, BiUser, BiShow, BiHide } from 'react-icons/bi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please enter username and password')
      return
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      
      if (data.success) {
        localStorage.setItem('kotakAdminToken', 'authenticated')
        navigate('/admin/dashboard')
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (err) {
      setError('Server error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-gray-900 pt-[60px]">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img 
                src="https://www.kotak.bank.in/content/dam/Kotak/svg-icons/navigation/kmbl-logo.svg" 
                alt="Kotak Bank" 
                className="h-16 mx-auto"
              />
            </Link>
            <h1 className="text-3xl font-bold text-white mt-6">Admin Panel</h1>
            <p className="text-gray-400 mt-2">Kotak Mahindra Bank</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
            
            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-6 text-center text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BiUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-white placeholder-gray-400"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BiLock className="text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-white placeholder-gray-400"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? <BiHide className="text-gray-500" /> : <BiShow className="text-gray-500" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition shadow-lg shadow-red-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-red-400 hover:text-red-300 font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            © 2024 Kotak Mahindra Bank. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Background */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-red-900 via-red-800 to-indigo-900 items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Secure Admin Access</h2>
          <p className="text-red-200 text-lg max-w-md">
            Manage all user submissions, view analytics, and control system settings from this dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
