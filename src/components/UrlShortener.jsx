import React, { useState, useEffect } from "react";
import { log } from "../utils/logger";
import { v4 as uuid } from "uuid";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [validity, setValidity] = useState("");
  const [shortUrls, setShortUrls] = useState(() => {
    return JSON.parse(localStorage.getItem("shortUrls")) || {};
  });

  useEffect(() => {
    localStorage.setItem("shortUrls", JSON.stringify(shortUrls));
  }, [shortUrls]);

  const handleShorten = () => {
    if (!url) return alert("Enter a URL");

    const code = customCode || uuid().slice(0, 6);
    if (shortUrls[code]) return alert("Shortcode already exists");

    const validFor = parseInt(validity) || 30;
    const expiry = Date.now() + validFor * 60 * 1000;

    const newEntry = {
      originalUrl: url,
      createdAt: Date.now(),
      expiresAt: expiry,
    };

    const updated = { ...shortUrls, [code]: newEntry };
    setShortUrls(updated);

    log("INFO", `Short URL created: ${code}`);
    alert(`Short URL created: /${code}`);
    setUrl("");
    setCustomCode("");
    setValidity("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>URL Shortener</h2>
      <input
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />
      <input
        placeholder="Custom shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />
      <br />
      <input
        placeholder="Validity (in minutes, optional)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        type="number"
      />
      <br />
      <button onClick={handleShorten}>Shorten</button>

      <h4>All Shortened URLs</h4>
      <ul>
        {Object.entries(shortUrls).map(([code, data]) => (
          <li key={code}>
            <strong>/{code}</strong> → {data.originalUrl}
          </li>
        ))}
      </ul>
    </div>
  );
}
