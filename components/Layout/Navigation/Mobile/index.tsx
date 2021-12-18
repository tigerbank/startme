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
  DrawerFooter,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import styles from '@/components/Layout/Navigation/Mobile/Navigation.module.scss';
import { NavProps } from '@/interfaces/common';
import LanguageSwitcher from '@/components/Layout/Header/LanguageSwitcher';
import UserMenu from '@/components/Layout/Header/UserMenu';

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
        <DrawerContent pt="50px">
          <DrawerCloseButton
            _focus={{ outline: 'none' }}
            top="50px"
            right="10px"
          />

          <DrawerBody p="0">
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

          <DrawerFooter flexDir="row" justifyContent="space-between">
            <Box>
              <UserMenu />
            </Box>
            <Box d="flex">
              <Text mr="10px">Language: </Text>
              <LanguageSwitcher />
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileNavigation;
