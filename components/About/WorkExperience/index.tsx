import React from "react"
import { Box, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Work from "./Work"

const MotionBox = motion(Box)
const MotionHeading = motion(Heading)

function WorkExperience() {
  return (
    <MotionBox
      initial={{
        backgroundColor: "#fff",
        color: "#000",
      }}
      whileInView={{
        backgroundColor: "#2a3433",
        color: "#fff",
      }}
      transition={{ delay: 3, duration: 1 }}
      pt="100px"
      py="100px"
    >
      <Box width="90%" ml="auto" mr="auto">
        <MotionHeading
          as="h2"
          fontSize={{ base: "60px", lg: "100px" }}
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          work experience:
        </MotionHeading>
      </Box>

      <Box className="container">
        <Work
          duration="March 2022 - Present"
          company="Caviar Labs"
          position="Software engineer"
          description={[
            "Developed and customized front-end products to meet unique client requirements.",
            "Delivered high-quality code, optimizing for top-tier performance and ensuring compliance with industry standards.",
            "Adhered to clean code standards and best practices, resulting in streamlined and maintainable solutions",
            "Improve the on-page SEO attribute of company's website.",
            "Identify & address bugs.",
          ]}
        />
        <Work
          duration="March 2021 - Nov 2021"
          company="Rabbit Finance"
          position="Software engineer"
          description={[
            "Improve the content management system in term of features and functionality with Jamstack(Nextjs, Strapi, Chakra-ui)",
            "Develop new content module to enhance UI/UX for the corporate site. (https://rabbitcare.com/)",
            "Improve the page speed according to website analytics tools.",
            "Improve the on-page SEO attribute of the corporate site.",
            "Identify & address bugs within CMS.",
          ]}
        />
        <Work
          duration="April 2019 - March 2021"
          company="Hogarth Worldwide (Bangkok based)"
          position="Frontend Developer"
          description={[
            "Work remotely together with the team in Singapore.",
            "Manage and maintain website and contents using HTML5, CSS3, and JS",
            "Build and testing of responsive HTML emails for an international audience.",
            "Troubleshooting web development issues and correcting within tight deadlines",
          ]}
        />
        <Work
          duration="July 2015 - April 2019"
          company="Hogarth Worldwide (Singapore based)"
          position="Frontend Developer"
          description={[
            "Manage and maintain website and contents using HTML5, CSS3, and JS",
            "Troubleshooting web development issues and correcting within tight deadlines.",
            "Manage file using version control Subversion for the large scale projects.",
            "Build and testing of responsive HTML emails for an international audience.",
            "Work closely with designers and QA on project development.",
            "Involve in the recruitment and training of new developers.",
          ]}
        />
        <Work
          duration="August 2014 - June 2015"
          company="WAVE ON CO.、LTD."
          position="Software engineer"
          description={[
            "Create and design website template with HTML, CSS , jQuery based on responsive website concept",
            "Create, drawing and editing image or any media for website",
            "Take responsibility for all design and multimedia projects of company",
            "Test functionality of websites in various browsers and device for quality assurance.",
          ]}
        />
        <Work
          duration="February 2010 - January 2014"
          company="AUN Thai Laboratories"
          position="Senior web developer in web creative team."
          description={[
            "Develop Responsive Sites.",
            "Provide creative professional web design and development.",
            "Responsible for all other graphic and design related tasks.",
            "Identify and correct problems/bugs revealed by testing or user feedback.",
            "Seo issue for web adjustment",
          ]}
        />
        {/* <Work
          duration="September 2007 - January 2010"
          company="Prepress International"
          position="Graphic designer"
          description={[
            'Manipulating digital images to produce a high-quality output for web and print',
            'Retouch a variety of categories such as jewelry , human and car',
            'Color correct images for precise product matching',
            'Ensure color consistency between image assets',
          ]}
        /> */}
      </Box>
    </MotionBox>
  )
}

export default WorkExperience
