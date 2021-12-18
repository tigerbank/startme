import React, { useRef } from 'react';
import Link from 'next/link';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import styles from '@/components/Layout/Navigation/Mobile/Navigation.module.scss';
import { NavProps } from '@/interfaces/common';

function MobileNavigation({ nav }: { nav: NavProps[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();
  return (
    <>
      <HamburgerIcon fontSize="30px" onClick={onOpen} ref={btnRef} />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton outline="none" />

          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Box className={styles.navigation}>
              <ul>
                {nav &&
                  nav.map((navItem: NavProps) => {
                    return (
                      <li onClick={onClose} key={navItem.id}>
                        <Link href={navItem.url}>{navItem.text}</Link>
                      </li>
                    );
                  })}
              </ul>
            </Box>
          </DrawerBody>

          {/* <DrawerFooter>Footer content</DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileNavigation;
