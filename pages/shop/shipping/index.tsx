import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { NextSeo } from 'next-seo';
import Cookies from 'js-cookie';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  Box,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CartSteps from '@/components/Shop/CartSteps';
import BackToShop from '@/components/Shop/BackToShop';
import { Store } from '@/util/Store';
import { getGlobalData } from '@/util/api';

function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    user,
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
  }: {
    fullName: string;
    address: string;
    city: string;
    postalCode: number;
    country: string;
  }) => {
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
    router.push('/shop/payment');
  };

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, []);

  //redirect to home page if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <NextSeo
        title="Shipping | Shop"
        description="A short description goes here."
      />
      <Box className="container" pt="20px">
        <CartSteps currentStep={1} />
        <Heading as="h3">Shipping</Heading>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
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
                <Button colorScheme="teal" type="submit">
                  Continue
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
        <BackToShop />
      </Box>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      global,
    },
    revalidate: 10,
  };
}

export default Shipping;
