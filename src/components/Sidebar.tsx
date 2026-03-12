import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { User, Apple, Instagram, Mail, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import NewsletterModal from "@/components/NewsletterModal";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const NoireLogo = () => (
  <svg viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 grayscale" style={{ width: 20, height: 20 }}>
    <mask id="sb-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="24" style={{ maskType: "alpha" as const }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.89785 0C10.7074 0 13.7957 3.17898 13.7957 7.10046V9.79908H16.0913C19.9009 9.79908 22.9892 12.9781 22.9892 16.8995C22.9892 20.821 19.9009 24 16.0913 24H0V7.10046C0 3.17898 3.08827 0 6.89785 0Z" fill="url(#sb-grad)" />
    </mask>
    <g mask="url(#sb-mask)">
      <g filter="url(#sb-f0)"><ellipse cx="10.0844" cy="12.8114" rx="15.5619" ry="15.9769" fill="#4B73FF" /></g>
      <g filter="url(#sb-f1)"><ellipse cx="11.7941" cy="4.04332" rx="19.9306" ry="15.9769" fill="#FF66F4" /></g>
      <g filter="url(#sb-f2)"><ellipse cx="15.0451" cy="1.037" rx="15.5619" ry="14.0311" fill="#FF0105" /></g>
      <g filter="url(#sb-f3)"><ellipse cx="12.071" cy="4.03913" rx="9.35889" ry="9.60846" fill="#FE7B02" /></g>
    </g>
    <defs>
      <filter id="sb-f0" x="-12.6378" y="-10.3257" width="45.4442" height="46.2743" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3.58011" result="blur" /></filter>
      <filter id="sb-f1" x="-15.2967" y="-19.0938" width="54.1815" height="46.2743" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3.58011" result="blur" /></filter>
      <filter id="sb-f2" x="-7.67707" y="-20.1544" width="45.4442" height="42.3827" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3.58011" result="blur" /></filter>
      <filter id="sb-f3" x="-4.44806" y="-12.7296" width="33.0382" height="33.5375" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3.58011" result="blur" /></filter>
      <linearGradient id="sb-grad" x1="7.73627" y1="4.21757" x2="15.0724" y2="23.8669" gradientUnits="userSpaceOnUse"><stop offset="0.025" stopColor="#FF8E63" /><stop offset="0.56" stopColor="#FF7EB0" /><stop offset="0.95" stopColor="#4B73FF" /></linearGradient>
    </defs>
  </svg>
);

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { to: "/music", label: "MUSIC" },
    { to: "/videos", label: "VIDEOS" },
    { to: "/tour", label: "TOUR" },
    { to: "/news", label: "NEWS" },
    { to: "/bio", label: "BIO" },
  ];

  const handleNavClick = () => {
    if (isMobile) setMobileMenuOpen(false);
  };

  const socials = (
    <>
      <a href="#" title="Spotify" className="sidebar-social-link">
        <SpotifyIcon />
      </a>
      <a href="#" title="Apple Music" className="sidebar-social-link">
        <Apple size={24} />
      </a>
      <a href="#" title="Instagram" className="sidebar-social-link">
        <Instagram size={24} />
      </a>
      <button
        onClick={() => { setNewsletterOpen(true); handleNavClick(); }}
        title="Newsletter"
        className="sidebar-social-link"
      >
        <Mail size={24} />
      </button>
    </>
  );

  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <Link to="/"><NoireLogo /></Link>
          </div>
          {/* Desktop nav links */}
          <ul className="sidebar-nav sidebar-nav--desktop">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    color: location.pathname === link.to ? "#000" : undefined,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop bottom */}
        <div className="sidebar-bottom sidebar-bottom--desktop">
          <div className="sidebar-socials">
            {socials}
          </div>
          <Link
            to="/login"
            className="sidebar-social-link"
            title={user ? "Account" : "Login"}
          >
            <User size={24} />
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="sidebar-hamburger"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay">
          <button
            className="mobile-overlay-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <ul className="mobile-overlay-nav">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={handleNavClick}
                  style={{
                    color: location.pathname === link.to ? "#000" : undefined,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-overlay-bottom">
            <div className="mobile-overlay-socials">
              {socials}
            </div>
            <Link
              to="/login"
              className="sidebar-social-link"
              onClick={handleNavClick}
              title={user ? "Account" : "Login"}
            >
              <User size={24} />
            </Link>
          </div>
        </div>
      )}

      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
    </>
  );
};

export default Sidebar;
