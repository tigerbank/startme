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
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postRegister } from 'util/api';
import { Store } from 'util/Store';

function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { user } = state;

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const registerInfo = {
        username: username,
        email: email,
        password: password,
      };

      const register = await postRegister(registerInfo);

      const registerResponse = await register.json();
      if (register.status !== 200) {
        throw new Error(registerResponse.message[0].messages[0].message);
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

      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box className="container" mt="20px">
      <Flex align={'center'} justify={'center'}>
        <Stack w="600px" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Register</Heading>]
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  type="email"
                  value={username}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
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
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  value={confirmPassword}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={submitHandler}
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Register;
