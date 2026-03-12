import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Videos", href: "#videos" },
  { label: "Releases", href: "#releases" },
  { label: "Calendar", href: "#calendar" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="grayscale" aria-label="Home">
          <svg viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
            <mask id="home-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="24" style={{ maskType: "alpha" }}>
              <path fillRule="evenodd" clipRule="evenodd" d="M6.89785 0C10.7074 0 13.7957 3.17898 13.7957 7.10046V9.79908H16.0913C19.9009 9.79908 22.9892 12.9781 22.9892 16.8995C22.9892 20.821 19.9009 24 16.0913 24H0V7.10046C0 3.17898 3.08827 0 6.89785 0Z" fill="url(#home-gradient)" />
            </mask>
            <g mask="url(#home-mask)">
              <g filter="url(#home-f0)"><ellipse cx="10.0844" cy="12.8114" rx="15.5619" ry="15.9769" fill="#4B73FF" /></g>
              <g filter="url(#home-f1)"><ellipse cx="11.7941" cy="4.04332" rx="19.9306" ry="15.9769" fill="#FF66F4" /></g>
              <g filter="url(#home-f2)"><ellipse cx="15.0451" cy="1.037" rx="15.5619" ry="14.0311" fill="#FF0105" /></g>
              <g filter="url(#home-f3)"><ellipse cx="12.071" cy="4.03913" rx="9.35889" ry="9.60846" fill="#FE7B02" /></g>
            </g>
            <defs>
              <filter id="home-f0" x="-12.6378" y="-10.3257" width="45.4442" height="46.2743" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3.58011" result="blur" /></filter>
              <filter id="home-f1" x="-15.2967" y="-19.0938" width="54.1815" height="46.2743" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3.58011" result="blur" /></filter>
              <filter id="home-f2" x="-7.67707" y="-20.1544" width="45.4442" height="42.3827" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3.58011" result="blur" /></filter>
              <filter id="home-f3" x="-4.44806" y="-12.7296" width="33.0382" height="33.5375" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3.58011" result="blur" /></filter>
              <linearGradient id="home-gradient" x1="7.73627" y1="4.21757" x2="15.0724" y2="23.8669" gradientUnits="userSpaceOnUse"><stop offset="0.025" stopColor="#FF8E63" /><stop offset="0.56" stopColor="#FF7EB0" /><stop offset="0.95" stopColor="#4B73FF" /></linearGradient>
            </defs>
          </svg>
        </Link>

        <nav className="hidden lg:flex gap-8 items-center">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-white text-sm tracking-wider uppercase hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-64 bg-black z-50 flex flex-col p-8 pt-20 gap-6 lg:hidden"
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <Link to="/" className="text-white text-lg tracking-wider uppercase">Home</Link>
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => { scrollTo(href); setMenuOpen(false); }}
                className="text-white text-lg tracking-wider uppercase text-left bg-transparent border-none cursor-pointer"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
