"use client"
import Link from "next/link"
import UserList from "../components/userList"
import useAuth from "./hooks/useAuth"
import useUserManagement from "./hooks/useUserManagement"


export default function Home() {
  const { loggedIn, logout } = useAuth()
  const { users, setShowCreateModal, userManagementProps } = useUserManagement()

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-red-200 to-blue-300 pt-10">
      {/* SVG Illustration */}
      <img src="/cat.svg" alt="Logo" className="w-32 h-32 mb-6 drop-shadow-lg animate-fade-in" />
      <h1 className="pb-2 text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-pink-500 to-emerald-500 bg-clip-text text-transparent">Selamat Datang di Aplikasi Kami</h1>
      <p className="mb-8 text-gray-600 text-center max-w-xl">
        Aplikasi ini dibuat dengan Web Framework Next.js, Prisma sebagai ORM, dan Tailwind CSS untuk styling.
      </p>

      {!loggedIn ? (
        <div className="flex gap-4 mb-10">
          <Link
            href="/login"
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 rounded bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
          >
            Tambah Pengguna
          </button>
          <button
            onClick={() => {
              logout()
              location.reload()
            }}
            className="px-6 py-2 rounded bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}

      {loggedIn && <UserList users={users} {...userManagementProps} />}
    </div>
  )
}
