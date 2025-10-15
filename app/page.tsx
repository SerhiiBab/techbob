// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPosts, getCategoriesWithPosts, Post } from "@/lib/api";

export const revalidate = 60; // ISR: пересборка страницы каждые 60 секунд

export default async function Home() {
  const posts = await getPosts();
  const categories = await getCategoriesWithPosts();

  return (
    <div className="container mx-auto p-[10px] text-center">
      {/* --- Aktuell --- */}
      <section className="mb-10 md:p-[10px] rounded-[10px] mt-[80px] bg-[linear-gradient(90deg,rgba(229,7,254,0.10)_0%,rgba(67,72,104,0.16)_25%,rgba(153,143,75,0.21)_54%,rgba(87,50,50,0.40)_100%)]">
        <h1 className="text-3xl font-bold mb-4 text-left text-[20px] text-[#fff]">
          Aktuell
        </h1>
          <ul className="space-y-4 pb-4 flex flex-col justify-between md:flex-row md:flex-wrap gap-3">
          {posts.slice(0, 4).map((post: Post) => (
            <li
              key={post.id}
              className="flex flex-col items-center space-x-4 rounded-[5px] bg-[#222222e6] py-[5px] px-[8px] mb-0 md:w-[32%] border border-dashed border-[hsla(0,0%,100%,0.3)] rounded-[10px]"
            >
             

              <div className="text-left flex-1">
                {/* категория */}
                {post.category && (
                  <Link
                    href={`/news/category/${post.category.slug}`}
                    className="text-sm text-[#82BCFF] hover:underline"
                  >
                    {post.category.name}
                  </Link>
                )}

                {/* заголовок */}
                <Link
                  href={`/news/${post.slug}`}
                  className="font-medium hover:text-[#82BCFF] block"
                >
                  {post.title}
                </Link>

                {/* дата */}
                <span className="text-[12px] text-[#919191] block mt-1">
                  {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <ul className="space-y-4 flex flex-col justify-between md:flex-row md:flex-wrap gap-3">
          {posts.slice(3,12).map((post: Post) => (
            <li
              key={post.id}
              className="flex items-center space-x-4 rounded-[5px] bg-[#222222e6] py-[5px] px-[8px] mb-0 md:w-[49%] border border-dashed border-[hsla(0,0%,100%,0.3)] rounded-[10px]"
            >
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

              <div className="text-left flex-1">
                {/* категория */}
                {post.category && (
                  <Link
                    href={`/news/category/${post.category.slug}`}
                    className="text-sm text-[#82BCFF] hover:underline"
                  >
                    {post.category.name}
                  </Link>
                )}

                {/* заголовок */}
                <Link
                  href={`/news/${post.slug}`}
                  className="font-medium hover:text-[#82BCFF] block"
                >
                  {post.title}
                </Link>

                {/* дата */}
                <span className="text-[12px] text-[#919191] block mt-1">
                  {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Разделы по категориям --- */}
      {categories.map((category) => (
        <section key={category.id} className="mb-10 md:p-[10px] rounded-[10px]">
          <h2 className="text-2xl font-bold text-[20px] text-[#fff] mb-4 text-left">
            <Link
              href={`/news/category/${category.slug}`}
              className="hover:text-[#DEF200]"
            >
              {"["}{category.name} {"-->]"}
            </Link>
          </h2>
          <ul className="flex flex-col md:flex-row md:flex-wrap gap-3">
            {category.posts.slice(0, 8).map((post) => (
              <li
                key={post.id}
                className="flex items-center space-x-4 rounded-[5px] bg-[#222222e6] py-[5px] px-[8px] md:w-[49%] border border-dashed border-[hsla(0,0%,100%,0.3)] rounded-[10px]"
              >
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
                <div className="text-left flex-1">
                  {/* категория */}
                  {post.category && (
                    <Link
                      href={`/news/category/${post.category.slug}`}
                      className="text-sm text-[#82BCFF] hover:underline"
                    >
                      {post.category.name}
                    </Link>
                  )}

                  {/* заголовок */}
                  <Link
                    href={`/news/${post.slug}`}
                    className="font-medium hover:text-[#82BCFF] block"
                  >
                    {post.title}
                  </Link>

                  {/* дата */}
                  <span className="text-[12px] text-[#919191] block mt-1">
                    {new Date(post.date).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
