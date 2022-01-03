import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  phone: number;
  email: string;
};

function ContactAgent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Box bg="gray.200" p="30px">
      <Heading as="h3" fontSize="24px" mb="20px">
        Contact Agent
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel mb="0px" htmlFor="name">
            Name
          </FormLabel>
          <Input
            id="name"
            bg="white"
            placeholder="Your name"
            {...register('name', { required: true })}
          />
          {errors.name && <Text color="red">This field is required</Text>}
        </FormControl>
        <FormControl isRequired mt="5px">
          <FormLabel mb="0px" htmlFor="phone">
            Phone
          </FormLabel>
          <Input
            id="phone"
            bg="white"
            placeholder="Your phone number"
            {...register('phone', { required: true })}
          />
          {errors.phone && <Text color="red">This field is required</Text>}
        </FormControl>
        <FormControl isRequired mt="5px">
          <FormLabel mb="0px" htmlFor="email">
            Email
          </FormLabel>
          <Input
            id="email"
            bg="white"
            type="email"
            placeholder="Your email"
            {...register('email', { required: true })}
          />
          {errors.email && <Text color="red">This field is required</Text>}
        </FormControl>

        <Button mt="20px" isFullWidth colorScheme="red" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default ContactAgent;
