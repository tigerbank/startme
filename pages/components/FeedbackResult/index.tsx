import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
} from '@chakra-ui/react';
import { FeedbackItemProps } from '../../../interfaces/common';

function FeedbackResult({
  feedbackItems,
}: {
  feedbackItems: FeedbackItemProps[];
}) {
  return (
    <Box>
      <Heading as="h1" textAlign="center" mb="20px">
        Feedback
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Email</Th>
            <Th>Feedback</Th>
          </Tr>
        </Thead>
        <Tbody>
          {feedbackItems.map((feedbackItem: any) => (
            <Tr key={feedbackItem.id}>
              <Td>{feedbackItem.id}</Td>
              <Td>{feedbackItem.email}</Td>
              <Td>{feedbackItem.feedbackText}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default FeedbackResult;
