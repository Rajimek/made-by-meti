
CREATE TABLE public.news_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body TEXT NOT NULL,
  cover_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "News posts are viewable by everyone"
ON public.news_posts FOR SELECT
USING (true);

CREATE POLICY "Only service role can insert news posts"
ON public.news_posts FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only service role can update news posts"
ON public.news_posts FOR UPDATE
USING (false);

CREATE POLICY "Only service role can delete news posts"
ON public.news_posts FOR DELETE
USING (false);
