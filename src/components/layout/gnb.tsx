'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const menuItems = [
  { name: 'Main', href: '/' },
  { name: 'AX Agency', href: '/ax' },
  { name: 'AEO', href: '/aeo' },
  { name: 'Marketing', href: '/marketing' },
  { name: 'Library', href: '/board' },
];

const getLogoSrc = (pathname: string) => {
  if (pathname.startsWith('/aeo')) return '/logos/logo-aeo.svg';
  if (pathname.startsWith('/ax')) return '/logos/logo-ax.svg';
  if (pathname.startsWith('/marketing')) return '/logos/logo-marketing.svg';
  return '/XNEX.svg';
};

export default function GNB() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logoSrc = getLogoSrc(pathname);

  // Home page uses Main as active
  const isHome = pathname === '/';

  return (
    <div className="gnb-container">
      <div className="gnb-inner-wrap">
        <Link href="/" className="gnb-logo-link" aria-label="XNEX">
          <Image 
            key={logoSrc}
            src={logoSrc} 
            alt="XNEX" 
            width={118} 
            height={16} 
            priority 
            onError={(e) => {
              // Fallback to default logo if specific one is missing
              const target = e.target as HTMLImageElement;
              if (target.src !== window.location.origin + '/XNEX.svg') {
                target.src = '/XNEX.svg';
              }
            }}
          />
        </Link>

        <div className="gnb-nav-links">
          {menuItems.map((item) => {
            const isActive = (item.href === '/' && isHome) || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('gnb-nav-item', isActive && 'active')}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <Link href="mailto:contact@xnex.kr" className="gnb-contact-btn hidden md:flex">
          <span>Contact</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7"></path>
            <path d="M7 7h10v10"></path>
          </svg>
        </Link>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <div className="p-2 text-white cursor-pointer" aria-label="Menu">
                <Menu size={24} />
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#05050cf0] border-none text-white">
              <SheetHeader>
                <SheetTitle className="text-white sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8 mt-20 px-10 items-center">
                {menuItems.map((item) => {
                  const isActive = (item.href === '/' && isHome) || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'text-2xl font-bold uppercase tracking-widest text-center transition-all',
                        isActive ? 'text-white' : 'text-white/60 hover:text-white'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <Link
                  href="mailto:contact@xnex.kr"
                  onClick={() => setOpen(false)}
                  className="gnb-contact-btn w-full mt-8 justify-center py-4 text-base"
                >
                  <span>Contact</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}