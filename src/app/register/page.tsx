'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    if (data.message) {
      setShowModal(true)
    } else {
      setMsg(data.error)
    }
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gradient-global pt-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Daftar
        </button>
        {msg && (
          <p className="mt-4 text-center text-sm text-red-600">{msg}</p>
        )}
      </div>
      {showModal && (
      <>
        {/* Overlay transparan */}
        <div className="fixed inset-0 z-40 bg-black/30 transition-opacity"></div>
        {/* Modal */}
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg border border-gray-200">
          <p className="mb-4 text-green-600 font-semibold">Registrasi berhasil!</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ke Halaman Utama
          </button>
        </div>
      </>
    )}
    </main>
  )
}