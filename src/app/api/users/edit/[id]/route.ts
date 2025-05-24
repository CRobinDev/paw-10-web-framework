import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  const userId = Number(context.params.id)
  if (isNaN(userId)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }

  const { name } = await req.json()
  if (!name) {
    return NextResponse.json({ error: 'Nama wajib diisi' }, { status: 400 })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
    })
    return NextResponse.json({ message: 'Nama user berhasil diubah', user: updatedUser })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengubah nama user' }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const userId = Number(context.params.id)
  if (isNaN(userId)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data user' }, { status: 500 })
  }
} 