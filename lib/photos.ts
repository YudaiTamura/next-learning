import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apiBaseUrl = "https://graphqlzero.almansi.me/api";

export type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export async function getAllPhotos(): Promise<Photo[]> {
  try {
    const client = new ApolloClient({
      uri: apiBaseUrl,
      cache: new InMemoryCache(),
    });
    const {
      data: {
        photos: { data: photos },
      },
    } = await client.query({
      query: gql`
        query getPhotos {
          photos(options: { paginate: { limit: 100 } }) {
            data {
              id
              title
              thumbnailUrl
            }
          }
        }
      `,
    });
    return photos as Photo[];
  } catch {
    return [];
  }
}
