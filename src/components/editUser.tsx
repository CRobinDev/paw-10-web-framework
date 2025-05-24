import React from "react"

export default function ModalEditUser({
  show,
  loading,
  name,
  onChange,
  onSubmit,
  onClose,
  msg,
}: {
  show: boolean
  loading: boolean
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  msg: string
}) {
  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4 text-center">Edit Nama User</h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {msg && <p className="text-red-500 text-sm text-center">{msg}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Update'}
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
        </form>
      </div>
    </div>
  )
}