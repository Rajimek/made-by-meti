import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface CommentsProps {
  contentType: "music" | "video" | "news";
  contentId: string;
}

const Comments = ({ contentType, contentId }: CommentsProps) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", contentType, contentId],
    queryFn: async () => {
      // Fetch comments
      const { data: commentsData, error } = await supabase
        .from("comments")
        .select("id, text, created_at, user_id")
        .eq("content_type", contentType)
        .eq("content_id", contentId)
        .order("created_at", { ascending: false });
      if (error) throw error;

      // Fetch profiles for comment authors
      const userIds = [...new Set(commentsData.map(c => c.user_id))];
      const { data: profiles } = userIds.length > 0
        ? await supabase.from("profiles").select("id, username").in("id", userIds)
        : { data: [] as { id: string; username: string | null }[] };

      const profileMap = new Map((profiles || []).map(p => [p.id, p.username]));

      return commentsData.map(c => ({
        ...c,
        username: profileMap.get(c.user_id) || "User",
      }));
    },
  });

  const postMutation = useMutation({
    mutationFn: async (text: string) => {
      const { error } = await supabase.from("comments").insert({
        user_id: user!.id,
        content_type: contentType,
        content_id: contentId,
        text,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", contentType, contentId] });
      setNewComment("");
    },
  });

  const handlePost = () => {
    if (!newComment.trim()) return;
    postMutation.mutate(newComment.trim());
  };

  return (
    <div className="mt-auto">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
        Comments
      </h2>

      <div className="space-y-5 mb-8">
        {comments.map((c) => {
          const initials = (c.username || "U").slice(0, 2).toUpperCase();
          return (
            <div key={c.id} className="flex gap-3">
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">
                  {c.username} · {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                </p>
                <p className="text-sm text-foreground/90 mt-0.5">{c.text}</p>
              </div>
            </div>
          );
        })}
        {comments.length === 0 && (
          <p className="text-xs text-muted-foreground">No comments yet.</p>
        )}
      </div>

      {user ? (
        <>
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[60px] text-sm bg-muted/50 border-border mb-2"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={handlePost}
            disabled={postMutation.isPending}
            className="text-xs uppercase tracking-widest"
          >
            {postMutation.isPending ? "Posting..." : "Post"}
          </Button>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link to="/login" className="underline hover:text-foreground">Sign in</Link> to leave a comment.
        </p>
      )}
    </div>
  );
};

export default Comments;
