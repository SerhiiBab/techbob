import client from './graphql-client';

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  image?: string | null;
}

const POSTS_QUERY = `
  query GetAllPosts {
    posts {
      nodes {
        id
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

interface GraphQLResponse {
  posts: {
    nodes: {
      id: string;
      title: string;
      slug: string;
      date: string;
      featuredImage?: {
        node?: {
          sourceUrl: string;
        };
      };
    }[];
  };
}

export async function getPosts(): Promise<Post[]> {
  const data = await client.request<GraphQLResponse>(POSTS_QUERY);
  return (
    data.posts?.nodes.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      date: post.date,
      image: post.featuredImage?.node?.sourceUrl || null,
    })) || []
  );
}

