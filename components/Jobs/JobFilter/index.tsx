import React from 'react';
import { Heading, Input, Stack, Select, Text } from '@chakra-ui/react';
import Heading1 from '@/components/Common/Elements/Heading1';

function JobFilter({ setFilters, filters }: { setFilters: any; filters: {} }) {
  return (
    <>
      <Heading1>Job search </Heading1>
      <Text>Fetch data from frontend code</Text>

      <Stack spacing={3} mt="20px">
        <Input
          w="100%"
          bg="white"
          placeholder="Company or Position"
          onKeyUp={(e) =>
            setFilters({
              ...filters,
              page: 1,
              s: (e.target as HTMLTextAreaElement).value,
            })
          }
        />
        <Select
          bg="white"
          placeholder="Select option"
          onChange={(e) =>
            setFilters({
              ...filters,
              sort: e.target.value,
            })
          }
          defaultValue="desc"
        >
          <option value="asc">Oldest</option>
          <option value="desc">Newest</option>
        </Select>
      </Stack>
    </>
  );
}

export default JobFilter;
