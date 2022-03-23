import { Box, Tag, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const skill = [
  { name: 'HTML5', type: 'coding' },
  { name: 'CSS / CSS3', type: 'coding' },
  { name: 'SCSS', type: 'coding' },
  { name: 'Javascript', type: 'coding' },
  { name: 'Typescript', type: 'coding' },
  { name: 'ReactJs', type: 'coding' },
  { name: 'NextJs', type: 'coding' },
  { name: 'Strapi CMS', type: 'coding' },
  { name: 'REST API', type: 'coding' },
  { name: 'Framer motion', type: 'coding' },
  { name: 'Chakra-ui', type: 'coding' },
  { name: 'Storybook', type: 'coding' },
  { name: 'Responsive Web Design', type: 'coding' },
  { name: 'Wordpress', type: 'coding' },
  { name: 'Wordpress theme development', type: 'coding' },
  { name: 'SEO (Search engine optimization)', type: 'coding' },
  { name: 'Vercel', type: 'coding' },
  { name: 'Heroku', type: 'coding' },
  { name: 'PHP', type: 'coding' },
  { name: 'SVN', type: 'coding' },
  { name: 'Git', type: 'coding' },
  { name: 'Adobe Photoshop', type: 'design' },
  { name: 'Photoshop Retouch', type: 'design' },
  { name: 'Adobe Illustrator', type: 'design' },
  { name: 'jQuery', type: 'coding' },
  { name: 'Firebase', type: 'coding' },
  { name: 'Google Adwords', type: 'other' },
  { name: 'Google Analytics', type: 'other' },
  { name: 'Microsoft Office', type: 'other' },
  { name: 'Cypress', type: 'coding' },
];

const category = ['All', 'Coding', 'Design', 'Other'];

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionTag = motion(Tag);
const MotionText = motion(Text);

function Skill() {
  const [displaySkill, setDisplaySkill] = useState(skill);
  const [background, setBackground] = useState('#f1c456');
  const [color, setColor] = useState('#000');

  const handleClick = (e: any) => {
    const selectedCategory = e.target.innerHTML.toLowerCase();
    const filteredItem = skill.filter((item) => item.type === selectedCategory);

    if (selectedCategory === 'all') {
      setBackground('#f1c456');
      setColor('#000');
    }

    if (selectedCategory === 'coding') {
      setBackground('#b5d0cd');
      setColor('#000');
    }

    if (selectedCategory === 'design') {
      setBackground('#144c92');
      setColor('#fff');
    }

    if (selectedCategory === 'other') {
      setBackground('#ef8888');
      setColor('#000');
    }

    setDisplaySkill(filteredItem);

    if (selectedCategory === 'all') {
      setDisplaySkill(skill);
    }
  };

  return (
    <MotionBox
      initial={{ backgroundColor: '#fff', color: '#000' }}
      animate={{ backgroundColor: background, color: color }}
      transition={{ duration: 1 }}
      pt="100px"
      pb="100px"
      borderTop="solid 5px black"
    >
      <Box w="90%" ml="auto" mr="auto">
        <MotionHeading
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          as="h3"
          fontSize={{ base: '60px', lg: '100px' }}
        >
          &lt;skill /&gt;
        </MotionHeading>

        <Box mt="50px" d="flex" gap="10px" flexWrap="wrap">
          {category.map((item) => (
            <Box key={item} d="flex" alignItems="center">
              <MotionText
                mr={{ base: '5px', md: '10px' }}
                fontSize={{ base: '22px', md: '30px' }}
                cursor="pointer"
                onClick={handleClick}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  transition: { duration: 0.2 },
                }}
              >
                {item}
              </MotionText>
              {item !== 'Other' && (
                <Text
                  mr={{ base: '5px', md: '10px' }}
                  fontSize={{ base: '30px', md: '45px' }}
                >
                  &middot;
                </Text>
              )}
            </Box>
          ))}
        </Box>

        <Box d="flex" mt="50px" flexWrap="wrap" gap="10px">
          {displaySkill.map((item) => (
            <MotionTag
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              key={item.name}
              variant="outline"
              color="black"
              backgroundColor="white"
              whiteSpace="nowrap"
            >
              {item.name}
            </MotionTag>
          ))}
        </Box>
      </Box>
    </MotionBox>
  );
}

export default Skill;
