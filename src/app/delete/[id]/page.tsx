"use client"

import { useRouter } from 'next/navigation'
import { use, useState } from 'react'

export default function DeletePage(context: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(context.params)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch(`/api/users/delete/${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setMsg(data.error || 'Gagal menghapus user')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto pt-20 flex flex-col gap-4 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Hapus User</h2>
      <p className="mb-6 text-center">Apakah Anda yakin ingin menghapus akun ini?</p>
      {msg && <p className="text-center text-red-500">{msg}</p>}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors font-semibold disabled:opacity-60"
      >
        {loading ? 'Menghapus...' : 'Hapus'}
      </button>
      <button
        onClick={() => router.push('/')}
        disabled={loading}
        className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors font-semibold mt-2"
      >
        Batal
      </button>
    </div>
  )
}