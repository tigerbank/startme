import React from "react"
import { Box } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Skill from "@/components/About/Skill"
import Intro from "@/components/About/Intro"
import WorkExperience from "@/components/About/WorkExperience"
import OtherLink from "@/components/About/OtherLink"
import { getGlobalData } from "@/util/api"

const MotionBox = motion(Box)

function About() {
  return <div>-</div>
}

export const getStaticProps = async (context: any) => {
  const locale = context.locale

  const global = await getGlobalData(locale)

  return {
    props: {
      global,
    },
    revalidate: 10,
  }
}

export default About
