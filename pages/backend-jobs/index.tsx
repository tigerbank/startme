import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Input,
  Select,
  FormControl,
  FormLabel,
  Stack,
  Heading,
  Button,
} from '@chakra-ui/react';
import {
  axiosJobsData,
  countJobs,
  getCompanies,
  getLocations,
} from '@/util/api';
import JobList from '@/components/Jobs/JobList';
import Loading from '@/components/Loading/Index';
import { CompanyProps } from '@/interfaces/common';

function BackendJobs() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterJobs, setFilterJobs] = useState({
    s: '',
    company: '',
    location: '',
    page: 1,
  });
  const [lastPage, setLastPage] = useState(false);

  const perPage = 4;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setLastPage(false);
      const data = await axiosJobsData(filterJobs, perPage);

      setJobs([...jobs, ...data]);

      if (data.length === 0 || data.length < perPage) {
        setLastPage(true);
      }

      setLoading(false);
    };
    fetchJobs();
  }, [filterJobs]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const loadMore = () => {
    setFilterJobs({
      ...filterJobs,
      page: filterJobs.page + 1,
    });
  };

  return (
    <Box className="container" mt="40px">
      <Box d={{ base: 'block', md: 'flex' }} justifyContent="space-between">
        <Box width={{ base: '100%', md: '30%' }} mr={{ base: 0, md: '30px' }}>
          <Stack>
            <Heading>Job search </Heading>
            <Text>Fetch data from backend anytime filter change</Text>
            <FormControl id="city">
              <FormLabel fontWeight="bold">Search by position</FormLabel>
              <Input
                placeholder="position"
                bg="white"
                onKeyUp={(e) => {
                  setJobs([]);
                  setFilterJobs({
                    ...filterJobs,
                    s: (e.target as HTMLTextAreaElement).value,
                    page: 1,
                  });
                }}
              />
            </FormControl>

            <FormControl id="company">
              <FormLabel fontWeight="bold">Company</FormLabel>
              <Select
                bg="white"
                onChange={(e) => {
                  setJobs([]);
                  setFilterJobs({
                    ...filterJobs,
                    company: e.target.value,
                    page: 1,
                  });
                }}
              >
                <option>All</option>
                {companies.map((company: CompanyProps) => (
                  <option key={company.name} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="location">
              <FormLabel fontWeight="bold">Location</FormLabel>
              <Select
                onChange={(e) => {
                  setJobs([]);
                  setFilterJobs({
                    ...filterJobs,
                    location: e.target.value,
                    page: 1,
                  });
                }}
                bg="white"
              >
                <option>All</option>
                {locations.map((location: CompanyProps) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <Box w={{ base: '100%', md: '70%' }} mt={{ base: '20px', md: 0 }}>
          {loading && <Loading />}

          <>
            {!loading && <JobList jobs={jobs} />}

            {!loading && jobs.length !== 0 && !lastPage && (
              <Button colorScheme="teal" isFullWidth onClick={loadMore}>
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            )}
          </>
        </Box>
      </Box>
    </Box>
  );
}

export default BackendJobs;
