import { NextResponse } from "next/server";
import client from "@/lib/graphql-client";

async function fetchAllPosts() {
  let posts: any[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const query = `
      query GetPosts($after: String) {
        posts(first: 100, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            slug
            modified
          }
        }
      }
    `;

    const data = await client.request(query, { after: endCursor });

    posts = [...posts, ...data.posts.nodes];
    hasNextPage = data.posts.pageInfo.hasNextPage;
    endCursor = data.posts.pageInfo.endCursor;
  }

  return posts;
}

export async function GET() {
  try {
    const posts = await fetchAllPosts();

    const urls = posts
      .map(
        (post: any) => `
      <url>
        <loc>https://techbob.de/news/${post.slug}</loc>
        <lastmod>${new Date(post.modified).toISOString()}</lastmod>
      </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://techbob.de/</loc>
  </url>
  ${urls}
</urlset>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
