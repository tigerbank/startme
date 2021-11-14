import { Box, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { EventProps } from 'interfaces/common';
import Link from 'next/link';
import React from 'react';
import { buildEventPath, extractEvent } from 'util/common';

function Event({ event }: { event: EventProps[] }) {
  return (
    <>
      <Box className="container">
        <Heading as="h1">All Events</Heading>
        {event &&
          event.map((eventItem: EventProps) => (
            <Box
              border="solid 1px"
              borderColor="gray.200"
              padding="20px"
              mt="20px"
              key={eventItem.id}
              d="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Heading as="h5">{eventItem.name}</Heading>
                <Text>{eventItem.detail}</Text>
              </Box>
              <Link href={`/event/${eventItem.id}`} passHref>
                <Button colorScheme="teal">View detail</Button>
              </Link>
            </Box>
          ))}
      </Box>
    </>
  );
}

export const getStaticProps = async () => {
  const filePath = buildEventPath();
  const data = extractEvent(filePath);

  return {
    props: {
      event: data,
    },
  };
};

export default Event;
