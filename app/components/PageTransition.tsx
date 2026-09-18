// components/PageTransition.tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const el = document.querySelector('.page-content');
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
