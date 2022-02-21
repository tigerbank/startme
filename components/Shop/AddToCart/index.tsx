import { Button } from '@chakra-ui/button';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Store } from '@/util/Store';

function AddToCart({ product }: any) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const updateItem = state.cart.cartItems.find(
    (item: any) => item.id === product.id,
  );

  const transformProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image.formats.small.url,
    countInStock: product.countInStock,
  };

  const addToCartHandler = () => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...transformProduct,
        quantity: updateItem ? updateItem.quantity + 1 : 1,
      },
    });
    router.push('/shop/cart');
  };

  return (
    <Button isFullWidth colorScheme="teal" onClick={addToCartHandler}>
      {t('add_to_cart')}
    </Button>
  );
}

export default AddToCart;
