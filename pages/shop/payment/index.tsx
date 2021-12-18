import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Cookies from 'js-cookie';
import {
  Button,
  Box,
  Heading,
  Stack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { Store } from '@/util/Store';
import CartSteps from '@/components/CartSteps';
import BackToShop from '@/components/BackToShop';
import { getGlobalData } from '@/util/api';

function Payment() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState<string>('paypal');

  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shop/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || 'paypal');
    }
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch({
      type: 'SET_PAYMENT_METHOD',
      payload: paymentMethod,
    });

    Cookies.set('paymentMethod', paymentMethod);
    router.push('/shop/placeorder');
  };

  return (
    <>
      <NextSeo title="Payment" description="A short description goes here." />
      <Box className="container">
        <CartSteps currentStep={2} />
        <Heading as="h3">Payment</Heading>
        <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
          <Heading mb="10px" as="h4" fontSize="18px">
            Select Payment Method
          </Heading>
          <form onSubmit={submitHandler}>
            <RadioGroup
              mt="20px"
              onChange={setPaymentMethod}
              value={paymentMethod}
            >
              <Stack direction="column">
                <Radio value="paypal">Paypal</Radio>
                <Radio value="cash">Cash</Radio>
              </Stack>
            </RadioGroup>
            <Box mt="30px">
              <Button mr="20px" onClick={() => router.push('/shipping')}>
                Back
              </Button>
              <Button colorScheme="teal" type="submit">
                Continue
              </Button>
            </Box>
          </form>
        </Box>
        <BackToShop />
      </Box>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      global,
    },
  };
}

export default Payment;
