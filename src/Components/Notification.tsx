"use client";

import { useState, useEffect } from "react";

interface NotificationProps {
  color: string;
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Notification({ color, message, show, onClose }: NotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${color} text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50 ${show ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      {message}
    </div>
  );
}
