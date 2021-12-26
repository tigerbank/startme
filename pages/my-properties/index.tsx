import { PropertyProps } from '@/interfaces/common';
import { getAllProperties } from '@/util/api';
import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (e) {
        console.log(e);
        setMessage('Could not fetch properties');
      }
    };
    fetchProperties();
  }, []);

  return (
    <Box mt="30px">
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
