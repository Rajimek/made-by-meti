import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import journalPosts, { type JournalPost } from "@/data/journal";
import { format } from "date-fns";
import bioCover from "@/assets/bio-cover.jpg";

const coverImage = bioCover;

const News = () => {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setPosts(journalPosts);
      setLoading(false);
      return;
    }

    supabase
      .from("news_posts")
      .select("*")
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data?.length) {
          setPosts(journalPosts);
          setLoading(false);
          return;
        }

        setPosts((data as JournalPost[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 6 }}>
          <div className="bio-cover">
            <img
              src={coverImage}
              alt="Journal"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          <div className="bio-text">
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground mb-8">
              Journal
            </h1>

            {loading && <p className="text-sm text-foreground/60">Loading…</p>}

            {posts.map((post) => (
              <article key={post.id} className="mb-10">
                <Link
                  to={`/journal/${post.slug}`}
                  className="text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-foreground/50 mt-1 mb-2">
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                  {post.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default News;
