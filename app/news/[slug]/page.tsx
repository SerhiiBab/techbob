import { gql } from "graphql-request";
import client from "@/lib/graphql-client";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;

interface NewsPageProps {
  params: {
    slug: string;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
  postViews?: number;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const query = gql`
    query GetPostAndLatest($slug: String!) {
      posts(where: { name: $slug }) {
        nodes {
          id
          title
          content
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
      latest: posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          date
        }
      }
    }
  `;

  const data = await client.request<{
    posts: { nodes: Post[] };
    latest: { nodes: Post[] };
  }>(query, { slug: params.slug });

  const post = data.posts?.nodes?.[0];
  const latestPosts = data.latest?.nodes || [];

  if (!post) {
    return notFound();
  }

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 text-left">
      {/* Основной контент */}
      <article className="md:col-span-2">
        {/* Увеличиваем просмотры */}
        
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="flex items-center gap-4 mb-2">
          <time className="text-[12px] text-[#919191]">
            {new Date(post.date).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </time>
        </div>

        {post.featuredImage?.node?.sourceUrl && (
          <img
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            className="mx-auto my-4 rounded-lg"
          />
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Sidebar */}
      <aside className="md:col-span-1">
        <h2 className="text-xl font-semibold mb-4 text-[#82BCFF]">
          Neueste Beiträge
        </h2>
        <ul className="space-y-3">
          {latestPosts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/news/${p.slug}`}
                className="block hover:text-[#82BCFF]"
              >
                {p.title}
              </Link>
              <time className="block text-[12px] text-[#919191]">
                {new Date(p.date).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </time>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
