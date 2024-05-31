import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      address {
        street
        city
        zipcode
      }
      phone
      website
      company {
        name
        catchPhrase
      }
    }
  }
`;

const Profile: React.FC<{ userId: string }> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { user } = data;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>
        Company: {user.company.name} - {user.company.catchPhrase}
      </p>
      <p>
        Address: {user.address.street}, {user.address.city},{" "}
        {user.address.zipcode}
      </p>
    </div>
  );
};

export default Profile;
