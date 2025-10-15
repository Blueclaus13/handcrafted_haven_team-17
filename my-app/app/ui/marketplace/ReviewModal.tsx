"use client";

import { useState } from "react";
import style from "@/app/ui/componentStyles/ReviewModal.module.css";

// Match  Prisma 'reviews' model
interface Review {
  id: string;
  product_id: string;
  score: number;
  summary: string;
  created_at: string;
  user_id?: string;
}

interface ReviewModalProps {
  productId: string;
  onClose: () => void;
  onReviewAdded: (review: Review) => void;
}

export default function ReviewModal({
  productId,
  onClose,
  onReviewAdded,
}: ReviewModalProps) {
  const [score, setScore] = useState<number | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          score: score ?? 0,
          summary,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit review");
      }

      const data: { review: Review } = await res.json();
      const newReview = data.review;

      onReviewAdded(newReview);
      setSuccess(true);
      setScore(null);
      setSummary("");
      setTimeout(() => onClose(), 1000); // auto-close modal after success
    } catch (err: unknown) {
      console.error("Error submitting review:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.modalBackdrop}>
      <div className={style.modal}>
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="score">Score (1–5)</label>
            <input
              id="score"
              type="number"
              min={1}
              max={5}
              step={0.1}
              className={style.input}
              value={score === null ? "" : score}
              onChange={(e) => {
                const val = e.target.value;
                setScore(val === "" ? null : Number(val));
              }}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              className={style.textarea}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          {error && <p className={style.error}>{error}</p>}
          {success && <p className={style.success}>Review submitted!</p>}

          <div className={style.actions}>
            <button
              type="submit"
              className={style.submitButton}
              disabled={loading}
            >
              {loading ? "⏳ Submitting..." : "Submit Review"}
            </button>

            <button
              type="button"
              className={style.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
