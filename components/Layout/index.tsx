import React from "react"
import { Box, useBreakpointValue } from "@chakra-ui/react"
import Header from "./Header"
import DesktopNavigation from "./Navigation/Desktop"
import { NavProps } from "@/interfaces/common"
import Footer from "@/components/Layout/Footer"

function Layout({
  children,
  nav,
}: {
  children: React.ReactNode
  nav: NavProps[]
}) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
      <Box h="100vh" d="flex" flexDir="column" justifyContent="space-between">
        {/* <Header nav={nav} />
        {!isMobile && nav && <DesktopNavigation nav={nav} />}
        <Box mb="40px" mt={{ base: '45px', md: '0' }}>
          {children}
        </Box>
        <Footer /> */}
        <div className="flex justify-center items-center h-screen">
          "Be yourself; everyone else is already taken." — Oscar Wilde
        </div>
      </Box>
    </>
  )
}

export default Layout
