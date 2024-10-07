import React, { useEffect, useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { axiosJobsData, getGlobalData } from "@/util/api"
import JobList from "@/components/Jobs/JobList"
import Loading from "@/components/Common/Loading/Index"
import JobFilterBackend from "@/components/Jobs/JobFilterBackend"
import DefaultTemplate from "@/components/templates/DefaultTemplate"

function BackendJobs() {
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState<any[]>([])

  const [filterJobs, setFilterJobs] = useState({
    s: "",
    company: "",
    location: "",
    page: 1,
  })
  const [lastPage, setLastPage] = useState(false)
  const perPage = 4

  useEffect(() => {
    let identifier: any = null
    const fetchJobs = async () => {
      setLoading(true)
      setLastPage(false)

      //to prevent API request for every key stroke
      identifier = setTimeout(async () => {
        const data = await axiosJobsData(filterJobs, perPage)
        setJobs([...jobs, ...data])

        if (data.length === 0 || data.length < perPage) {
          setLastPage(true)
        }
        setLoading(false)
      }, 1000)

      return identifier
    }
    fetchJobs()
    return () => {
      clearTimeout(identifier)
    }
  }, [filterJobs])

  const loadMore = () => {
    setFilterJobs({
      ...filterJobs,
      page: filterJobs.page + 1,
    })
  }

  return (
    <DefaultTemplate title="Backend job filter" description="description">
      {/* <Box d={{ base: 'block', md: 'flex' }} justifyContent="space-between">
        <Box width={{ base: '100%', md: '30%' }} mr={{ base: 0, md: '30px' }}>
          <JobFilterBackend
            filterJobs={filterJobs}
            setJobs={setJobs}
            setFilterJobs={setFilterJobs}
          />
        </Box>

        <Box w={{ base: '100%', md: '70%' }} mt={{ base: '20px', md: 0 }}>
          <>
            <JobList jobs={jobs} loading={loading} />

            {!loading && jobs.length !== 0 && !lastPage && (
              <Button
                mt="10px"
                colorScheme="teal"
                isFullWidth
                onClick={loadMore}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            )}
            {loading && <Loading />}
          </>
        </Box>
      </Box> */}
      -
    </DefaultTemplate>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global,
    },
    revalidate: 10,
  }
}

export default BackendJobs
