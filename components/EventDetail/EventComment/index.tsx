import React, { useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Box,
  Heading,
  Input,
} from '@chakra-ui/react';

function EventComment({ eventId }: any) {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputCommentRef = useRef<HTMLTextAreaElement>(null);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredName = inputNameRef.current?.value;
    const enteredEmail = inputEmailRef.current?.value;
    const enteredComment = inputCommentRef.current?.value;

    fetch(`/api/eventComment/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        comment: enteredComment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <Box mt="20px">
      <Box bg="teal.200" padding="50px">
        <Heading as="h3" mb="20px">
          Comment
        </Heading>
        <form onSubmit={onSubmitHandler}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              bg="white"
              placeholder="Your Name"
              ref={inputNameRef}
            />
          </FormControl>
          <FormControl id="email" mt="20px" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              bg="white"
              placeholder="Your Email"
              ref={inputEmailRef}
            />
          </FormControl>
          <FormControl id="comment" mt="20px" isRequired>
            <FormLabel>Comment</FormLabel>
            <Textarea
              placeholder="Put your comment here"
              bg="white"
              ref={inputCommentRef}
            />
          </FormControl>
          <Button
            isFullWidth
            mt="40px"
            colorScheme="teal"
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default EventComment;
