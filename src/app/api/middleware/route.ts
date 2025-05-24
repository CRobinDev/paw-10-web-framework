import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token tidak ada' }, { status: 401 })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    // Decode dan validasi JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    console.log(`user`, decoded)
    // Token valid, return user data
    return NextResponse.json({
      valid: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 })
  }
}