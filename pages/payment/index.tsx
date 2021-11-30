import CartSteps from '@/components/CartSteps';
import { Store } from '@/util/Store';
import { Button } from '@chakra-ui/button';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

function Payment() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState<string>('paypal');

  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
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
    router.push('/placeorder');
  };

  return (
    <Box className="container">
      <CartSteps currentStep={2} />
      <Heading mt="30px" as="h3">
        Payment Method
      </Heading>
      <form onSubmit={submitHandler}>
        <RadioGroup mt="20px" onChange={setPaymentMethod} value={paymentMethod}>
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
      <Box mt="30px">
        <Link href="/shop">Back to shop</Link>
      </Box>
    </Box>
  );
}

export default Payment;
