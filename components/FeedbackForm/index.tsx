import React, { useRef } from 'react';
import { useRouter } from 'next/router';

import {
  Input,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Button,
} from '@chakra-ui/react';

function FeedbackForm() {
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredFeedback = feedbackInputRef.current?.value;

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        feedback: enteredFeedback,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 201) {
        console.log('Feedback sent');
        router.push('/feedback');
      } else {
        console.log('Feedback not sent');
      }
    });
  }

  return (
    <Box>
      <Heading as="h3" mb="20px">
        Feedback Form
      </Heading>
      <form onSubmit={submitFormHandler}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" ref={emailInputRef} />
        </FormControl>
        <FormControl id="feedback" isRequired>
          <FormLabel mt="20px">Feedback</FormLabel>
          <Textarea
            placeholder="Put your feedback here"
            ref={feedbackInputRef}
          />
        </FormControl>
        <Button mt="20px" type="submit">
          Send Feedback
        </Button>
      </form>
    </Box>
  );
}

export default FeedbackForm;
