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
} from '@chakra-ui/react';
import { axiosJobsData } from '@/util/api';
import JobList from '@/components/Jobs/JobList';
import Loading from '@/components/Loading/Index';

function BackendJobs() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState({
    s: '',
    company: '',
    city: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await axiosJobsData(filterJobs);
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, [filterJobs]);

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
                onKeyUp={(e) =>
                  setFilterJobs({
                    ...filterJobs,
                    s: (e.target as HTMLTextAreaElement).value,
                  })
                }
              />
            </FormControl>

            <FormControl id="company">
              <FormLabel fontWeight="bold">Company</FormLabel>
              <Select
                bg="white"
                onChange={(e) =>
                  setFilterJobs({
                    ...filterJobs,
                    company: e.target.value,
                  })
                }
              >
                <option>All</option>
                <option value="Lev">Lev</option>
                <option value="Facebook">Facebook</option>
                <option value="Google">Google</option>
              </Select>
            </FormControl>

            <FormControl id="city">
              <FormLabel fontWeight="bold">City</FormLabel>
              <Select
                onChange={(e) =>
                  setFilterJobs({
                    ...filterJobs,
                    city: e.target.value,
                  })
                }
                bg="white"
              >
                <option>All</option>
                <option value="Bangkok">Bangkok</option>
                <option value="Singapore">Singapore</option>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <Box w={{ base: '100%', md: '70%' }} mt={{ base: '20px', md: 0 }}>
          {loading && <Loading />}
          <JobList jobs={jobs} />
        </Box>
      </Box>
    </Box>
  );
}

export default BackendJobs;
