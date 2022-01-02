import React from 'react';
import { Box, Heading, Text, Badge } from '@chakra-ui/react';
import Image from 'next/image';
import moment from 'moment';
import { JobProps } from '@/interfaces/common';
import Disclaimer from '@/components/Common/Disclaimer';

function JobList({ jobs, loading }: any) {
  if (jobs.length === 0 && !loading) {
    return (
      <Box textAlign="center" mt="50px">
        <Text>No jobs found...</Text>
      </Box>
    );
  }

  return (
    <>
      {!loading && <Disclaimer align="right" />}
      {jobs.map((job: JobProps, index: number) => (
        <Box
          key={index}
          bg="white"
          borderRadius="sm"
          boxShadow="sm"
          padding="12px"
          d="flex"
          mb="20px"
        >
          <Box w="90px" mr="12px">
            <Image
              src={
                job.company.logo
                  ? job.company.logo.url
                  : 'https://via.placeholder.com/90'
              }
              layout="fixed"
              width="90"
              height="90"
              alt=""
            />
          </Box>

          <Box>
            <Heading as="h4" fontSize="12px">
              {job.company.name}
            </Heading>
            <Heading mt="8px" mb="8px" as="h3" fontSize="18px">
              {job.position}
            </Heading>
            <Badge variant="outline" colorScheme="green">
              {job.type}
            </Badge>
          </Box>

          <Box ml="auto" mt="auto">
            <Text textAlign="right" fontSize="12px" color="#B7BCCE">
              {job.location.name}
            </Text>
            <Text textAlign="right" fontSize="12px" color="#B7BCCE">
              {moment(job.updated_at, 'YYYYMMDD').fromNow()}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default JobList;
