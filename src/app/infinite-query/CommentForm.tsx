import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateCommentMutation } from "./use-comments-query";
import { toast } from "sonner";

export function CommentForm() {
  const [commentText, setCommentText] = useState("");

  const mutation = useCreateCommentMutation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!commentText.trim()) return;

    mutation.mutate(
      { text: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          toast("Comments created successfully!");
        },
        onError: () => {
          toast.error("Error creating comment!");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1"
        disabled={mutation.isPending}
      />
      <Button type="submit" disabled={!commentText.trim() || mutation.isPending}>
        {mutation.isPending ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
