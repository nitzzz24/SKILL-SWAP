import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, displayName, password } = await req.json();

    if (!email || !displayName) {
      return NextResponse.json(
        { error: "Email and Display Name are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Create User and their default Profile
    const newUser = await prisma.user.create({
      data: {
        email,
        role: "USER",
        profile: {
          create: {
            displayName,
            avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
            coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            bio: "Welcome to my new SkillSwap page!",
            location: "India",
            languages: "English",
            availability: JSON.stringify({
              "Monday": ["19:00 - 21:00"],
              "Saturday": ["10:00 - 12:00"]
            })
          }
        }
      },
      include: {
        profile: true
      }
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong creating your account." },
      { status: 500 }
    );
  }
}
