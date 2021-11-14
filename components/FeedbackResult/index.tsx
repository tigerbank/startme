import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react';
import { FeedbackItemProps } from 'interfaces/common';

function FeedbackResult({
  feedbackItems,
}: {
  feedbackItems: FeedbackItemProps[];
}) {
  const [selectedFeedback, setSelectedFeedback] = useState({
    id: '',
    email: '',
    feedbackText: '',
  });

  function showDetail(id: string) {
    fetch('/api/feedback/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSelectedFeedback(res.feedback);
      });
  }
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
            <Th>-</Th>
          </Tr>
        </Thead>
        <Tbody>
          {feedbackItems.map((feedbackItem) => (
            <Tr key={feedbackItem.id}>
              <Td>{feedbackItem.id}</Td>
              <Td>{feedbackItem.email}</Td>
              <Td>
                <Button onClick={showDetail.bind(null, feedbackItem.id)}>
                  Show detail
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Box mt="20px" ml="20px">
        {selectedFeedback.id && (
          <>
            <Heading as="h5">Detail</Heading>
            <Box>
              <Text as="h5">Feedback: {selectedFeedback.feedbackText}</Text>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default FeedbackResult;
