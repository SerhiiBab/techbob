import Link from 'next/link'; 
import { getPosts } from '@/lib/api';

export const revalidate = 60; // ISR: пересборка главной страницы каждые 60 секунд

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">TechBOB News</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2">
            <Link href={`/news/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title} ({new Date(post.date).toLocaleDateString("de-DE")})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
