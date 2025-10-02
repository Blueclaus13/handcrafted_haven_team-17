import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "@/prisma/lib/prisma";

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  userName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  birthday: z.string().transform((val) => new Date(val)),
  description: z.string().optional(),
  isSeller: z.boolean().optional(),
  imageUrl: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    // check if email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { userName: data.userName },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or username already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        password: hashedPassword,
        birthday: data.birthday,
        description: data.description,
        isSeller: data.isSeller ?? false,
        imageUrl: data.imageUrl,
      },
    });

    return NextResponse.json(
      { user: { id: user.id, email: user.email, userName: user.userName } },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}