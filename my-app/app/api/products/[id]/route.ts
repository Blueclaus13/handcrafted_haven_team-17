import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth"; // adjust path if needed
import  prisma  from "@/prisma/lib/prisma"; // adjust path if needed
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image_file") as File | null;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name valid is required" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // Handle new image upload (optional)
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

    const updatedProduct = await prisma.products.update({
      where: { id: (id) },
      data: {
        name,
        description,
        price,
        ...(imageUrl && { image_url: imageUrl }), // only update if new image uploaded
      },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}
