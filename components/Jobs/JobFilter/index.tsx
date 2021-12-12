import React from 'react';
import { Heading, Input, Stack, Select } from '@chakra-ui/react';

function JobFilter({ setFilters, filters }: { setFilters: any; filters: {} }) {
  return (
    <>
      <Heading mb="10px" as="h4" fontSize="16px">
        Search
      </Heading>

      <Stack spacing={3}>
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
