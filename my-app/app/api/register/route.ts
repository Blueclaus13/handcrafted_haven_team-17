// app/api/editUser/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // ✅ Await params as required by Next.js 15+
    const { id } = await context.params;

    // ✅ Handle JSON body safely
    const body = await request.json();

    const {
      firstname,
      lastname,
      username,
      email,
      password,
      birthday,
      description,
      image_url,
      is_seller,
    } = body;

    // ✅ Check if user exists
    const existingUser = await prisma.users.findUnique({ where: { id } });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Hash password only if new one provided
    const hashedPassword =
      password && password.trim() !== ""
        ? await bcrypt.hash(password, 10)
        : existingUser.password;

    // ✅ Limit image_url length to avoid P2000 column overflow
    let safeImageUrl = image_url;
    if (safeImageUrl && safeImageUrl.length > 1000000) {
      // truncate if extremely long base64 (DB safety)
      safeImageUrl = safeImageUrl.slice(0, 1000000);
    }

    // ✅ Perform update
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        firstname,
        lastname,
        username: username || existingUser.username,
        email,
        password: hashedPassword,
        birthday: birthday ? new Date(birthday) : existingUser.birthday,
        description,
        image_url: safeImageUrl || existingUser.image_url,
        is_seller: is_seller ?? existingUser.is_seller,
        updated_at: new Date(),
      },
    });

    // ✅ Return redirect response
    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      redirect: "/profile",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Something went wrong while updating user." },
      { status: 500 }
    );
  }
}
