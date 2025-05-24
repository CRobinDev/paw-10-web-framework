"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { User } from "../../types"

export default function useUserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loggedIn, setLoggedIn] = useState(false) // State, bukan langsung akses localStorage

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [editName, setEditName] = useState("")
  const [editLoading, setEditLoading] = useState(false)
  const [editMsg, setEditMsg] = useState("")

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUser, setDeleteUser] = useState<User | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteMsg, setDeleteMsg] = useState("")

  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createName, setCreateName] = useState("")
  const [createEmail, setCreateEmail] = useState("")
  const [createPassword, setCreatePassword] = useState("")
  const [createLoading, setCreateLoading] = useState(false)
  const [createMsg, setCreateMsg] = useState("")

  // Cek login status saat component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      setLoggedIn(!!token)
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      fetchUsers()
    } else {
      setUsers([])
    }
  }, [loggedIn])

  const fetchUsers = () => {
    const token = localStorage.getItem("token")
    fetch("/api/users", {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })
      .then((res) => res.json())
      .then(setUsers)
  }

  // Handle open modal edit
  const openEditModal = (user: User) => {
    setEditUser(user)
    setEditName(user.name)
    setEditMsg("")
    setShowEditModal(true)
  }

  // Handle update
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editUser) return
    setEditLoading(true)
    setEditMsg("")
    
    const token = localStorage.getItem("token")
    const res = await fetch(`/api/users/edit/${editUser.id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ name: editName }),
    })
    const data = await res.json()
    setEditLoading(false)
    if (res.ok) {
      setShowEditModal(false)
      fetchUsers()
    } else {
      setEditMsg(data.error || "Gagal update")
    }
  }

  // Handle open modal delete
  const openDeleteModal = (user: User) => {
    setDeleteUser(user)
    setDeleteMsg("")
    setShowDeleteModal(true)
  }

  // Handle delete
  const handleDelete = async () => {
    if (!deleteUser) return
    setDeleteLoading(true)
    setDeleteMsg("")
    
    const token = localStorage.getItem("token")
    const res = await fetch(`/api/users/delete/${deleteUser.id}`, {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })
    const data = await res.json()
    setDeleteLoading(false)
    if (res.ok) {
      setShowDeleteModal(false)
      fetchUsers()
    } else {
      setDeleteMsg(data.error || "Gagal menghapus user")
    }
  }

  // Handle create user
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreateLoading(true)
    setCreateMsg("")
    
    const token = localStorage.getItem("token")
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ name: createName, email: createEmail, password: createPassword }),
    })
    const data = await res.json()
    setCreateLoading(false)
    if (res.ok) {
      setShowCreateModal(false)
      setCreateName("")
      setCreateEmail("")
      setCreatePassword("")
      fetchUsers()
    } else {
      setCreateMsg(data.error || "Gagal menambahkan user")
    }
  }

  // Bundle all props needed for UserList component
  const userManagementProps = {
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
  }

  return {
    users,
    loggedIn, // Return sebagai state
    showCreateModal,
    setShowCreateModal,
    userManagementProps,
  }
}