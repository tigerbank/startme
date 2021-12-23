import { PropertyProps } from '@/interfaces/common';
import React, { useState } from 'react';
import { ListItem, UnorderedList, Box } from '@chakra-ui/react';
import Link from 'next/link';
import Pagination from '@/components/Common/Pagination';

function PropertyLists({ properties }: { properties: PropertyProps[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = properties.slice(indexOfFirstPost, indexOfLastPost);
  const noOfAllPosts = Math.ceil(properties.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Box mb="20px">
        <UnorderedList aria-label="properties">
          {currentList &&
            currentList.map((property) => (
              <ListItem key={property.name}>
                <Link href={`/real-estate/${property.property_slug}`}>
                  {property.name}
                </Link>
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
