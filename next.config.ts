import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://upload-widget.cloudinary.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://res.cloudinary.com https://maps.gstatic.com https://*.googleapis.com https://*.ggpht.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://upload-widget.cloudinary.com https://www.google.com; connect-src 'self' https://api.cloudinary.com https://maps.googleapis.com;",
          },
        ],
      },
    ];
  },
};


export default nextConfig;
