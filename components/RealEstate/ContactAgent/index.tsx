import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';

import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { postPropertyInquiry } from '@/util/api';

type Inputs = {
  name: string;
  phone: number;
  email: string;
  propertyId: number;
};

function ContactAgent({ listId }: { listId: number }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const toast = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //hidden field return string so need to convert here
    const transformData = {
      ...data,
      propertyId: Number(data.propertyId),
    };

    try {
      await postPropertyInquiry(transformData);
      toast({
        title: 'Success',
        description: 'successfully Sent',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      reset();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.200" p="30px" borderRadius="lg">
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
        <FormControl isRequired>
          <Input
            id="propertyId"
            type="hidden"
            value={listId}
            {...register('propertyId', { required: true })}
          />
        </FormControl>

        <Button mt="20px" isFullWidth colorScheme="red" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default ContactAgent;
