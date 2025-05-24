"use client"

import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

export default function EditPage(context: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(context.params)

  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    getData()
    // eslint-disable-next-line
  }, [id])

  const getData = async () => {
    const res = await fetch(`/api/users/edit/${id}`, {
      method: 'GET',
    })

    const json = await res.json()
    if (!json || !json.name) {
      router.push('/')
      return
    }
    setName(json.name)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await fetch(`/api/users/edit/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    setIsLoading(false)
    router.push('/')
    router.refresh()
  }

  return (
    <form
      className="w-full max-w-md mx-auto pt-20 flex flex-col gap-4 bg-white p-8 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Nama User</h2>
      <input
        type="text"
        placeholder="Nama baru"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold disabled:opacity-60"
      >
        {isLoading ? 'Loading ...' : 'Update'}
      </button>
    </form>
  )
}