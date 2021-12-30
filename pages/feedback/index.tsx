import React from 'react';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';
import { FeedbackItemProps } from '@/interfaces/common';
import FeedbackResult from '@/components/FeedbackResult';

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
      <FeedbackResult feedbackItems={feedbackItems} />
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
    revalidate: 10,
  };
};

export default FeedbackPage;
