import { gql } from "graphql-request";
import client from "@/lib/graphql-client";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

interface Post {
  title: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}

interface GraphQLResponse {
  posts: {
    nodes: Post[];
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const query = gql`
    query GetPostsByCategory($slug: String!) {
      posts(where: { categoryName: $slug }) {
        nodes {
          title
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const data = await client.request<GraphQLResponse>(query, { slug: params.slug });
  const posts = data.posts?.nodes || [];

  if (!posts.length) {
    return <p className="text-center mt-6">Keine Beiträge in dieser Kategorie.</p>;
  }

  return (
    <div className="container mx-auto text-center p-6">
      <h1 className="text-3xl font-bold mb-6">Beiträge in {params.slug}</h1>
      <ul className="space-y-4 flex flex-col md:flex-row gap-3 flex-wrap justify-center">
        {posts.map((post) => (
          <li key={post.slug} className="flex flex-col items-center w-60">
            {post.featuredImage?.node?.sourceUrl && (
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <a
              href={`/news/${post.slug}`}
              className="font-medium hover:text-[#82BCFF] text-left w-full"
            >
              {post.title}
            </a>
            <time className="text-sm text-gray-500">
               {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
