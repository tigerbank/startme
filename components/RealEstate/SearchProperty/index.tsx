import {
  Box,
  Input,
  Button,
  HStack,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Heading,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

function SearchProperty() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [listType, setListType] = useState('both');

  const handleClick = () => {
    router.push(
      `/real-estate/property-search-result?search=${input}&listType=${listType}`,
    );
  };

  return (
    <Box
      ml="auto"
      mr="auto"
      w={{ base: '100%', md: '100%' }}
      top="30px"
      position="relative"
      color="gray.700"
      borderBottom="solid 2px"
      pb="30px"
      borderColor="gray.200"
    >
      <Box
        d={{ base: 'block', md: 'flex' }}
        justifyContent="space-between"
        mb="5px"
      >
        <Heading as="h2" fontSize="22px" mb="10px">
          Search Properties
        </Heading>
        <HStack>
          <RadioGroup
            colorScheme="red"
            onChange={(e) => setListType(e)}
            value={listType}
          >
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
      </Box>

      <HStack>
        <Input
          onChange={(e) => setInput(e.target.value)}
          bg="#fff"
          placeholder="property name, location"
          type="text"
          value={input}
          color="black"
        />
        <Button colorScheme="red" onClick={handleClick}>
          Search
        </Button>
      </HStack>
    </Box>
  );
}

export default SearchProperty;
