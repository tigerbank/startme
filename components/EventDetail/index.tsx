import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import EventComment from './EventComment';

function EventDetail({ event }: any) {
  return (
    <Box className="container" textAlign="center">
      <Heading>{event.name}</Heading>
      <Text mt="20px">{event.detail}</Text>
      <EventComment eventId={event.id} />
    </Box>
  );
}

export default EventDetail;
