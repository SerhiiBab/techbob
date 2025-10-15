"use client";

import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieConsentBanner() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mySiteCookieConsent");
    if (consent === "true") {
      setConsentGiven(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mySiteCookieConsent", "true");
    setConsentGiven(true);
    // Здесь можно подключать, например, Google Analytics
  };

  if (consentGiven) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="Akzeptieren"
      cookieName="mySiteCookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
      onAccept={handleAccept}
    >
      Diese Website verwendet Cookies, um das Nutzererlebnis zu verbessern.
    </CookieConsent>
  );
}
