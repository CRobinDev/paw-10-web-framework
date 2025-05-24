import type { User } from "../../types"

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/users")
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}

export async function createUser(userData: { name: string; email: string; password: string }): Promise<User> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Failed to create user")
  }

  return res.json()
}

export async function updateUser(id: string, data: { name: string }): Promise<User> {
  const res = await fetch(`/api/users/edit/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Failed to update user")
  }

  return res.json()
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/delete/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Failed to delete user")
  }
}
