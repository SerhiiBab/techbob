export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // Пример получения данных из WordPress REST API
  const res = await fetch('https://www.techbob.de/wp-json/wp/v2/posts?per_page=100');
  const posts = await res.json();

  const urls = posts.map((post: any) => `
    <url>
      <loc>https://www.techbob.de/news/${post.slug}</loc>
      <lastmod>${post.modified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.techbob.de/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
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
