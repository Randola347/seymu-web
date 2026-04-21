"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import "./notifications.css"; // Internal import to ensure it loads with the component

export default function NewWoodAlert() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="new-wood-banner">
      <div className="new-wood-banner-content">
        <CheckCircle2 size={16} />
        Madera recién creada
      </div>
      <div className="new-wood-timer-container">
        <div className="new-wood-timer-bar"></div>
      </div>
    </div>
  );
}
