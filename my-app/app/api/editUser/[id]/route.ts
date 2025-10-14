// app/api/editUser/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params; // ✅ fixed destructuring

        const contentType = req.headers.get("content-type") || "";
        interface UserUpdateData {
            firstname?: string;
            lastname?: string;
            username?: string;
            email?: string;
            password?: string;
            birthday?: string;
            description?: string;
            is_seller?: boolean;
            image_url?: string;
        }

        let data: UserUpdateData = {};
        let imagePath = "";

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();

            data.firstname = formData.get("firstname")?.toString() || "";
            data.lastname = formData.get("lastname")?.toString() || "";
            data.username = formData.get("username")?.toString() || "";
            data.email = formData.get("email")?.toString() || "";
            data.password = formData.get("password")?.toString() || "";
            data.birthday = formData.get("birthday")?.toString() || "";
            data.description = formData.get("description")?.toString() || "";
            data.is_seller = formData.get("is_seller") === "true";

            const file = formData.get("image_file") as File | null;

            if (file && file.size > 0) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const uploadDir = path.join(process.cwd(), "public", "users");
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const fileName = `${id}-${Date.now()}-${file.name}`;
                const filePath = path.join(uploadDir, fileName);
                fs.writeFileSync(filePath, buffer);

                // ✅ store clean path
                imagePath = `/users/${fileName}`;
            }
        } else {
            data = await req.json();
            imagePath = data.image_url ?? "";
        }

        const existingUser = await prisma.users.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        let hashedPassword = existingUser.password;
        if (data.password && data.password.trim() !== "") {
            hashedPassword = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = await prisma.users.update({
            where: { id },
            data: {
                firstname: data.firstname || existingUser.firstname,
                lastname: data.lastname || existingUser.lastname,
                username: data.username || existingUser.username,
                email: data.email || existingUser.email,
                password: hashedPassword,
                birthday: data.birthday
                    ? new Date(data.birthday)
                    : existingUser.birthday,
                description: data.description || existingUser.description,
                image_url: imagePath || existingUser.image_url,
                is_seller: data.is_seller ?? existingUser.is_seller,
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
