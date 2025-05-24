import React from "react"
import { User } from "../types"

type ModalDeleteUserProps = {
  show: boolean
  user: User | null
  loading: boolean
  msg: string
  onDelete: () => void
  onClose: () => void
}

export default function ModalDeleteUser({
  show,
  user,
  loading,
  msg,
  onDelete,
  onClose,
}: ModalDeleteUserProps) {
  if (!show || !user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4 text-center text-red-600">Hapus User</h3>
        <p className="mb-4 text-center">
          Yakin ingin menghapus <span className="font-semibold">{user.name}</span>?
        </p>
        {msg && <p className="text-red-500 text-sm text-center">{msg}</p>}
        <div className="flex gap-2">
          <button
            onClick={onDelete}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors font-semibold disabled:opacity-60"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors font-semibold"
            disabled={loading}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}