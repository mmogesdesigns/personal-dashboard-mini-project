import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const GET_POST_DETAILS = gql`
  query GetPostDetails($postId: ID!) {
    post(id: $postId) {
      id
      title
      body
      comments {
        id
        name
        body
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(id: $postId)
  }
`;

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_POST_DETAILS, {
    variables: { postId },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId },
    onCompleted: () => navigate("/posts"),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { post } = data;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h3>Comments</h3>
      <ul>
        {post.comments.map((comment: any) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => deletePost()}>Delete Post</button>
    </div>
  );
};

export default PostDetails;
