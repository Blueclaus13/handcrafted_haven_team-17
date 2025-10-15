import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Prisma from "@/prisma/lib/prisma";
import fs from "fs";
import path from "path";
import { string } from "zod";


const prisma = Prisma;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // 🔐 1️⃣ Check authentication
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ 2️⃣ Get the seller id from session
    const sellerId = (session.user.id);
    console.log("Authenticated seller ID:", sellerId);
    if ((!sellerId)) {
      return NextResponse.json({ error: "Invalid seller ID" }, { status: 400 });
    }

    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = formData.get("price")?.toString() || "";
    const imageFile = formData.get("image_file") as File | null;

    if (!name || !price || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 🖼 3️⃣ Handle optional image upload
    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "products");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      imageUrl = `/products/${fileName}`;
    }

    // 💾 4️⃣ Save to database
    const newProduct = await prisma.products.create({
      data: {
        name,
        description,
        price,
        image_url: imageUrl,
        seller_id: sellerId,
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Something went wrong while adding product." },
      { status: 500 }
    );
  }
}