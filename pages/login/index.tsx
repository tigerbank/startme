import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { NextSeo } from 'next-seo';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginInfoProps } from '@/interfaces/common';
import { Store } from '@/util/Store';
import { getGlobalData, postLogin } from '@/util/api';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const toast = useToast();

  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { user } = state;

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ identifier, password }: LoginInfoProps) => {
    try {
      const loginInfo = {
        identifier: identifier,
        password: password,
      };

      const login = await postLogin(loginInfo);

      const loginResponse = await login.json();

      if (login.status !== 200) {
        throw new Error(loginResponse.message[0].messages[0].message);
      }

      const userLogin = {
        id: loginResponse.user.id,
        username: loginResponse.user.username,
        email: loginResponse.user.email,
        jwt: loginResponse.jwt,
      };

      dispatch({
        type: 'LOGIN',
        payload: userLogin,
      });

      toast({
        title: 'Success',
        description: 'success login',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      router.push('/shop/cart');
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
      <NextSeo title="Login" description="A short description goes here." />
      <Box className="container" mt="20px">
        <Flex align={'center'} justify={'center'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading as="h3">Sign in to your account</Heading>]
            </Stack>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl isInvalid={errors.identifier}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="identifier"
                      type="email"
                      placeholder="email"
                      {...register('identifier', {
                        required: 'This is required',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Email is wrong format',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.identifier && errors.identifier.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="password"
                      {...register('password', {
                        required: 'Password is required',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={'teal.400'}>Forgot password?</Link>
                    </Stack>
                    <Button colorScheme="teal" type="submit">
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </form>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      global,
    },
  };
}

export default Login;
