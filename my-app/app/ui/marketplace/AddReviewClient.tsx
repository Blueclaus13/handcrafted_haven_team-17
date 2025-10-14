"use client";

import { useState } from "react";
import style from "@/app/ui/componentStyles/ProductPage.module.css";
import ReviewModal from "./ReviewModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddReviewClient({
  productId,
  initialReviews,
}: {
  productId: string;
  initialReviews: any[];
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddReviewClick = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleReviewAdded = (newReview: any) => {
    // Ensure every review has a unique id
    if (!newReview.id) {
      newReview.id = crypto.randomUUID(); // fallback for client-only temporary ID
    }
    setReviews((prev) => [...prev, newReview]);
  };

  return (
    <section className={style.reviews}>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={style.reviewList}>
          {reviews.map((r) => (
            <li key={r.id} className={style.reviewItem}>
              <p className={style.reviewScore}>Score: {r.score}/5</p>
              <p>{r.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      <button className={style.addButton} onClick={handleAddReviewClick}>
        Add Review
      </button>

      {isModalOpen && (
        <ReviewModal
          productId={productId}
          onClose={() => setIsModalOpen(false)}
          onReviewAdded={handleReviewAdded}
        />
      )}
    </section>
  );
}
