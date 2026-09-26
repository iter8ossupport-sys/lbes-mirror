import React from "react";
import { Link } from "react-router-dom";

const FooterLink = ({
  href = "#",
  to,
  children,
}: {
  href?: string;
  to?: string;
  children: React.ReactNode;
}) => {
  if (to) {
    return (
      <Link
        to={to}
        className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 duration-300 block"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 duration-300 block"
    >
      {children}
    </a>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full px-4 md:px-6 pb-8 pt-0 relative z-20">
      <div className="max-w-7xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden">
        <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-[0_0_15px_rgba(77,121,255,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 rounded-full"></div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-bold text-xl tracking-tight">
                  LBES
                </span>
                <span className="text-gray-400 font-medium text-xl tracking-tight">
                  Mirror
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Compare your defined strategy with your actual trading history.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Product</h4>
            <FooterLink href="/#how-it-works">How It Works</FooterLink>
            <FooterLink href="/#early-access">Early Access</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
            <FooterLink to="/dashboard">Dashboard</FooterLink>
          </div>

          {/* Links Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Legal</h4>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms-conditions">Terms & Conditions</FooterLink>
            <FooterLink to="/refund-policy">Refund Policy</FooterLink>
          </div>

          {/* Links Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Connect</h4>
            <FooterLink to="/contact">Contact</FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 p-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/20">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LBES Mirror. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
