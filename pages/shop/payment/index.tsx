import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import {
  Button,
  Box,
  Heading,
  Stack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Store } from '@/util/Store';
import CartSteps from '@/components/Shop/CartSteps';
import BackToShop from '@/components/Shop/BackToShop';
import DefaultTemplate from '@/components/templates/DefaultTemplate';
import { getGlobalData } from '@/util/api';
import Heading1 from '@/components/Common/Elements/Heading1';

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
    <DefaultTemplate title="Payment" description="description">
      <CartSteps currentStep={2} />
      <Heading1>Payment</Heading1>
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
    </DefaultTemplate>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      global,
    },
    revalidate: 10,
  };
}

export default Payment;
