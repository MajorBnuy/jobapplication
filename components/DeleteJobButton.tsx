"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteJobButton({ id }: { id: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleClick = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      await fetch(`/api`, {
        method: 'DELETE',
        body: JSON.stringify({
          id,
        }),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        }
      });

      router.refresh();

      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setError(err as unknown as Error);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Removing...' : 'Remove'}
      </button>
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}