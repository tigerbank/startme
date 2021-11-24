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
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { postLogin } from 'util/api';
import { Store } from 'util/Store';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { user } = state;

  if (user) {
    router.push('/');
  }
  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const loginInfo = {
        identifier: username,
        password: password,
      };

      const login = await postLogin(loginInfo);

      if (login.status !== 200) {
        throw new Error(login.statusText);
      }

      const loginResponse = await login.json();

      const userLogin = {
        username: loginResponse.user.username,
        email: loginResponse.user.email,
        jwt: loginResponse.jwt,
      };

      dispatch({
        type: 'LOGIN',
        payload: userLogin,
      });

      router.push('/shop/cart');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box className="container" mt="20px">
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>]
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  type="email"
                  value={username}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={submitHandler}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;
