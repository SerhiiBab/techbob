"use client";

import CookieConsent from "react-cookie-consent";

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Akzeptieren"
      declineButtonText="Ablehnen"
      enableDeclineButton
      cookieName="mySiteCookieConsent"
      style={{ background: "#2B373B", padding: "15px 20px" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      declineButtonStyle={{ color: "#fff", background: "#888", fontSize: "13px" }}
      expires={150}
      onAccept={() => {
        // Здесь можно подключать Google Analytics или другие сервисы
        console.log("Cookies akzeptiert");
      }}
      onDecline={() => {
        console.log("Cookies abgelehnt");
        // Можно отключить трекеры
      }}
    >
      Diese Website verwendet Cookies, um das Nutzererlebnis zu verbessern.
    </CookieConsent>
  );
}