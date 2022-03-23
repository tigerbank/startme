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
  const [background, setBackground] = useState('#cecece');

  const handleClick = (e: any) => {
    const selectedCategory = e.target.innerHTML.toLowerCase();
    const filteredItem = skill.filter((item) => item.type === selectedCategory);

    if (selectedCategory === 'all') {
      setBackground('#cecece');
    }

    if (selectedCategory === 'coding') {
      setBackground('#dd843e');
    }

    if (selectedCategory === 'design') {
      setBackground('#f1c456');
    }

    if (selectedCategory === 'other') {
      setBackground('#f9d853');
    }

    setDisplaySkill(filteredItem);

    if (selectedCategory === 'all') {
      setDisplaySkill(skill);
    }
  };

  return (
    <MotionBox
      initial={{ backgroundColor: '#fff' }}
      animate={{ backgroundColor: background }}
      transition={{ duration: 1 }}
      pt="100px"
      pb="100px"
      borderTop="solid 5px black"
    >
      <Box w="90%" ml="auto" mr="auto">
        <MotionHeading
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          as="h3"
          fontSize={{ base: '60px', lg: '100px' }}
        >
          &lt;skill /&gt;
        </MotionHeading>

        <Box mt="50px" d="flex" gap="10px" flexWrap="wrap">
          {category.map((item) => (
            <>
              <MotionText
                key={item}
                mr="10px"
                fontSize="30px"
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
                <Text mr="10px" fontSize="30px">
                  &middot;
                </Text>
              )}
            </>
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
