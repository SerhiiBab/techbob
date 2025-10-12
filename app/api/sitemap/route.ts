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
    // Преобразуем дату в формат ISO 8601 с учётом часового пояса Берлина
    const berlinTime = new Date(post.modified).toLocaleString('sv-SE', {
      timeZone: 'Europe/Berlin',
      hour12: false,
    });

    // Преобразуем в корректный ISO-формат (YYYY-MM-DDTHH:mm:ss+02:00)
    const [datePart, timePart] = berlinTime.split(' ');
    const offsetMinutes = new Date().getTimezoneOffset() * -1; // смещение локали (в минутах)
    const offsetHours = Math.floor(offsetMinutes / 60);
    const offset = `${offsetHours >= 0 ? '+' : '-'}${String(Math.abs(offsetHours)).padStart(2, '0')}:00`;

    const lastmod = `${datePart}T${timePart}${offset}`;

    return `
      <url>
        <loc>https://www.techbob.de/news/${post.slug}</loc>
        <lastmod>${lastmod}</lastmod>
      </url>
    `;
  }).join('');

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
