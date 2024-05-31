import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!) {
    user(id: $userId) {
      posts {
        id
        title
        body
      }
    }
  }
`;

const Posts: React.FC<{ userId: string }> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_POSTS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { posts } = data.user;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
