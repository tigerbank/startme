import { gql } from '@apollo/client';

const GET_ALL_RESTAURANTS = gql`
  query {
    restaurants {
      id
      name
      location
      detail
      main_image {
        alternativeText
        hash
        url
      }
    }
  }
`;

const GET_ALL_NAVIGATIONS = gql`
  query {
    navigations {
      id
      title
      page {
        slug
      }
    }
  }
`;

export { GET_ALL_NAVIGATIONS, GET_ALL_RESTAURANTS };
