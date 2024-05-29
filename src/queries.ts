import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
query GetUserProfile{
    user(id:"1"){
        id,
        name,
        username,
        email,
        address{
            street,
            city,
            zipcode
        },
        phonem,
        website,
        company{name}

    }

}`;

export const GET_USER_POSTS = gql`
    query GetUserPosts{
        user(id:"1"){
            posts{
                data{
                    id,
                    title,
                    body
                }
            }
        }
    }
`;
