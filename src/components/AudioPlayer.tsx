import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  index: number;
}

const AudioPlayer = ({ title, index }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * (audioRef.current.duration || 0);
  };

  // Parse title parts: "Luna Waves ° Chromascape ° Jan 2026"
  const parts = title.split(" ° ");
  const label = parts[1] || title;
  const date = parts[2] || "";

  return (
    <div
      className={`group flex items-center gap-4 py-4 border-b border-border/40 last:border-b-0 transition-colors duration-200 cursor-pointer ${hovered ? "bg-muted/30" : ""} -mx-4 px-4 rounded-md`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Track number / play button */}
      <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
        {hovered || playing ? (
          <button
            onClick={toggle}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background transition-all duration-200 hover:scale-105"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" className="ml-0.5" />}
          </button>
        ) : (
          <span className="text-[11px] font-mono text-muted-foreground/40 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-foreground/90 leading-tight truncate tracking-wide">
          {label}
        </p>
        {date && (
          <p className="text-[11px] text-muted-foreground/50 mt-0.5 tracking-wider uppercase">
            {date}
          </p>
        )}

        {/* Progress bar — visible when playing */}
        {playing && (
          <div
            className="mt-2 h-[2px] bg-border/60 rounded-full overflow-hidden cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-foreground/60 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className={`flex-shrink-0 transition-colors duration-200 ${hovered || playing ? "text-muted-foreground/50 hover:text-foreground" : "text-transparent"}`}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
      </button>

      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setProgress((audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100);
          }
        }}
        onEnded={() => { setPlaying(false); setProgress(0); }}
      />
    </div>
  );
};

export default AudioPlayer;
