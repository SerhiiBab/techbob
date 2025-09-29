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
  title: string;
  content: string;
  date: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface GraphQLResponse {
  posts: {
    nodes: Post[];
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const query = gql`
    query GetPostAndLatest($slug: String!) {
      posts(where: { name: $slug }) {
        nodes {
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
  <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
  <time className="text-sm text-gray-500">
    {new Date(post.date).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })}
  </time>

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
        <h2 className="text-xl font-semibold mb-4 text-[#82BCFF]">Neueste Beiträge</h2>
        <ul className="space-y-3">
          {latestPosts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/news/${p.slug}`}
                className="block hover:text-[#82BCFF] text-500"
              >
                {p.title}
              </Link>
              <time className="block text-xs text-gray-500">
                 {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })}
              </time>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
