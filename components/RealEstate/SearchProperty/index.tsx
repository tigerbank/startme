import {
  Box,
  Input,
  Button,
  HStack,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

function SearchProperty() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [listType, setListType] = useState('');

  const handleClick = () => {
    router.push(
      `/real-estate/property-search-result?search=${input}&listType=${listType}`,
    );
  };

  return (
    <Box bg="teal" p="30px" mb="30px">
      <HStack>
        <RadioGroup onChange={(e) => setListType(e)} value={listType}>
          <Stack direction="row">
            <Radio bg="white" value="buy">
              Buy
            </Radio>
            <Radio bg="white" value="rent">
              Rent
            </Radio>
            <Radio bg="white" value="both">
              Both
            </Radio>
          </Stack>
        </RadioGroup>
      </HStack>
      <HStack>
        <Input
          onChange={(e) => setInput(e.target.value)}
          bg="#fff"
          placeholder="property name, location"
          type="text"
          value={input}
        />
        <Button onClick={handleClick}>Search</Button>
      </HStack>
    </Box>
  );
}

export default SearchProperty;
