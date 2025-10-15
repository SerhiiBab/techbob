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
  query GetPostsByCategory($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      name
      posts {
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
  }
`;

interface GraphQLResponse {
  category: {
    name: string;
    posts: {
      nodes: Post[];
    };
  };
}

const data = await client.request<GraphQLResponse>(query, { slug: params.slug });
const posts = data.category?.posts?.nodes || [];
const categoryName = data.category?.name || params.slug;

  if (!posts.length) {
    return <p className="text-center mt-6">Keine Beiträge in dieser Kategorie.</p>;
  }

  return (
    <div className="container mx-auto text-center p-6  p-[10px] rounded-[10px]">
      <h1 className="text-3xl font-bold mb-4 text-left text-[20px] text-[#fff] pt-[90px]">
  Alles zu {categoryName}
      </h1>
      <ul className="space-y-4 flex flex-col md:flex-row md:flex-wrap gap-3 flex-wrap justify-between">
        {posts.map((post) => (
          <li key={post.slug} className="flex items-center space-x-4 rounded-[5px] bg-[#1e1e1e] py-1.25 px-2 mb-0 md:w-[49%] border border-dashed border-[hsla(0,0%,100%,0.3)] rounded-[10px]">
            {post.featuredImage?.node?.sourceUrl && (
              <div className="w-20 h-20 relative flex-shrink-0">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                className="w-full object-cover rounded mb-2"
              /></div>
            )}
            
              <div className="flex flex-col text-left">
             
            <a
              href={`/news/${post.slug}`}
              className="font-medium hover:text-[#82BCFF] text-left w-full"
            >
              {post.title}
            </a>
             <time className="text-[12px] text-[#919191]">
               {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })}
            </time>
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
