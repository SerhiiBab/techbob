// app/news/[slug]/page.tsx
import { gql } from "graphql-request";
import client from '@/lib/graphql-client';
import { notFound } from 'next/navigation'; // <-- вот сюда

export const revalidate = 60; // ISR: пересборка страницы каждые 60 секунд

interface NewsPageProps {
  params: {
    slug: string;
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

  const data = await client.request(query, { slug: params.slug });
  const post = data.posts?.nodes?.[0];

  // Если пост не найден — показать 404
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
