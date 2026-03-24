import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { User, Instagram, Mail, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import NewsletterModal from "@/components/NewsletterModal";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { to: "/shop", label: "SHOP" },
    { to: "/collections", label: "COLLECTIONS" },
    { to: "/shipping-returns", label: "SUPPORT" },
    { to: "/about", label: "ABOUT" },
    { to: "/account", label: "ACCOUNT" },
    ...(user?.role === "admin" ? [{ to: "/admin", label: "ADMIN" }] : []),
  ];

  const handleNavClick = () => {
    if (isMobile) setMobileMenuOpen(false);
  };

  const socials = (
    <>
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
            <Link to="/" className="brand-lockup" aria-label="MADE by Meti home">
              <span className="brand-title">MADE</span>
              <span className="brand-subtitle">by Meti</span>
            </Link>
          </div>
          {/* Desktop nav links */}
          <ul className="sidebar-nav sidebar-nav--desktop">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    color: location.pathname === link.to || location.pathname.startsWith(`${link.to}/`) ? "#000" : undefined,
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
            to="/account"
            className="sidebar-social-link"
            title={user ? "Account" : "Account"}
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
                    color: location.pathname === link.to || location.pathname.startsWith(`${link.to}/`) ? "#000" : undefined,
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
              to="/account"
              className="sidebar-social-link"
              onClick={handleNavClick}
              title={user ? "Account" : "Account"}
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
