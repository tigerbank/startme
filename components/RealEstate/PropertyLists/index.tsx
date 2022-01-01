import React, { useState } from 'react';
import { ListItem, UnorderedList, Box } from '@chakra-ui/react';
import { PropertyProps } from '@/interfaces/common';
import Pagination from '@/components/Common/Pagination';
import PropertyItem from '@/components/RealEstate/PropertyItem';

function PropertyLists({ properties }: { properties: PropertyProps[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = properties.slice(indexOfFirstPost, indexOfLastPost);
  const noOfAllPosts = Math.ceil(properties.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (properties.length === 0) {
    return (
      <Box mt="50px" textAlign="center">
        No property...
      </Box>
    );
  }

  return (
    <>
      <Box mb="20px">
        <UnorderedList
          d={{ base: 'flex', md: 'flex' }}
          flexDir={{ base: 'column', md: 'row' }}
          aria-label="properties"
          gap="40px"
          flexWrap="wrap"
          ml="0px"
        >
          {currentList &&
            currentList.map((property) => (
              <ListItem listStyleType="none" key={property.name}>
                <PropertyItem property={property} />
              </ListItem>
            ))}
        </UnorderedList>
      </Box>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={properties.length}
        paginate={paginate}
        currentPage={currentPage}
        noOfAllPosts={noOfAllPosts}
      />
    </>
  );
}

export default PropertyLists;
