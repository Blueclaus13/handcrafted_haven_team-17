import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth"; // adjust path if needed
import Prisma from "@/prisma/lib/prisma"; // adjust path if needed
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {

    const prisma = Prisma;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image_file") as File || null;

    if (!name || !price) {
      return NextResponse.json(
        { success: false, error: "Name and price are required" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // If image is provided, save to /public/uploads/
    if (imageFile && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${imageFile.name}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);

      imageUrl = `/uploads/${filename}`;
    }

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price,
        image_url: imageUrl || "/images/products/default-product-image.png", // default image if none uploaded
        seller_id: session.user.id, // make sure `session.user.id` exists
      },
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
