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
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.date).toLocaleDateString("de-DE")}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
