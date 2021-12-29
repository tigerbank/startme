import React, { useState, useEffect } from 'react';
import {
  Text,
  Input,
  Select,
  FormControl,
  FormLabel,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { getCompanies, getLocations } from '@/util/api';
import CompanyList from '@/components/Jobs/CompanyList';
import LocationList from '@/components/Jobs/LocationList';

function JobFilterBackend({ filterJobs, setJobs, setFilterJobs }: any) {
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    let controller: any = new AbortController();

    const fetchCompanies = async () => {
      try {
        const data = await getCompanies({
          signal: controller.signal,
        });
        controller = null;
        setCompanies(data);
      } catch (error) {}
    };

    fetchCompanies();
    return () => controller?.abort();
  }, []);

  useEffect(() => {
    let controller: any = new AbortController();

    const fetchLocations = async () => {
      try {
        const data = await getLocations({
          signal: controller.signal,
        });
        controller = null;
        setLocations(data);
      } catch (error) {}
    };

    fetchLocations();
    return () => controller?.abort();
  }, []);

  return (
    <>
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
            <CompanyList companies={companies} />
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
            <LocationList locations={locations} />
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default JobFilterBackend;
