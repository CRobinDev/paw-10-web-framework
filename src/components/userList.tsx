"use client"

import type React from "react"

import type { User } from "../types"
import ModalEditUser from "./editUser"
import ModalDeleteUser from "./deleteUser"
import ModalCreateUser from "./createUser"

interface UserListProps {
  users: User[]
  showEditModal: boolean
  loggedIn: boolean
  editUser: User | null
  editName: string
  editLoading: boolean
  editMsg: string
  setEditName: (name: string) => void
  handleEditSubmit: (e: React.FormEvent) => void
  setShowEditModal: (show: boolean) => void
  openEditModal: (user: User) => void

  showDeleteModal: boolean
  deleteUser: User | null
  deleteLoading: boolean
  deleteMsg: string
  handleDelete: () => void
  setShowDeleteModal: (show: boolean) => void
  openDeleteModal: (user: User) => void

  showCreateModal: boolean
  createName: string
  createEmail: string
  createPassword: string
  createLoading: boolean
  createMsg: string
  setCreateName: (name: string) => void
  setCreateEmail: (email: string) => void
  setCreatePassword: (password: string) => void
  handleCreateSubmit: (e: React.FormEvent) => void
  setShowCreateModal: (show: boolean) => void
}

export default function UserList({
  users,
  loggedIn,
  showEditModal,
  editUser,
  editName,
  editLoading,
  editMsg,
  setEditName,
  handleEditSubmit,
  setShowEditModal,
  openEditModal,

  showDeleteModal,
  deleteUser,
  deleteLoading,
  deleteMsg,
  handleDelete,
  setShowDeleteModal,
  openDeleteModal,

  showCreateModal,
  createName,
  createEmail,
  createPassword,
  createLoading,
  createMsg,
  setCreateName,
  setCreateEmail,
  setCreatePassword,
  handleCreateSubmit,
  setShowCreateModal,
}: UserListProps) {
  return (
    <>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Daftar Pengguna</h2>
        <ul>
          {users.length === 0 && <li className="text-gray-400 italic">Belum ada pengguna terdaftar.</li>}
          {users.map((user) => (
            <li
              key={user.id}
              className="border-b last:border-b-0 py-3 flex justify-between items-center hover:bg-blue-50 transition"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-semibold text-blue-700 block w-30 truncate">{user.name}</span>
                <span className="text-gray-1000">-</span>
                <span className="text-gray-500 block truncate">{user.email}</span>
              </div>
              <div className="flex gap-4">
                {loggedIn && (
                  <>
                    <button onClick={() => openEditModal(user)} className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => openDeleteModal(user)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Modal Edit */}
      <ModalEditUser
        show={showEditModal && !!editUser}
        loading={editLoading}
        name={editName}
        onChange={(e) => setEditName(e.target.value)}
        onSubmit={handleEditSubmit}
        onClose={() => setShowEditModal(false)}
        msg={editMsg}
      />

      {/* Modal Delete */}
      <ModalDeleteUser
        show={showDeleteModal && !!deleteUser}
        user={deleteUser}
        loading={deleteLoading}
        msg={deleteMsg}
        onDelete={handleDelete}
        onClose={() => setShowDeleteModal(false)}
      />

      {/* Modal Create */}
      <ModalCreateUser
        show={showCreateModal}
        loading={createLoading}
        name={createName}
        email={createEmail}
        password={createPassword}
        onChangeName={(e) => setCreateName(e.target.value)}
        onChangeEmail={(e) => setCreateEmail(e.target.value)}
        onChangePassword={(e) => setCreatePassword(e.target.value)}
        onSubmit={handleCreateSubmit}
        onClose={() => setShowCreateModal(false)}
        msg={createMsg}
      />
    </>
  )
}
