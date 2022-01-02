import React, { useRef } from 'react';
import Link from 'next/link';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerFooter,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import styles from '@/components/Layout/Navigation/Mobile/Navigation.module.scss';
import { NavProps } from '@/interfaces/common';
import LanguageSwitcher from '@/components/Layout/Header/LanguageSwitcher';
import UserMenu from '@/components/Layout/Header/UserMenu';

function MobileNavigation({ nav }: { nav: NavProps[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  const renderNavItem = (navItem: NavProps) => {
    if (navItem.subnav.length === 0) {
      return (
        <li onClick={onClose} key={navItem.id}>
          <Link href={navItem.url}>{navItem.text}</Link>
        </li>
      );
    } else {
      return (
        <Accordion allowToggle key={navItem.id}>
          <AccordionItem
            isFocusable={false}
            borderTop="none"
            borderBottom="none"
          >
            <AccordionButton py="15px" borderBottom="solid 1px #e6e6e6">
              <Box flex="1" textAlign="left">
                {navItem.text}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel bg="#f9f9f9" px="0px" pb="0px">
              {navItem.subnav &&
                navItem.subnav.map((subNavItem: any) => (
                  <Box
                    as="li"
                    color="black"
                    key={subNavItem.id}
                    onClick={onClose}
                  >
                    <Link href={subNavItem.url}>{subNavItem.text}</Link>
                  </Box>
                ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      );
    }
  };

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
                    return renderNavItem(navItem);
                  })}
              </ul>
            </Box>

            <Box
              d="flex"
              flexDir="row"
              justifyContent="space-between"
              mt="20px"
              className="container"
            >
              <Box>
                <UserMenu onClose={onClose} />
              </Box>
              <Box d="flex">
                <Text mr="10px">Language: </Text>
                <LanguageSwitcher />
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter
            flexDir="row"
            justifyContent="space-between"
          ></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileNavigation;
