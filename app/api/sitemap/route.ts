export const dynamic = 'force-dynamic';
export const revalidate = 0;

type WPPost = {
  slug: string;
  modified: string;
};

export async function GET() {
  const res = await fetch('https://cms.techbob.de/wp-json/wp/v2/posts?per_page=100');
  const posts: WPPost[] = await res.json();

  const urls = posts.map((post) => `
    <url>
      <lastmod>${post.modified}</lastmod>
      <loc>https://www.techbob.de/news/${post.slug}</loc>
    </url>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.techbob.de/</loc>
    </url>
    ${urls}
  </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}