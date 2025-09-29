// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, Post } from '@/lib/api';

export const revalidate = 60; // ISR: пересборка страницы каждые 60 секунд

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto text-center">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">TechBOB News</h1>
        <ul className="space-y-4 flex flex-col justify-between md:flex-row md:flex-wrap gap-3">
          {posts.map((post: Post) => (
            <li key={post.id} className="flex items-center space-x-4 rounded-[5px] bg-[#1e1e1e] pr-[5px] mb-0 md:w-[49%]">
              {/* картинка */}
              {post.image && (
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div className="text-left">
              {/* заголовок */}
              <Link
                href={`/news/${post.slug}`}
                className="font-medium hover:underline text-left"
              >
                <span className="font-medium">{post.title}</span>
                <br />
                
              </Link>
              <span className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })}
                </span>
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

