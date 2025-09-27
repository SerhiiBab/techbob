"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", "G-J4DEVP6ZB7", {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      {/* Загрузка GA скрипта */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-J4DEVP6ZB7"
        strategy="afterInteractive"
      />
      
      {/* Инициализация GA */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J4DEVP6ZB7');
        `}
      </Script>
    </>
  );
}
