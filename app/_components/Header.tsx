"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

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
    <header
      className={`w-full px-4 md:px-6 lg:px-8 py-3 fixed top-0 z-50 transition-all duration-200 ${scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Miles2Go AI Logo"
            width={32}
            height={32}
          />
          <span className="font-semibold text-base md:text-lg text-foreground">
            Miles2Go AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {menuOptions.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${isActive(menu.path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              {menu.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + User */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <SignInButton mode="modal">
              <Button
                size="sm"
                className="gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Get Started
              </Button>
            </SignInButton>
          ) : path === "/create-new-trip" ? (
            <Link href="/my-trips">
              <Button
                size="sm"
                variant="outline"
              >
                My Trips
              </Button>
            </Link>
          ) : (
            <Link href="/create-new-trip">
              <Button
                size="sm"
                className="gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Create Trip
              </Button>
            </Link>
          )}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 border border-border hover:border-primary/50 transition-colors",
              },
            }}
          />
        </div>

        {/* Mobile: CTA + Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {!user ? (
            <SignInButton mode="modal">
              <Button size="sm" className="text-xs">
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
            className="action-icon"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <nav
            className="mt-3 p-2 rounded-lg panel space-y-1"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {menuOptions.map((menu, index) => (
              <Link
                key={index}
                href={menu.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(menu.path)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent text-foreground"
                  }`}
              >
                {menu.name}
              </Link>
            ))}

            {user && (
              <>
                <hr className="border-border my-2" />
                <div className="flex items-center gap-3 px-3 py-2">
                  <UserButton />
                  <span className="text-sm text-muted-foreground">My Account</span>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;