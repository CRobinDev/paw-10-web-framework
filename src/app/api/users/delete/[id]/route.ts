import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id)
  if (isNaN(userId)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    })
    return NextResponse.json({ message: 'User berhasil dihapus' })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus user' }, { status: 500 })
  }
}