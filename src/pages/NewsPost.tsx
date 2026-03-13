import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Comments from "@/components/Comments";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import journalPosts, { type JournalPost } from "@/data/journal";
import { format } from "date-fns";

const defaultCover = journalPosts[0]?.cover_image ?? null;

const NewsPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<JournalPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    if (!hasSupabaseConfig) {
      setPost(journalPosts.find((entry) => entry.slug === slug) ?? null);
      setLoading(false);
      return;
    }

    supabase
      .from("news_posts")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setPost(journalPosts.find((entry) => entry.slug === slug) ?? null);
          setLoading(false);
          return;
        }

        setPost(data as JournalPost | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ padding: 6 }}>
            <p className="text-sm text-foreground/60">Loading…</p>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ padding: 6 }}>
            <p className="text-sm text-foreground/80">Post not found.</p>
            <Link to="/journal" className="text-sm underline text-foreground/60 mt-2 inline-block">
              ← Back to Journal
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 6 }}>
          <div className="bio-cover">
            <img
              src={post.cover_image || defaultCover}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          <div className="bio-text">
            <Link to="/journal" className="text-xs uppercase tracking-wide text-foreground/50 hover:text-foreground/80 mb-4 inline-block">
              ← Journal
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground mb-2">
              {post.title}
            </h1>
            <p className="text-xs text-foreground/50 mb-6">
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </p>
            <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line mb-10">
              {post.body}
            </div>

            <Comments contentType="news" contentId={post.slug} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsPost;
