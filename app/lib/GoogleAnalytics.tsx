"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
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
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-J4DEVP6ZB7"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J4DEVP6ZB7');
        `,
        }}
      />
    </>
  );
}
