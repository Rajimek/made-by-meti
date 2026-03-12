import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Rss, ChevronDown, ChevronUp, ExternalLink, Calendar, User, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { feedChannel, feedItems, feedXml } from "@/data/feed";

const Feed = () => {
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(feedChannel.feedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* 1. Page header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(250,40%,25%)] mb-5">
              <Rss size={24} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              RSS Feed
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              Subscribe to stay updated with tour dates, new releases, and news. Add the feed URL below to your favourite RSS reader.
            </p>
          </div>

          {/* 5. Copy RSS URL */}
          <div className="flex items-center gap-2 mb-12 max-w-lg mx-auto">
            <div className="flex-1 bg-secondary rounded-lg px-4 py-2.5 text-xs text-muted-foreground font-mono truncate border border-border">
              {feedChannel.feedUrl}
            </div>
            <button
              onClick={copyUrl}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-foreground text-background rounded-lg text-xs font-medium hover:opacity-90 transition-all shrink-0"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy URL"}
            </button>
          </div>

          {/* 2 & 3. Channel metadata */}
          <div className="bg-secondary/60 border border-border rounded-xl p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[hsl(250,40%,25%)] flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                LW
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-foreground text-lg tracking-tight">{feedChannel.title}</h2>
                <p className="text-muted-foreground text-sm mt-0.5">{feedChannel.description}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[11px] text-muted-foreground/70 font-mono">
                  <span>language: {feedChannel.language}</span>
                  <span>updates: {feedChannel.updatePeriod}</span>
                  <span>generator: {feedChannel.generator}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Feed items */}
          <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-5">Latest Items</h3>
          <div className="space-y-4 mb-12">
            {feedItems.map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="border border-border rounded-xl p-6 hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="font-semibold text-foreground leading-snug">{item.title}</h4>
                  <a
                    href={item.link}
                    className="shrink-0 text-muted-foreground/50 hover:text-foreground transition-colors"
                    aria-label="Open permalink"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground/70 mb-3">
                  <span className="flex items-center gap-1"><User size={10} /> {item.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(item.pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-medium">
                    <Tag size={8} /> {item.category}
                  </span>
                </div>

                <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
              </motion.article>
            ))}
          </div>

          {/* 6. Raw XML toggle */}
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-foreground/80 hover:bg-secondary/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <code className="text-[10px] px-1.5 py-0.5 bg-secondary rounded font-mono">XML</code>
                Raw Feed Source
              </span>
              {showRaw ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {showRaw && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border bg-secondary/30 p-6 overflow-x-auto">
                    <pre className="text-[11px] leading-relaxed font-mono text-foreground/70 whitespace-pre-wrap break-all">
                      {feedXml.split("\n").map((line, i) => {
                        // Basic syntax coloring via spans
                        const colored = line
                          .replace(/(&lt;|<)(\/?)([a-zA-Z:]+)/g, '<span class="text-[hsl(250,50%,55%)]">&lt;$2$3</span>')
                          .replace(/(\/?>)/g, '<span class="text-[hsl(250,50%,55%)]">$1</span>')
                          .replace(/([a-zA-Z:]+)(=)/g, '<span class="text-[hsl(200,60%,45%)]">$1</span>=')
                          .replace(/"([^"]*)"/g, '<span class="text-[hsl(140,40%,40%)]">"$1"</span>');
                        return (
                          <div key={i} className="flex">
                            <span className="select-none text-muted-foreground/30 w-8 shrink-0 text-right mr-4">{i + 1}</span>
                            <span dangerouslySetInnerHTML={{ __html: colored }} />
                          </div>
                        );
                      })}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Feed;
