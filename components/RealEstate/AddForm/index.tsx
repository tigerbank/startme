import React from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PropertyProps } from '@/interfaces/common';
import { useRouter } from 'next/router';
import { postProperty } from '@/util/api';

function AddForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyProps>();
  const toast = useToast();

  const onSubmit: SubmitHandler<PropertyProps> = async (data) => {
    try {
      const addPropertyFetch = await postProperty(data);

      const addPropertyResponse = await addPropertyFetch.json();

      if (addPropertyFetch.status !== 200) {
        throw new Error(addPropertyResponse.message);
      }
      toast({
        title: 'Success',
        description: 'success Added',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/real-estate');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Heading>Add property form</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="name">Property name</FormLabel>
          <Input
            placeholder="property name"
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="property_slug">Slug</FormLabel>
          <Input
            placeholder="property slug"
            type="text"
            {...register('property_slug', { required: true })}
          />
          {errors.property_slug && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="type">Type</FormLabel>
          <Select {...register('type')}>
            <option>Please select</option>
            <option value="apartment">apartment</option>
            <option value="condo">condo</option>
            <option value="house">house</option>
          </Select>
          {errors.type && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="listType">listType</FormLabel>
          <Select {...register('listType')}>
            <option>Please select</option>
            <option value="buy">buy</option>
            <option value="rent">rent</option>
            <option value="both">both</option>
          </Select>

          {errors.listType && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            placeholder="address"
            type="text"
            {...register('address', { required: true })}
          />
          {errors.address && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="price">Price</FormLabel>
          <Input
            placeholder="price"
            type="number"
            {...register('price', { required: true })}
          />
          {errors.price && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="shortDetail">Short Detail</FormLabel>
          <Textarea
            placeholder="shortDetail"
            {...register('shortDetail', { required: true })}
          />
          {errors.shortDetail && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="fullDetail">Full Detail</FormLabel>
          <Textarea
            placeholder="fullDetail"
            {...register('fullDetail', { required: true })}
          />
          {errors.fullDetail && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="bedRoom">Bedroom</FormLabel>
          <Input
            placeholder="bedRoom"
            type="number"
            {...register('bedRoom', { required: true })}
          />
          {errors.bedRoom && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="bathRoom">Bathroom</FormLabel>
          <Input
            placeholder="bathRoom"
            type="number"
            {...register('bathRoom', { required: true })}
          />
          {errors.bathRoom && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="carPark">Car park</FormLabel>
          <Input
            placeholder="carPark"
            type="number"
            {...register('carPark', { required: true })}
          />
          {errors.carPark && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default AddForm;
