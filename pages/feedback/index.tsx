import React from 'react';
import Link from 'next/link';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';
import { FeedbackItemProps } from '../../interfaces/common';
import { ArrowBackIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';

function FeedbackPage({
  feedbackItems,
}: {
  feedbackItems: FeedbackItemProps[];
}) {
  return (
    <Box mt="20px">
      <Link href="/" passHref>
        <Button ml="20px" leftIcon={<ArrowBackIcon />} variant="outline">
          Back
        </Button>
      </Link>
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

export const getStaticProps = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbackPage;
