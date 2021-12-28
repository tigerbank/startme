import {
  Box,
  Input,
  Button,
  HStack,
  RadioGroup,
  Stack,
  Radio,
  Text,
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
    <Box
      borderRadius="xl"
      ml="auto"
      mr="auto"
      w="700px"
      bg="teal"
      p="40px 30px"
      mb="30px"
      top="200px"
      position="relative"
      color="white"
      boxShadow="lg"
    >
      <HStack>
        <RadioGroup onChange={(e) => setListType(e)} value={listType}>
          <Stack direction="row" mb="10px">
            <Radio bg="white" value="buy">
              <Text fontSize="18px" fontWeight="bold">
                Buy
              </Text>
            </Radio>
            <Radio bg="white" value="rent">
              <Text fontSize="18px" fontWeight="bold">
                Rent
              </Text>
            </Radio>
            <Radio bg="white" value="both">
              <Text fontSize="18px" fontWeight="bold">
                Both
              </Text>
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
        <Button colorScheme="orange" onClick={handleClick}>
          Search
        </Button>
      </HStack>
    </Box>
  );
}

export default SearchProperty;
