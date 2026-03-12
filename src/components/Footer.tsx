import { Youtube, Facebook, Instagram, Music } from "lucide-react";

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    aria-label={label}
    className="w-8 h-8 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-colors"
  >
    {children}
  </a>
);

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-10 px-6">
    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
      {/* Artist */}
      <div className="text-center md:text-left">
        <h4 className="text-[10px] font-medium mb-4 tracking-[0.35em] uppercase text-primary-foreground/40">
          Follow Ocean
        </h4>
        <div className="flex gap-1 justify-center md:justify-start">
          <SocialIcon href="#" label="YouTube"><Youtube size={16} /></SocialIcon>
          <SocialIcon href="#" label="Spotify"><Music size={16} /></SocialIcon>
          <SocialIcon href="#" label="Instagram"><Instagram size={16} /></SocialIcon>
          <SocialIcon href="#" label="Facebook"><Facebook size={16} /></SocialIcon>
        </div>
      </div>

      {/* Tideshift */}
      <div className="text-center md:text-right">
        <h4 className="text-[10px] font-medium mb-4 tracking-[0.35em] uppercase text-primary-foreground/40">
          Follow Tideshift
        </h4>
        <div className="flex gap-1 justify-center md:justify-end">
          <SocialIcon href="#" label="Facebook"><Facebook size={16} /></SocialIcon>
          <SocialIcon href="#" label="Instagram"><Instagram size={16} /></SocialIcon>
          <SocialIcon href="#" label="YouTube"><Youtube size={16} /></SocialIcon>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
