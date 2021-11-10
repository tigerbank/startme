import { gql } from '@apollo/client';

const GET_ALL_RESTAURANTS = gql`
  query {
    restaurants {
      id
      name
      location
      detail
      main_image {
        url
        alternativeText
      }
    }
  }
`;

export { GET_ALL_RESTAURANTS };
