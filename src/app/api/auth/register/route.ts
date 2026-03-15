import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role, name, companyName } = body;

    // Validate Input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    if (!role || !['SEEKER', 'EMPLOYER'].includes(role)) {
      return NextResponse.json({ message: "Valid role (SEEKER or EMPLOYER) is required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 });
    }

    // Hash Password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User & Profile in a transaction
    const newUser = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          role,
        },
      });

      if (role === 'SEEKER') {
        await tx.seekerProfile.create({
          data: {
            userId: user.id,
            name: name || email.split('@')[0],
          },
        });
      } else if (role === 'EMPLOYER') {
        await tx.employerProfile.create({
          data: {
            userId: user.id,
            companyName: companyName || "My Company",
          },
        });
      }

      return user;
    });

    // Don't leak password hash
    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 });
  }
}
