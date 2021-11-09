import { Input, Box, Heading, Button } from '@chakra-ui/react';
import React, { useRef } from 'react';

function Newsletter() {
  const emailRef = useRef<HTMLInputElement>(null);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
      }),
    }).then((response) => response.json().then((data) => console.log(data)));
  }

  return (
    <Box mt="20px" background="gray.50" padding="50px">
      <Heading as="h4" textAlign="center">
        Signup for Newsletter
      </Heading>
      <form onSubmit={submitFormHandler}>
        <Box w="320px" ml="auto" mr="auto" mt="20px" d="flex">
          <Input
            background="white"
            type="email"
            placeholder="enter your email"
            ref={emailRef}
          />
          <Button type="submit" ml="15px" w="100px" colorScheme="teal">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Newsletter;
