import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Input, Box, Heading, Button, useToast } from '@chakra-ui/react';
import { subscribeMail } from '@/util/api';
import Heading1 from '@/components/Common/Elements/Heading1';

function Newsletter() {
  const { t } = useTranslation('common');
  const [inputText, setInputText] = useState('');
  const toast = useToast();

  async function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await subscribeMail(inputText);
    const data = await response.json();

    setInputText('');
    toast({
      title: 'Success',
      description: data.message,
      status: 'success',
      duration: 8000,
      isClosable: true,
    });
  }

  return (
    <Box py="50px">
      <Heading1 textAlign="center" fontSize="35px">
        {t('newsletter_title')}
      </Heading1>
      <form onSubmit={submitFormHandler}>
        <Box w="320px" ml="auto" mr="auto" mt="20px" d="flex">
          <Input
            background="white"
            type="email"
            placeholder="enter your email"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <Button type="submit" ml="15px" w="100px" colorScheme="teal">
            {t('submit')}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Newsletter;
