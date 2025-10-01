import client from './graphql-client';

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  image?: string | null;
  category?: {
    name: string;
    slug: string;
  };
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
        categories {
          nodes {
            name
            slug
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
      categories: {
        nodes: {
          name: string;
          slug: string;
        }[];
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
      category: post.categories.nodes[0] || undefined, // берем первую категорию
    })) || []
  );
}

const CATEGORIES_WITH_POSTS_QUERY = `
  query GetCategoriesWithPosts {
    categories {
      nodes {
        id
        name
        slug
        posts(first: 5) {   # можно ограничить количество постов
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
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

interface Category {
  id: string;
  name: string;
  slug: string;
  posts: Post[];
}

interface GraphQLCategoriesResponse {
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
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
          categories: {
            nodes: {
              name: string;
              slug: string;
            }[];
          };
        }[];
      };
    }[];
  };
}

export async function getCategoriesWithPosts(): Promise<Category[]> {
  const data = await client.request<GraphQLCategoriesResponse>(
    CATEGORIES_WITH_POSTS_QUERY
  );

  return (
    data.categories?.nodes.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      posts:
        cat.posts.nodes.map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          date: post.date,
          image: post.featuredImage?.node?.sourceUrl || null,
          category: post.categories.nodes[0] || undefined,
        })) || [],
    })) || []
  );
}
