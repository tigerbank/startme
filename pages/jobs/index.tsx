import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Button } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import JobFilter from '@/components/Jobs/JobFilter';
import JobList from '@/components/Jobs/JobList';
import Loading from '@/components/Common/Loading/Index';
import { JobProps } from '@/interfaces/common';
import { getGlobalData, getJobsData } from '@/util/api';
import DefaultTemplate from '@/components/templates/DefaultTemplate';

function Jobs() {
  const [loading, setLoading] = useState(false);
  const [allJobs, setAllJobs] = useState<JobProps[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobProps[]>([]);

  const [filters, setFilters] = useState({
    s: '',
    sort: 'desc',
    page: 1,
  });

  const perPage = 5;
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    let controller: any = new AbortController();
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getJobsData({
          signal: controller.signal,
        });

        setAllJobs(data);
        setFilteredJobs(data.slice(0, filters.page * perPage));
        setLastPage(Math.ceil(data.length / perPage));
        setLoading(false);
        controller = null;
      } catch (error) {}
    };
    fetchJobs();
    return () => controller?.abort();
  }, []);

  useEffect(() => {
    let jobs = allJobs.filter(
      (job) =>
        job.position.toLowerCase().includes(filters.s.toLowerCase()) ||
        job.company.name.toLowerCase().includes(filters.s.toLowerCase()),
    );

    if (filters.sort === 'asc') {
      jobs.sort((a, b) =>
        a.updated_at.toString().localeCompare(b.updated_at.toString()),
      );
    } else if (filters.sort === 'desc') {
      jobs.sort((a, b) =>
        b.updated_at.toString().localeCompare(a.updated_at.toString()),
      );
    }

    setLastPage(Math.ceil(jobs.length / perPage));
    setFilteredJobs(jobs.slice(0, filters.page * perPage));
  }, [allJobs, filters]);

  const loadMore = () => {
    setFilters({
      ...filters,
      page: filters.page + 1,
    });
  };

  return (
    <DefaultTemplate title="jobs" description="description">
      <Box d={{ base: 'none', md: 'block' }} mt="40px" mb="40px">
        <Image
          src="/images/jobs_main.png"
          layout="responsive"
          width="1802"
          height="208"
          alt=""
        />
      </Box>

      <Box
        d={{ base: 'block', md: 'none' }}
        mt="40px"
        mb="40px"
        height="100px"
        width="100%"
        position="relative"
      >
        <Image
          src="/images/jobs_main.png"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <Box d={{ base: 'block', md: 'flex' }} justifyContent="space-between">
        <Box width={{ base: '100%', md: '30%' }} mr={{ base: 0, md: '30px' }}>
          <JobFilter setFilters={setFilters} filters={filters} />
        </Box>
        <Box w={{ base: '100%', md: '70%' }} mt={{ base: '20px', md: 0 }}>
          {loading && <Loading />}
          <JobList jobs={filteredJobs} filters={filters} loading={loading} />

          {filters.page !== lastPage && !loading && (
            <Button colorScheme="teal" onClick={loadMore} isFullWidth>
              Load More
            </Button>
          )}
        </Box>
      </Box>
    </DefaultTemplate>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      global,
    },
    revalidate: 10,
  };
}

export default Jobs;
