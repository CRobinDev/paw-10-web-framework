import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { name, email, password }: { name: string, email: string; password: string } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    return NextResponse.json({ message: 'User terdaftar', user: { email: user.email } })
  } catch (error) {
    return NextResponse.json({ error: 'Email sudah digunakan' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data user' }, { status: 500 })
  }
}