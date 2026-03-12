import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Comments from "@/components/Comments";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const defaultCover = "https://images.unsplash.com/photo-1761792444425-1bae3ba0c86b?w=1600&q=80&auto=format&fit=crop";

interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  cover_image: string | null;
  published_at: string;
}

const NewsPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("news_posts")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data }) => {
        setPost(data as Post | null);
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
            <Link to="/news" className="text-sm underline text-foreground/60 mt-2 inline-block">
              ← Back to News
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
            <Link to="/news" className="text-xs uppercase tracking-wide text-foreground/50 hover:text-foreground/80 mb-4 inline-block">
              ← News
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
