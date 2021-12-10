import JobList from '@/components/Jobs/JobList';
import Loading from '@/components/Loading/Index';
import Pagination from '@/components/Pagination';
import { JobProps } from '@/interfaces/common';
import { getJobsData } from '@/util/api';
import { Box, Heading, Input, Stack, Select, Button } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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

  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getJobsData();
        setAllJobs(data);
        setFilteredJobs(data.slice(0, filters.page * perPage));
        setLastPage(Math.ceil(data.length / perPage));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
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

  //get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentJobs = jobs.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Box className="container">
      <Box mt="40px" mb="40px">
        <Image
          src="/images/jobs_main.png"
          layout="responsive"
          width="1802"
          height="208"
          alt=""
        />
      </Box>

      <Box d={{ base: 'block', md: 'flex' }} justifyContent="space-between">
        <Box width={{ base: '100%', md: '30%' }} mr={{ base: 0, md: '30px' }}>
          <Heading mb="10px" as="h4" fontSize="16px">
            Search
          </Heading>

          <Stack spacing={3}>
            <Input
              w="100%"
              bg="white"
              placeholder="Company or Position"
              onKeyUp={(e) =>
                setFilters({
                  ...filters,
                  page: 1,
                  s: (e.target as HTMLTextAreaElement).value,
                })
              }
            />
            <Select
              bg="white"
              placeholder="Select option"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sort: e.target.value,
                })
              }
              defaultValue="desc"
            >
              <option value="asc">Oldest</option>
              <option value="desc">Newest</option>
            </Select>
          </Stack>
        </Box>
        <Box w={{ base: '100%', md: '70%' }} mt={{ base: '20px', md: 0 }}>
          {loading && <Loading />}
          <JobList jobs={filteredJobs} filters={filters} />

          {filters.page !== lastPage && (
            <Button onClick={loadMore} isFullWidth>
              Load More
            </Button>
          )}

          {/* <Pagination
            postsPerPage={postsPerPage}
            totalPosts={jobs.length}
            paginate={paginate}
          /> */}
        </Box>
      </Box>
    </Box>
  );
}

export default Jobs;
