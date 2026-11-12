/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [{ source: "/uploads/:path*", destination: "/api/files/:path*" }];
  },
  async redirects() {
    return [
      // Universal Lateral Entry Consolidation 301 Redirects
      // B.Tech CSE (Regular) Lateral Entry aliases
      { source: "/programmes/BTECH-CSE-LAT", destination: "/programmes/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/programmes/BTECH-CSE-LE", destination: "/programmes/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/syllabus/BTECH-CSE-LAT", destination: "/syllabus/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/syllabus/BTECH-CSE-LE", destination: "/syllabus/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/syllabus/BTECH-CSE-LAT/semester/:sem", destination: "/syllabus/BTECH-CSE/semester/:sem?entry=lateral", permanent: true },
      { source: "/syllabus/BTECH-CSE-LE/semester/:sem", destination: "/syllabus/BTECH-CSE/semester/:sem?entry=lateral", permanent: true },
      { source: "/pyq/BTECH-CSE-LAT", destination: "/pyq/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/pyq/BTECH-CSE-LAT/:path*", destination: "/pyq/BTECH-CSE/:path*?entry=lateral", permanent: true },
      { source: "/pyq/BTECH-CSE-LE", destination: "/pyq/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/pyq/BTECH-CSE-LE/:path*", destination: "/pyq/BTECH-CSE/:path*?entry=lateral", permanent: true },
      { source: "/notes/BTECH-CSE-LAT", destination: "/notes/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/notes/BTECH-CSE-LAT/:path*", destination: "/notes/BTECH-CSE/:path*?entry=lateral", permanent: true },
      { source: "/notes/BTECH-CSE-LE", destination: "/notes/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/notes/BTECH-CSE-LE/:path*", destination: "/notes/BTECH-CSE/:path*?entry=lateral", permanent: true },
      { source: "/labs/BTECH-CSE-LAT", destination: "/labs/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/labs/BTECH-CSE-LAT/:path*", destination: "/labs/BTECH-CSE/:path*?entry=lateral", permanent: true },
      { source: "/labs/BTECH-CSE-LE", destination: "/labs/BTECH-CSE?entry=lateral", permanent: true },
      { source: "/labs/BTECH-CSE-LE/:path*", destination: "/labs/BTECH-CSE/:path*?entry=lateral", permanent: true },

      // B.Tech CSE (Cloud Computing) official code alias BTECH-019
      { source: "/programmes/BTECH-019", destination: "/programmes/BTECH-CSE-CC", permanent: false },
      { source: "/syllabus/BTECH-019", destination: "/programmes/BTECH-CSE-CC", permanent: false },
      { source: "/programmes/BTECH-CSE-AI-LE", destination: "/programmes/BTECH-CSE-AI?entry=lateral", permanent: true },
      { source: "/syllabus/BTECH-CSE-AI-LE", destination: "/syllabus/BTECH-CSE-AI?entry=lateral", permanent: true },
      { source: "/syllabus/BTECH-CSE-AI-LE/semester/:sem", destination: "/syllabus/BTECH-CSE-AI/semester/:sem?entry=lateral", permanent: true },
      { source: "/pyq/BTECH-CSE-AI-LE", destination: "/pyq/BTECH-CSE-AI?entry=lateral", permanent: true },
      { source: "/pyq/BTECH-CSE-AI-LE/:path*", destination: "/pyq/BTECH-CSE-AI/:path*?entry=lateral", permanent: true },
      { source: "/notes/BTECH-CSE-AI-LE", destination: "/notes/BTECH-CSE-AI?entry=lateral", permanent: true },
      { source: "/notes/BTECH-CSE-AI-LE/:path*", destination: "/notes/BTECH-CSE-AI/:path*?entry=lateral", permanent: true },
      { source: "/labs/BTECH-CSE-AI-LE", destination: "/labs/BTECH-CSE-AI?entry=lateral", permanent: true },
      { source: "/labs/BTECH-CSE-AI-LE/:path*", destination: "/labs/BTECH-CSE-AI/:path*?entry=lateral", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ] }];
  },
};

// Development must never overwrite the output served by `next start`.
export default (phase) => ({
  ...nextConfig,
  distDir: phase === "phase-development-server" ? ".next-dev" : ".next",
});
