import React, { useState } from 'react';
import { ListItem, UnorderedList, Box } from '@chakra-ui/react';
import SortProperty from '@/components/RealEstate/SortProperty';
import { PropertyProps } from '@/interfaces/common';
import Pagination from '@/components/Common/Pagination';
import PropertyItem from '@/components/RealEstate/PropertyItem';
import Disclaimer from '@/components/Common/Disclaimer';

function PropertyLists({ properties }: { properties: PropertyProps[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  //Sort
  const [sortBy, setSortBy] = useState('price-high-low');

  const propertiesSort = (lists: PropertyProps[]) => {
    switch (sortBy) {
      case 'price-high-low':
        return lists.sort((a: any, b: any) => {
          return b.price - a.price;
        });

      case 'price-low-high':
        return lists.sort((a: any, b: any) => {
          return a.price - b.price;
        });

      case 'oldest':
        return lists.sort((a: any, b: any) => {
          return (
            new Date(a.updated_at).valueOf() - new Date(b.updated_at).valueOf()
          );
        });

      case 'newest':
        return lists.sort((a: any, b: any) => {
          return (
            new Date(b.updated_at).valueOf() - new Date(a.updated_at).valueOf()
          );
        });

      default:
        return lists;
    }
  };

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = propertiesSort(properties).slice(
    indexOfFirstPost,
    indexOfLastPost,
  );
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
        <Disclaimer align="left" />
        <SortProperty sortBy={sortBy} setSortBy={setSortBy} />
        <UnorderedList
          d="flex"
          flexDir={{ base: 'column', md: 'row' }}
          aria-label="properties"
          flexWrap="wrap"
          ml="0px"
          mr="0px"
        >
          {currentList &&
            currentList.map((property) => (
              <ListItem
                w={{ base: '100%', md: '50%', lg: '33.33%' }}
                listStyleType="none"
                key={property.name}
              >
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
