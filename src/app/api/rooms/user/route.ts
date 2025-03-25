// src/app/api/rooms/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Find user in our database
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id }
    });
    
    if (!dbUser) {
      return NextResponse.json([]);
    }
    
    // Get rooms created by this user
    const rooms = await prisma.room.findMany({
      where: {
        creatorId: dbUser.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error fetching user rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user rooms' },
      { status: 500 }
    );
  }
}
