import { Box } from '@chakra-ui/layout';
import React from 'react';
import BoxCarousel from '@/components/BoxCarousel';
import Hero from '@/components/Hero';

const sectionComponents: any = {
  'elements.box-carousel': BoxCarousel,
  'elements.hero': Hero,
};

const Section = ({ sectionData }: any) => {
  const SectionComponent = sectionComponents[sectionData.__component];

  if (!SectionComponent) {
    return null;
  }
  return <SectionComponent data={sectionData} />;
};

function Sections({ sections }: { sections: any[] }) {
  return (
    <Box overflow="hidden">
      {sections.map((section: any) => {
        return (
          <Section
            sectionData={section}
            key={`${section.__component}${section.id}`}
          />
        );
      })}
    </Box>
  );
}

export default Sections;
