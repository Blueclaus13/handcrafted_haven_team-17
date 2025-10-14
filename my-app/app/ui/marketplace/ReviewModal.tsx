"use client";

import { useState } from "react";
import style from "@/app/ui/componentStyles/ReviewModal.module.css";

export default function ReviewModal({
  productId,
  onClose,
  onReviewAdded,
}: {
  productId: string;
  onClose: () => void;
  onReviewAdded: (review: any) => void;
}) {
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
            score,
            summary,
          }),
        });
      
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to submit review");
        }
      
        // get the new review with ID
        const data = await res.json(); // { review: {...} }
        const newReview = data.review; // extract the actual review
        onReviewAdded(newReview);
        setSuccess(true);
        setScore(null);
        setSummary("");
        setTimeout(() => onClose(), 1000); // auto-close modal after success
      } catch (err: any) {
        console.error("Error submitting review:", err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className={style.modalBackdrop}>
      <div className={style.modal}>
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="score">Score (1–5)</label>
          <input
            id="score"
            className={style.input}
            type="number"
            min={1}
            max={5}
            step="0.1"
            value={score === null ? "" : score}
            onChange={(e) => {
              const val = e.target.value;
              setScore(val === "" ? null : Number(val));
            }}
            required
          />

          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            className={style.textarea}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />

          {error && <p className={style.error}>{error}</p>}
          {success && <p className={style.success}>Review submitted!</p>}

          <div className={style.actions}>
            <button
              type="submit"
              className={style.submitButton}
              disabled={loading}
            >
              {loading ? (
                <span className={style.loading}>
                  {/* Optional spinner emoji or SVG */}
                  ⏳ Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
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
