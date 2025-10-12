export const dynamic = 'force-dynamic';
export const revalidate = 0;

type WPPost = {
  slug: string;
  modified: string;
};

export async function GET() {
  const res = await fetch('https://cms.techbob.de/wp-json/wp/v2/posts?per_page=100');
  const posts: WPPost[] = await res.json();

  const urls = posts.map((post) => {
    // Преобразуем дату в ISO 8601 с временной зоной UTC
    const lastmod = new Date(post.modified).toISOString();

    return `
      <url>
        <loc>https://www.techbob.de/news/${post.slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  }).join('');

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
