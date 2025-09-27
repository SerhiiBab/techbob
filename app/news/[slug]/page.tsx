import { gql } from "graphql-request";
import client from '@/lib/graphql-client';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface NewsPageProps {
  params: {
    slug: string;
  };
}

// Тип данных, который вернёт GraphQL
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
  query GetPostBySlug($slug: String!) {
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
  }
`;

  // Явно указываем тип
  const data = await client.request<GraphQLResponse>(query, { slug: params.slug });
  const post = data.posts?.nodes?.[0];

  if (!post) {
    return notFound();
  }

  return (
  <div className="container mx-auto text-center">
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.date).toLocaleDateString("de-DE")}</time>

      {post.featuredImage?.node?.sourceUrl && (
        <img
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          className="mx-auto my-4 rounded-lg"
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  </div>
);
}
