import client from './graphql-client';

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

export async function getPosts() {
  const data = await client.request(POSTS_QUERY);
  return data.posts?.nodes || [];
}
