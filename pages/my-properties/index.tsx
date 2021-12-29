import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PropertyProps } from '@/interfaces/common';
import { getAllProperties } from '@/util/api';

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let controller: any = new AbortController();
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties({
          signal: controller.signal,
        });
        setProperties(data);
        controller = null;
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setMessage('Could not fetch properties');
        }
      }
    };
    fetchProperties();
    return () => controller?.abort();
  }, []);

  return (
    <Box mt="50px">
      <p>Hello</p>
      {properties &&
        properties.map((property: PropertyProps) => {
          return (
            <div key={property.id}>
              <h4>{property.name}</h4>
            </div>
          );
        })}
      {message}
    </Box>
  );
}

export default MyProperties;
