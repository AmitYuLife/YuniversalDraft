"use client";

import { useEffect, useState } from "react";
import type { SiteNavigation } from "@/lib/cms";
import { Button, Container } from "@/design-system";
import { Logo } from "@/components/ui";

interface HeaderProps {
  navigation: SiteNavigation;
  scrollBehavior?: boolean;
}

export function Header({ navigation, scrollBehavior = false }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(!scrollBehavior);

  useEffect(() => {
    if (!scrollBehavior) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Show header as soon as user starts scrolling
      if (scrollPosition > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollBehavior]);

  return (
    <header 
      className={`fixed top-0 z-50 w-full border-b border-border-default bg-surface-primary/95 backdrop-blur-sm ${
        scrollBehavior 
          ? `transition-transform ${isVisible ? 'translate-y-0 duration-300 ease-out' : '-translate-y-full duration-[60ms] ease-in'}`
          : ''
      }`}
    >
      <Container size="xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Logo size={32} color="var(--color-brand-600)" />
            <span className="text-xl font-bold text-text-primary">YuLife</span>
          </a>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigation.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button variant="primary" size="sm">
              Get a demo
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
