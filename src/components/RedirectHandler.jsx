import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { log } from "../utils/logger";

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("shortUrls")) || {};
    const entry = urls[shortcode];

    if (entry) {
      const now = Date.now();
      if (now <= entry.expiresAt) {
        log("INFO", `Redirected to ${entry.originalUrl}`);
        window.location.href = entry.originalUrl;
      } else {
        log("ERROR", `Expired shortcode: ${shortcode}`);
        alert("Link expired");
        navigate("/");
      }
    } else {
      log("ERROR", `Shortcode not found: ${shortcode}`);
      alert("Shortcode not found");
      navigate("/");
    }
  }, [shortcode, navigate]);

  return null;
}
