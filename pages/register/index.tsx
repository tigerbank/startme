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
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RegisterInfoProps } from '@/interfaces/common';
import { getGlobalData, postRegister } from '@/util/api';
import { Store } from '@/util/Store';

function RegisterScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const router = useRouter();
  const toast = useToast();
  const { state, dispatch } = useContext(Store);
  const { user } = state;

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({
    username,
    email,
    password,
    confirmPassword,
  }: RegisterInfoProps) => {
    try {
      const registerInfo = {
        username: username,
        email: email,
        password: password,
      };

      const registerFetch = await postRegister(registerInfo);

      const registerResponse = await registerFetch.json();
      if (registerFetch.status !== 200) {
        throw new Error(registerResponse.message[0].messages[0].message);
      }

      if (password !== confirmPassword) {
        throw new Error('Password does not match');
      }

      const userRegister = {
        username: registerResponse.user.username,
        email: registerResponse.user.email,
        jwt: registerResponse.jwt,
      };

      dispatch({
        type: 'REGISTER',
        payload: userRegister,
      });

      toast({
        title: 'Success',
        description: 'success Register',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      router.push('/');
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
      <NextSeo title="Register" description="A short description goes here." />
      <Box className="container" mt="20px">
        <Flex align={'center'} justify={'center'}>
          <Stack w="600px" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading as="h3">Register</Heading>]
            </Stack>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl isInvalid={errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="username"
                      {...register('username', {
                        required: 'This is required',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="identifier"
                      type="email"
                      placeholder="email"
                      {...register('email', {
                        required: 'This is required',
                        pattern: {
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: 'Email is wrong format',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
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
                  <FormControl isInvalid={errors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="confirm password"
                      {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10}>
                    <Button colorScheme="teal" type="submit">
                      Register
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

export default RegisterScreen;
