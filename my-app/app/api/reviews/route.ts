import { NextResponse } from "next/server";
import prisma from "@/prisma/lib/prisma";

interface ReviewRequestBody {
  product_id: string;
  score: number;
  summary: string;
}

/**
 * POST /api/reviews
 * Create a new review
 */
export async function POST(req: Request) {
  try {
    const body: ReviewRequestBody = await req.json();

    const { product_id, score, summary } = body;

    if (!product_id || score === undefined || !summary) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReview = await prisma.reviews.create({
      data: {
        product_id,
        score: parseFloat(score as unknown as string) || score,
        summary,
      },
    });

    return NextResponse.json({ review: newReview }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reviews?product_id=UUID
 * Get all reviews for a product
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    if (!product_id) {
      return NextResponse.json({ error: "Missing product_id" }, { status: 400 });
    }

    const reviews = await prisma.reviews.findMany({
      where: { product_id },
      orderBy: { id: "desc" }, // use created_at if you add that column
    });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}