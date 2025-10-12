"use client";

import { useEffect, useState } from "react";
import styles from "../componentStyles/products.module.css";

export type FiltersState = {
  query: string;
  minPrice: string; // keep as string to avoid uncontrolled->controlled warnings
  maxPrice: string;
  minScore: string;
};

export default function Filters({
  initial,
  onApply,
}: {
  initial?: FiltersState;
  onApply: (next: FiltersState) => void;
}) {
  // draft inputs (user types here)
  const [draft, setDraft] = useState<FiltersState>(
    initial ?? { query: "", minPrice: "", maxPrice: "", minScore: "" }
  );

  // keep draft in sync if parent changes applied filters
  useEffect(() => {
    if (initial) setDraft(initial);
  }, [initial]);

  const apply = () => onApply(draft);

  const clear = () =>
    onApply({ query: "", minPrice: "", maxPrice: "", minScore: "" });

  return (
    <div className={styles.filtersBar}>
      <div className={styles.filtersRow}>
        <input
          type="text"
          placeholder="Search name or description…"
          value={draft.query}
          onChange={(e) => setDraft((s) => ({ ...s, query: e.target.value }))}
          className={styles.input}
        />

        <input
          type="number"
          inputMode="decimal"
          placeholder="Min price"
          value={draft.minPrice}
          onChange={(e) => setDraft((s) => ({ ...s, minPrice: e.target.value }))}
          className={styles.input}
        />

        <input
          type="number"
          inputMode="decimal"
          placeholder="Max price"
          value={draft.maxPrice}
          onChange={(e) => setDraft((s) => ({ ...s, maxPrice: e.target.value }))}
          className={styles.input}
        />

        <input
          type="number"
          inputMode="decimal"
          placeholder="Min score"
          value={draft.minScore}
          onChange={(e) => setDraft((s) => ({ ...s, minScore: e.target.value }))}
          className={styles.input}
        />

        <button onClick={apply} className={styles.applyButton}>
          Apply filters
        </button>
        <button onClick={clear} className={styles.clearButton} title="Reset filters">
          Clear
        </button>
      </div>
    </div>
  );
}
