import client from './graphql-client';

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
}

const POSTS_QUERY = `
  query GetAllPosts {
    posts {
      nodes {
        id
        title
        slug
        date
      }
    }
  }
`;

interface GraphQLResponse {
  posts: {
    nodes: Post[];
  };
}

export async function getPosts(): Promise<Post[]> {
  const data = await client.request<GraphQLResponse>(POSTS_QUERY);
  return data.posts?.nodes || [];
}
