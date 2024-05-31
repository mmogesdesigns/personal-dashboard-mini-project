import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USER_ALBUMS = gql`
  query GetUserAlbums($userId: ID!) {
    user(id: $userId) {
      albums {
        id
        title
        photos {
          id
          thumbnailUrl
        }
      }
    }
  }
`;

const Albums: React.FC<{ userId: string }> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_ALBUMS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { albums } = data.user;

  return (
    <div>
      <h2>Albums</h2>
      {albums.map((album: any) => (
        <div key={album.id}>
          <h3>{album.title}</h3>
          <div>
            {album.photos.map((photo: any) => (
              <img key={photo.id} src={photo.thumbnailUrl} alt="photo" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums;
