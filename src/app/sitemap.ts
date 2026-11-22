import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_ORIGIN || "https://invertislearn.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${appUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${appUrl}/engineering`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${appUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${appUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${appUrl}/career-pathways`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${appUrl}/phd`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${appUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${appUrl}/pyq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${appUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${appUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${appUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${appUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const programmes = await db.programme.findMany({
      where: { isActive: true },
      include: {
        curriculumVersions: {
          where: { isCurrent: true },
          include: {
            semesters: {
              include: {
                subjects: {
                  where: { isActive: true },
                  select: { code: true, updatedAt: true },
                },
              },
            },
          },
        },
      },
    });

    for (const prog of programmes) {
      routes.push({
        url: `${appUrl}/programmes/${encodeURIComponent(prog.code)}`,
        lastModified: prog.updatedAt || new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
      });

      routes.push({
        url: `${appUrl}/syllabus/${encodeURIComponent(prog.code)}`,
        lastModified: prog.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      const curriculum = prog.curriculumVersions[0];
      if (curriculum) {
        for (const sem of curriculum.semesters) {
          routes.push({
            url: `${appUrl}/syllabus/${encodeURIComponent(prog.code)}/semester/${sem.semesterNumber}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });

          for (const sub of sem.subjects) {
            routes.push({
              url: `${appUrl}/syllabus/${encodeURIComponent(prog.code)}/semester/${sem.semesterNumber}/${encodeURIComponent(sub.code)}`,
              lastModified: sub.updatedAt || new Date(),
              changeFrequency: "weekly",
              priority: 0.85,
            });
          }
        }
      }
    }
  } catch (error) {
    console.warn("Database unavailable during sitemap generation, falling back to static catalogue:", error);
    try {
      const cataloguePath = path.join(process.cwd(), "prisma", "catalogue.json");
      if (fs.existsSync(cataloguePath)) {
        const raw = JSON.parse(fs.readFileSync(cataloguePath, "utf8"));
        if (Array.isArray(raw.programmes)) {
          for (const prog of raw.programmes) {
            routes.push({
              url: `${appUrl}/syllabus/${encodeURIComponent(prog.code)}`,
              lastModified: new Date(),
              changeFrequency: "monthly",
              priority: 0.8,
            });
            if (Array.isArray(prog.semesters)) {
              for (const sem of prog.semesters) {
                routes.push({
                  url: `${appUrl}/syllabus/${encodeURIComponent(prog.code)}/semester/${sem.semesterNumber}`,
                  lastModified: new Date(),
                  changeFrequency: "monthly",
                  priority: 0.7,
                });
                if (Array.isArray(sem.subjects)) {
                  for (const sub of sem.subjects) {
                    routes.push({
                      url: `${appUrl}/syllabus/${encodeURIComponent(prog.code)}/semester/${sem.semesterNumber}/${encodeURIComponent(sub.code)}`,
                      lastModified: new Date(),
                      changeFrequency: "weekly",
                      priority: 0.85,
                    });
                  }
                }
              }
            }
          }
        }
      }
    } catch (fallbackError) {
      console.error("Failed to generate fallback sitemap:", fallbackError);
    }
  }

  return routes;
}
