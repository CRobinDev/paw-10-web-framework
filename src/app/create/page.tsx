"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setMsg(data.error || 'Gagal menambahkan user')
    }
  }

  return (
    <form
      className="w-full max-w-md mx-auto pt-20 flex flex-col gap-4 bg-white p-8 rounded-lg shadow"
      onSubmit={handleCreate}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Tambah Akun Baru</h2>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold disabled:opacity-60"
      >
        {loading ? 'Menambahkan...' : 'Tambah Akun'}
      </button>
      {msg && <p className="text-center text-red-500">{msg}</p>}
    </form>
  )
}