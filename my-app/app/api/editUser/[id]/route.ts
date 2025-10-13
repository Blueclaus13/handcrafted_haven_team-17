// app/api/editUser/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();

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

        // ✅ Check if the user exists
        const existingUser = await prisma.users.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // ✅ Hash password if it's being updated
        let hashedPassword = existingUser.password;
        if (password && password.trim() !== "") {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // ✅ Update user data
        const updatedUser = await prisma.users.update({
            where: { id },
            data: {
                firstname,
                lastname,
                username,
                email,
                password: hashedPassword,
                birthday: birthday ? new Date(birthday) : existingUser.birthday,
                description,
                image_url,
                is_seller,
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "User updated successfully",
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
