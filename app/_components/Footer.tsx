'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, Send, CheckCircle, AlertCircle, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "About", href: "/about" },
];

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", hoverColor: "hover:text-blue-600" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", hoverColor: "hover:text-sky-500" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", hoverColor: "hover:text-pink-500" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", hoverColor: "hover:text-blue-700" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub", hoverColor: "hover:text-foreground" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <footer className="relative bg-linear-to-b from-background to-muted/30 border-t border-border">
      {/* Decorative linear orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <Image
                src="/logo.svg"
                alt="MilesToGo AI Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-bold text-xl linear-text">
                MilesToGo AI
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your AI-powered travel companion. Create personalized itineraries,
              discover hidden gems, and plan unforgettable journeys in seconds.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Worldwide • Remote-first</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get travel tips and exclusive offers delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  disabled={status === "loading"}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-[oklch(0.58_0.22_335)] to-[oklch(0.52_0.2_350)] hover:from-[oklch(0.54_0.22_335)] hover:to-[oklch(0.48_0.2_350)] text-white text-sm font-medium shadow-lg shadow-primary/25 transition-all duration-300 disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Subscribe
                  </>
                )}
              </button>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-sm text-emerald-600"
                >
                  <CheckCircle className="h-4 w-4" />
                  Subscribed successfully!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-sm text-red-500"
                >
                  <AlertCircle className="h-4 w-4" />
                  Something went wrong. Try again.
                </motion.p>
              )}
            </form>
          </div>

          {/* Social & Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <p className="text-sm text-muted-foreground">
              Follow us for travel inspiration and updates.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2.5 rounded-xl border border-border bg-background/50 text-muted-foreground ${social.hoverColor} hover:border-current hover:scale-110 transition-all duration-200`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="mt-6 p-4 rounded-xl bg-linear-to-br from-primary/5 to-[oklch(0.6_0.18_350)]/5 border border-primary/10">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">AI-Powered</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Trusted by 12k+ travelers worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MilesToGo AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
