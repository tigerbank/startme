import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';

const MotionHeading = motion(Heading);

const marqueeVariants = {
  animate: {
    x: [0, -4035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 50,
        ease: 'linear',
      },
    },
  },
};

function Intro() {
  return (
    <Box width="90%" ml="auto" mr="auto" pb="50px">
      <MotionHeading
        as="h1"
        fontSize={{ base: '60px', lg: '100px' }}
        initial={{ x: -500 }}
        animate={{ x: 0 }}
      >
        about
      </MotionHeading>
      <MotionHeading
        as="h2"
        fontSize="100px"
        variants={marqueeVariants}
        animate="animate"
        whiteSpace="nowrap"
      >
        Teerasak Yukantapornpong Teerasak Yukantapornpong Teerasak
        Yukantapornpong Teerasak Yukantapornpong
      </MotionHeading>
      <Text mt="30px">
        My name is{' '}
        <strong>
          Teerasak Yukantapornpong &quot;Bank&quot; (ธีรศักดิ์ ยุคันตพรพงษ์)
        </strong>
        . I&apos;m a <strong>Frontend Web Developer</strong> specializing in
        building a website focused on user experience, page speed optimisation
        and the best practices for Search engine optimisation. Use the modern
        tech such as Nextjs, Typescript, Strapi, Chakra-ui and many more tools
        to build a website. I have been working in the web development industry
        for the past 10 years and looking to produce the quality work everyday.
      </Text>
    </Box>
  );
}

export default Intro;
