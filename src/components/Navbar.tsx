import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({
  children,
  href = "#",
  to,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
}) => {
  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 shadow-xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group py-0.5"
          onClick={closeMobileMenu}
        >
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg tracking-tight">
              LBES
            </span>
            <span className="w-[1px] h-3.5 bg-white/20" aria-hidden="true" />
            <span className="text-gray-400 font-normal text-lg tracking-tight">
              Mirror
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink href="/#how-it-works">How It Works</NavLink>
          <NavLink href="/#early-access">Early Access</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <GradientBorder
            gradient="from-orange-500 via-red-500 to-orange-600"
            containerClassName="rounded-full p-[1px]"
          >
            <Link
              to="/#early-access"
              className="flex items-center px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-colors group shadow-md"
            >
              <RollingText text="Join Early Access" />
            </Link>
          </GradientBorder>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 pt-20 pb-8"
          >
            <NavLink href="/#how-it-works" onClick={closeMobileMenu}>
              How It Works
            </NavLink>
            <NavLink href="/#early-access" onClick={closeMobileMenu}>
              Early Access
            </NavLink>
            <NavLink to="/contact" onClick={closeMobileMenu}>
              Contact
            </NavLink>
            <GradientBorder
              gradient="from-orange-500 via-red-500 to-orange-600"
              containerClassName="rounded-full p-[1px]"
            >
              <Link
                to="/#early-access"
                onClick={closeMobileMenu}
                className="flex items-center px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-colors group shadow-md"
              >
                <RollingText text="Join Early Access" />
              </Link>
            </GradientBorder>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
