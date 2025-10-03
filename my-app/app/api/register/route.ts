// app/api/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Destructure with cleaner names from frontend payload
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      birthday,
      description,
      isSeller,
    } = body;

    // ✅ Check for existing user by email or username
    const userExists = await prisma.users.findFirst({
      where: {
        OR: [{ email }, { username: userName }],
      },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "Email or username already taken" },
        { status: 400 }
      );
    }

    // ✅ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const createdUser = await prisma.users.create({
      data: {
        id: crypto.randomUUID(),       // maps to "id" in schema
        firstname: firstName,          // maps to "firstname" in schema
        lastname: lastName,            // maps to "lastname" in schema
        username: userName,            // maps to "username" in schema
        email,                         // schema: "email"
        password: hashedPassword,      // schema: "password"
        birthday: new Date(birthday),  // schema: "birthday"
        description: description || null, // schema: "description"
        is_seller: isSeller,           // schema: "is_seller"
        created_at: new Date(),        // schema: "created_at"
        updated_at: new Date(),        // schema: "updated_at"
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: createdUser.id,
        email: createdUser.email,
      },
    });
  } catch (err) {
    console.error("Error registering user:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
