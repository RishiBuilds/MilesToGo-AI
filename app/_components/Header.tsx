"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const menuOptions = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "About Us", path: "/about" },
];

const Header = () => {
  const { user } = useUser();
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (menuPath: string) => {
    if (menuPath === "/") return path === "/";
    return path.startsWith(menuPath);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full px-4 md:px-6 lg:px-8 py-3 fixed top-0 z-50 transition-all duration-300 ${scrolled
        ? "glass shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Image
              src="/logo.svg"
              alt="MilesToGo AI Logo"
              width={36}
              height={36}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-bold text-lg md:text-xl gradient-text">
            MilesToGo AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {menuOptions.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive(menu.path)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {menu.name}
              {isActive(menu.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + User */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <SignInButton mode="modal">
              <Button
                size="sm"
                variant="ghost"
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Get Started
              </Button>
            </SignInButton>
          ) : path === "/create-new-trip" ? (
            <Link href="/my-trips">
              <Button
                size="sm"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
              >
                My Trips
              </Button>
            </Link>
          ) : (
            <Link href="/create-new-trip">
              <Button
                size="sm"
                variant="ghost"
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Create Trip
              </Button>
            </Link>
          )}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all",
              },
            }}
          />
        </div>

        {/* Mobile: CTA + Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          {!user ? (
            <SignInButton mode="modal">
              <Button size="sm" variant="ghost" className="text-xs">
                Get Started
              </Button>
            </SignInButton>
          ) : (
            <Link href={path === "/create-new-trip" ? "/my-trips" : "/create-new-trip"}>
              <Button size="sm" variant="ghost" className="text-xs">
                {path === "/create-new-trip" ? "My Trips" : "New Trip"}
              </Button>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <nav className="mt-4 p-4 rounded-2xl glass space-y-1">
              {menuOptions.map((menu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={menu.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive(menu.path)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent text-foreground"
                      }`}
                  >
                    {menu.name}
                  </Link>
                </motion.div>
              ))}

              {user && (
                <>
                  <hr className="border-border my-3" />
                  <div className="flex items-center gap-3 px-4 py-2">
                    <UserButton />
                    <span className="text-sm text-muted-foreground">My Account</span>
                  </div>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;