import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading, Link, Stack } from '@chakra-ui/layout';
import { Store } from '@/util/Store';
import Cookies from 'js-cookie';

function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { shippingAddress },
  } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>();

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: any) => {
    const addressInfo = {
      fullName,
      address,
      city,
      postalCode,
      country,
    };

    dispatch({
      type: 'SET_SHIPPING_ADDRESS',
      payload: addressInfo,
    });

    Cookies.set('shippingAddress', JSON.stringify(addressInfo));
    router.push('/payment');
  };

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, []);

  //redirect to home page if user is not logged in
  //   useEffect(() => {
  //     if (!user) {
  //       router.push('/');
  //     }
  //   }, []);

  return (
    <Box className="container">
      <Heading as="h3">Shipping</Heading>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box rounded={'lg'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="fullName" isInvalid={errors.fullName}>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <Input
                id="fullName"
                type="text"
                placeholder="Full Name"
                {...register('fullName', {
                  required: 'Full name is required',
                })}
              />
              <FormErrorMessage>
                {errors.fullName && errors.fullName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="address" isInvalid={errors.address}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input
                id="address"
                type="text"
                placeholder="Address"
                {...register('address', {
                  required: 'Address is required',
                })}
              />
              <FormErrorMessage>
                {errors.address && errors.address.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="city" isInvalid={errors.city}>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input
                id="city"
                type="text"
                placeholder="City"
                {...register('city', {
                  required: 'City is required',
                })}
              />
              <FormErrorMessage>
                {errors.city && errors.city.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="postalCode" isInvalid={errors.postalCode}>
              <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
              <Input
                id="postalCode"
                type="number"
                placeholder="Postal Code"
                {...register('postalCode', {
                  required: 'Postal Code is required',
                })}
              />
              <FormErrorMessage>
                {errors.postalCode && errors.postalCode.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="country" isInvalid={errors.country}>
              <FormLabel htmlFor="country">Country</FormLabel>
              <Input
                id="country"
                type="text"
                placeholder="Country"
                {...register('country', {
                  required: 'Country is required',
                })}
              />
              <FormErrorMessage>
                {errors.country && errors.country.message}
              </FormErrorMessage>
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                Continue
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Box>
  );
}

export default Shipping;
