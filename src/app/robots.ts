import { MetadataRoute } from "next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_ORIGIN || "https://invertislearn.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/admin",
          "/api/admin/",
          "/api/resources/submit"
        ],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
